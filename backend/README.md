# EchoOS Backend

Local FastAPI backend for EchoOS — real hardware detection, Ollama integration, and memory engine health.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/system/status` | Unified system status (hardware + Ollama + memory + health) |
| `GET` | `/health` | Simple liveness check |

## Setup

```bash
# Create a virtual environment
python -m venv .venv

# Activate (Windows)
.venv\Scripts\activate

# Activate (macOS / Linux)
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the backend
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

The frontend (Next.js on port 3000) communicates with this backend at `http://localhost:8000`.

## What is detected

| Field | Source |
|-------|--------|
| CPU name / cores / threads | `py-cpuinfo` + `psutil` |
| GPU name / VRAM | `GPUtil` (NVIDIA only via `nvidia-smi`) |
| RAM total / available | `psutil.virtual_memory()` |
| Disk total / free | `psutil.disk_usage()` |
| Operating system | `platform` module |
| Ollama running | `GET http://localhost:11434/api/version` |
| Ollama version | Same response |
| Installed models | `GET http://localhost:11434/api/tags` |
| SQLite | Python built-in `sqlite3` |
| ChromaDB | Optional import (returns `false` if not installed) |
| Embeddings | Checks Ollama model names for embed keywords |
| Decision Engine | Checks `~/.echoos/` data directory |

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `8000` | Server port (override with uvicorn `--port`) |

## Notes

- No values are hardcoded. Everything is read at runtime.
- GPU detection only works with NVIDIA cards (via `nvidia-smi`).
- ChromaDB is optional — the backend starts fine without it.
- The `~/.echoos/` directory is created automatically on first run.
