"""
Pydantic schemas for the EchoOS system status API.
All fields are Optional to gracefully handle missing hardware or services.
"""

from __future__ import annotations
from typing import List, Optional
from pydantic import BaseModel


# ── Hardware ──────────────────────────────────────────────

class CpuInfo(BaseModel):
    name: str
    cores: int
    threads: int


class GpuInfo(BaseModel):
    name: str
    vram: Optional[str] = None   # e.g. "6 GB"
    cuda: bool = False


class RamInfo(BaseModel):
    total: str        # e.g. "16.0 GB"
    available: str    # e.g. "9.4 GB"


class DiskInfo(BaseModel):
    total: str        # e.g. "512.1 GB"
    free: str         # e.g. "214.7 GB"


class HardwareInfo(BaseModel):
    cpu:      Optional[CpuInfo]  = None
    gpu:      Optional[GpuInfo]  = None
    ram:      Optional[RamInfo]  = None
    disk:     Optional[DiskInfo] = None
    os:       str = "Unknown"
    hostname: str = "Unknown"


# ── Ollama ────────────────────────────────────────────────

class OllamaInfo(BaseModel):
    running: bool
    version: Optional[str] = None
    models:  List[str] = []


# ── Memory Engine ─────────────────────────────────────────

class MemoryInfo(BaseModel):
    sqlite:         bool = False
    chromadb:       bool = False
    embeddings:     bool = False
    decisionEngine: bool = False


# ── Health ────────────────────────────────────────────────

class HealthInfo(BaseModel):
    status:  str            # "healthy" | "degraded" | "offline"
    latency: Optional[int] = None   # ms


# ── Unified response ──────────────────────────────────────

class SystemStatus(BaseModel):
    hardware: HardwareInfo
    ollama:   OllamaInfo
    memory:   MemoryInfo
    health:   HealthInfo
