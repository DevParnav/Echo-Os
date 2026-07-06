import os
import json
import httpx
from fastapi import APIRouter, HTTPException, BackgroundTasks
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import List, Dict

from app.services.database import DatabaseService
from app.services.vector import VectorService
from app.services.extractor import MemoryExtractor

router = APIRouter(prefix="/chat", tags=["chat"])

WORKSPACES_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "workspaces")

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    workspace_id: str
    messages: List[ChatMessage]

async def stream_ollama(prompt: str, system: str, model: str):
    async with httpx.AsyncClient() as client:
        async with client.stream("POST", "http://127.0.0.1:11434/api/generate", json={
            "model": model,
            "prompt": prompt,
            "system": system,
            "stream": True
        }) as response:
            async for chunk in response.aiter_lines():
                if chunk:
                    try:
                        data = json.loads(chunk)
                        if "response" in data:
                            yield data["response"]
                    except json.JSONDecodeError:
                        continue

import datetime
from app.services.ollama import get_ollama_status

def process_memory_background(workspace_id: str, user_message: str, ai_response: str, model_used: str):
    workspace_path = os.path.join(WORKSPACES_DIR, workspace_id)
    db = DatabaseService(workspace_path)
    vector = VectorService(workspace_path)
    extractor = MemoryExtractor(workspace_path, db, vector)
    
    import asyncio
    asyncio.run(extractor.process_exchange(user_message, ai_response))
    
    # Save to history
    history_path = os.path.join(workspace_path, "chat", "history.json")
    history = []
    if os.path.exists(history_path):
        with open(history_path, "r") as f:
            history = json.load(f)
            
    timestamp = datetime.datetime.now().isoformat()
    history.append({"role": "user", "content": user_message, "timestamp": timestamp})
    history.append({"role": "assistant", "content": ai_response, "timestamp": timestamp, "model": model_used})
    
    with open(history_path, "w") as f:
        json.dump(history, f, indent=2)

@router.get("/history/{workspace_id}")
async def get_history(workspace_id: str):
    workspace_path = os.path.join(WORKSPACES_DIR, workspace_id)
    if not os.path.exists(workspace_path):
        raise HTTPException(status_code=404, detail="Workspace not found")

    history_path = os.path.join(workspace_path, "chat", "history.json")
    if os.path.exists(history_path):
        try:
            with open(history_path, "r") as f:
                history = json.load(f)
                return {"messages": history}
        except json.JSONDecodeError:
            pass
            
    return {"messages": []}

@router.post("/stream")
async def chat_stream(request: ChatRequest, background_tasks: BackgroundTasks):
    workspace_path = os.path.join(WORKSPACES_DIR, request.workspace_id)
    if not os.path.exists(workspace_path):
        raise HTTPException(status_code=404, detail="Workspace not found")

    # Check Ollama Status & Model Fallbacks
    status = await get_ollama_status()
    if not status["running"]:
        raise HTTPException(status_code=400, detail="Ollama is not running.")
    
    available_models = status.get("models", [])
    
    # Load preferences
    prefs_path = os.path.join(workspace_path, "preferences.json")
    model = "llama3:latest"
    if os.path.exists(prefs_path):
        with open(prefs_path, "r") as f:
            prefs = json.load(f)
            model = prefs.get("defaultChatModel", "llama3:latest")

    # Fallback logic
    if model not in available_models:
        if "qwen3:8b" in available_models:
            model = "qwen3:8b"
        elif "deepseek-r1:14b" in available_models:
            model = "deepseek-r1:14b"
        else:
            raise HTTPException(status_code=400, detail="No model is available.")

    # Get last user message
    user_message = request.messages[-1].content
    
    # Retrieve relevant memories
    vector = VectorService(workspace_path)
    memories = vector.search_memories(user_message, n_results=3)
    
    memory_context = ""
    if memories:
        memory_context = "Relevant Memories from past conversations:\n"
        for mem in memories:
            memory_context += f"- {mem['document']}\n"
            
    system_prompt = f"""You are Echo, a highly intelligent, natural, and conversational AI operating system assistant.
Answer exactly like ChatGPT would. 
Never generate fake system messages. 
Never respond with "Memory Scan", "Vector Density", "Checking Local Weights", or "Completion Probability".
Be friendly and conversational.
{memory_context}
"""

    prompt = ""
    for msg in request.messages[-5:]: # Keep last 5 for context
        prompt += f"{msg.role.capitalize()}: {msg.content}\n"
    prompt += "Assistant: "

    async def generate_and_track():
        full_response = ""
        async for token in stream_ollama(prompt, system_prompt, model):
            full_response += token
            yield token
            
        # Fire background task for memory extraction
        background_tasks.add_task(process_memory_background, request.workspace_id, user_message, full_response, model)

    return StreamingResponse(generate_and_track(), media_type="text/plain")
