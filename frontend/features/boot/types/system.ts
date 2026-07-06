/**
 * Unified system status types — mirrors the FastAPI SystemStatus schema.
 * All fields are optional to gracefully handle partial API responses.
 */

// ── Hardware ──────────────────────────────────────────────

export interface CpuInfo {
  name:    string;
  cores:   number;
  threads: number;
}

export interface GpuInfo {
  name: string;
  vram?: string;    // e.g. "6 GB"
  cuda?: boolean;
}

export interface RamInfo {
  total:     string;  // e.g. "16.0 GB"
  available: string;  // e.g. "9.4 GB"
}

export interface DiskInfo {
  total: string;  // e.g. "512.1 GB"
  free:  string;  // e.g. "214.7 GB"
}

export interface HardwareInfo {
  cpu:      CpuInfo  | null;
  gpu:      GpuInfo  | null;
  ram:      RamInfo  | null;
  disk:     DiskInfo | null;
  os:       string;
  hostname?: string;
}

// ── Ollama ────────────────────────────────────────────────

export interface OllamaInfo {
  running: boolean;
  version?: string | null;
  models:  string[];   // raw model names e.g. "qwen3:8b"
}

// ── Memory Engine ─────────────────────────────────────────

export interface MemoryInfo {
  sqlite:         boolean;
  chromadb:       boolean;
  embeddings:     boolean;
  decisionEngine: boolean;
}

// ── Health ────────────────────────────────────────────────

export interface HealthInfo {
  status:   'healthy' | 'degraded' | 'offline';
  latency?: number;   // ms
}

// ── Unified ───────────────────────────────────────────────

export interface SystemStatusResponse {
  hardware: HardwareInfo;
  ollama:   OllamaInfo;
  memory:   MemoryInfo;
  health:   HealthInfo;
}
