"""
GET /api/system/status

Single endpoint that returns all system information needed by the
EchoOS boot sequence. Hardware detection runs in a thread pool to
avoid blocking the async event loop.
"""

from __future__ import annotations

import asyncio
import time

from fastapi import APIRouter

from app.schemas.models import (
    SystemStatus, HardwareInfo, OllamaInfo, MemoryInfo, HealthInfo,
)
from app.services import hardware as hw_service
from app.services import ollama as ollama_service
from app.services import memory as memory_service

router = APIRouter()


@router.get("/status", response_model=SystemStatus)
async def get_system_status() -> SystemStatus:
    """
    Gathers hardware info, Ollama status, and memory engine health.

    - Hardware detection runs in a thread pool (synchronous, CPU-bound).
    - Ollama detection is async (HTTP to localhost:11434).
    - Both run concurrently via asyncio.gather for minimal latency.
    """
    start_ms = time.monotonic()

    # Run hardware (sync, I/O with OS) and Ollama (async HTTP) concurrently
    hardware_raw, ollama_raw = await asyncio.gather(
        asyncio.to_thread(hw_service.get_all_hardware),
        ollama_service.get_ollama_status(),
    )

    # Memory checks use the model list from Ollama
    models: list[str] = ollama_raw.get("models", [])
    memory_raw = await asyncio.to_thread(memory_service.get_memory_status, models)

    latency_ms = int((time.monotonic() - start_ms) * 1000)

    # ── Determine overall health ──────────────────────────────
    ollama_ok = ollama_raw["running"]
    sqlite_ok = memory_raw["sqlite"]

    if ollama_ok and sqlite_ok:
        health_status = "healthy"
    elif sqlite_ok:
        health_status = "degraded"   # backend up, but Ollama offline
    else:
        health_status = "offline"

    return SystemStatus(
        hardware=HardwareInfo(**hardware_raw),
        ollama=OllamaInfo(**ollama_raw),
        memory=MemoryInfo(**memory_raw),
        health=HealthInfo(status=health_status, latency=latency_ms),
    )
