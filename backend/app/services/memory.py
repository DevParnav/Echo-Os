"""
Memory engine health checks.

Checks:
  SQLite        — always available (Python built-in)
  ChromaDB      — optional; gracefully returns False if not installed
  Embeddings    — checks if any embed-capable model is in the Ollama model list
  Decision Eng  — checks if the EchoOS data directory exists / is accessible
"""

from __future__ import annotations

import sqlite3
from pathlib import Path
from typing import Dict, Any, List

# EchoOS data directory — created in user home
DATA_DIR = Path.home() / ".echoos"

# Keywords that identify an embedding model by name
_EMBED_KEYWORDS = ("embed", "nomic", "mxbai", "all-minilm", "bge", "gte")


def _check_sqlite() -> bool:
    """
    Creates (or opens) the EchoOS SQLite database.
    Returns True if the operation succeeds.
    """
    try:
        DATA_DIR.mkdir(parents=True, exist_ok=True)
        db_path = DATA_DIR / "memory.db"
        conn = sqlite3.connect(str(db_path))
        conn.execute("SELECT 1")
        conn.close()
        return True
    except Exception:
        return False


def _check_chromadb() -> bool:
    """
    Tries to instantiate a ChromaDB client.
    Returns False if ChromaDB is not installed (ImportError) or misconfigured.
    """
    try:
        import chromadb  # type: ignore
        chroma_path = str(DATA_DIR / "chroma")
        chromadb.PersistentClient(path=chroma_path)
        return True
    except ImportError:
        return False
    except Exception:
        return False


def _check_embeddings(models: List[str]) -> bool:
    """
    Returns True if any installed Ollama model is a known embedding model.
    """
    return any(
        any(kw in m.lower() for kw in _EMBED_KEYWORDS)
        for m in models
    )


def _check_decision_engine() -> bool:
    """
    The decision engine is considered 'ready' if the EchoOS data directory
    is accessible. Returns False if the directory cannot be created/read.
    """
    try:
        DATA_DIR.mkdir(parents=True, exist_ok=True)
        return DATA_DIR.is_dir()
    except Exception:
        return False


def get_memory_status(models: List[str]) -> Dict[str, Any]:
    return {
        "sqlite":         _check_sqlite(),
        "chromadb":       _check_chromadb(),
        "embeddings":     _check_embeddings(models),
        "decisionEngine": _check_decision_engine(),
    }
