import json
import logging
from typing import Dict, Any, List
import httpx

from app.services.database import DatabaseService
from app.services.vector import VectorService

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class MemoryExtractor:
    def __init__(self, workspace_path: str, db_service: DatabaseService, vector_service: VectorService):
        self.workspace_path = workspace_path
        self.db_service = db_service
        self.vector_service = vector_service
        
    async def process_exchange(self, user_message: str, ai_response: str):
        """
        Background task to process a conversational exchange, determine if anything
        is worth remembering, and store it.
        """
        logger.info(f"Extracting memories for: '{user_message}'")
        
        system_prompt = """
        You are a Memory Extraction Engine. Analyze the conversation exchange.
        Does the user reveal a Preference, Fact, Goal, Project, Hardware, Skill, Relationship, or Interest?
        If yes, output a JSON array of objects.
        If the exchange is just generic conversation, greetings, conversational fluff, or doesn't contain lasting meaningful information, output an empty JSON array: []

        Valid types: "Preference", "Fact", "Goal", "Project", "Hardware", "Interest", "Skill", "Relationship", "Decision"

        Format exactly as:
        [
          {"type": "Interest", "subject": "DSA", "value": "User is learning Data Structures and Algorithms"}
        ]
        
        DO NOT extract generic greetings or temporary state.
        DO NOT output markdown, ONLY output valid JSON.
        """

        prompt = f"User: {user_message}\nAI: {ai_response}"

        try:
            async with httpx.AsyncClient(timeout=30) as client:
                resp = await client.post("http://127.0.0.1:11434/api/generate", json={
                    "model": "llama3:latest", # Or configured reasoning model
                    "prompt": prompt,
                    "system": system_prompt,
                    "stream": False,
                    "format": "json"
                })
                
                if resp.status_code == 200:
                    result = resp.json().get("response", "[]")
                    
                    try:
                        memories: List[Dict[str, str]] = json.loads(result)
                        
                        for mem in memories:
                            mem_type = mem.get("type", "Fact")
                            subject = mem.get("subject", "Unknown")
                            value = mem.get("value", "")
                            
                            # Save to SQLite
                            db_entry = self.db_service.save_memory(mem_type, subject, value)
                            
                            # Save to Vector DB
                            text = f"{mem_type} regarding {subject}: {value}"
                            meta = {"type": mem_type, "subject": subject, "source": "chat"}
                            self.vector_service.add_memory(text, meta, str(db_entry.id))
                            
                            logger.info(f"Extracted memory: {mem_type} - {subject}")
                            
                    except json.JSONDecodeError:
                        logger.error("Failed to parse extractor JSON")
                else:
                    logger.error(f"Ollama error in extraction: {resp.status_code}")
                    
        except Exception as e:
            logger.error(f"Extraction failed: {e}")
