"""
Ollama detection and model listing via the real Ollama HTTP API.
Base URL: http://localhost:11434 (Ollama default port).

Endpoints used:
  GET /api/version  — Ollama version string
  GET /api/tags     — installed model list
"""

from __future__ import annotations

from typing import Dict, Any, List

import httpx

OLLAMA_BASE    = "http://localhost:11434"
REQUEST_TIMEOUT = 5.0   # seconds


async def get_ollama_status() -> Dict[str, Any]:
    """
    Returns a dict with:
      running: bool
      version: str | None
      models:  List[str]  — model names as returned by Ollama
    """
    async with httpx.AsyncClient() as client:
        # ── Check if Ollama is running ──────────────────────
        try:
            version_res = await client.get(
                f"{OLLAMA_BASE}/api/version",
                timeout=REQUEST_TIMEOUT,
            )
            version: str | None = version_res.json().get("version")
        except (httpx.ConnectError, httpx.TimeoutException, Exception):
            # Ollama is offline or not installed
            return {"running": False, "version": None, "models": []}

        # ── Fetch installed models ──────────────────────────
        models: List[str] = []
        try:
            tags_res = await client.get(
                f"{OLLAMA_BASE}/api/tags",
                timeout=REQUEST_TIMEOUT,
            )
            data = tags_res.json()
            models = [m["name"] for m in data.get("models", [])]
        except Exception:
            pass   # Ollama is running but model list failed — not fatal

        return {
            "running": True,
            "version": version,
            "models":  models,
        }
