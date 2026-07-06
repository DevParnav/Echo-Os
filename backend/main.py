"""
EchoOS Local Backend
Real hardware detection, Ollama integration, and memory engine health checks.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.system import router as system_router
from app.api.workspaces import router as workspace_router
from app.api.chat import router as chat_router

app = FastAPI(
    title="EchoOS Backend",
    description="Local-first cognitive operating system backend",
    version="1.0.0",
)

# Allow the Next.js dev server (and any local port) to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(system_router, prefix="/api/system", tags=["system"])
app.include_router(workspace_router, prefix="/api", tags=["workspaces"])
app.include_router(chat_router, prefix="/api", tags=["chat"])


@app.get("/health")
async def root_health():
    return {"status": "online", "service": "echoos-backend"}
