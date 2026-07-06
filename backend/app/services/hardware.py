"""
Real hardware detection using psutil, py-cpuinfo, and pynvml (NVIDIA).
All functions are synchronous and fast (< 1s each).
Never hardcodes any values — everything is read from the OS.
"""

from __future__ import annotations

import platform
import socket
from typing import Optional, Dict, Any

import psutil

# ── Optional dependencies ──────────────────────────────────

try:
    import cpuinfo as _cpuinfo  # py-cpuinfo
    _HAS_CPUINFO = True
except ImportError:
    _HAS_CPUINFO = False

try:
    from pynvml import (  # nvidia-ml-py (pynvml is its deprecated alias)
        nvmlInit, nvmlDeviceGetCount,
        nvmlDeviceGetHandleByIndex, nvmlDeviceGetName,
        nvmlDeviceGetMemoryInfo,
    )
    nvmlInit()
    _HAS_NVML = True
except Exception:
    _HAS_NVML = False



# ── Helpers ────────────────────────────────────────────────

def _bytes_to_gb(n: int) -> str:
    return f"{n / (1024 ** 3):.1f} GB"


# ── CPU ────────────────────────────────────────────────────

def get_cpu_info() -> Optional[Dict[str, Any]]:
    try:
        if _HAS_CPUINFO:
            info = _cpuinfo.get_cpu_info()
            name: str = info.get("brand_raw") or platform.processor() or "Unknown CPU"
        else:
            name = platform.processor() or "Unknown CPU"

        cores   = psutil.cpu_count(logical=False) or 1
        threads = psutil.cpu_count(logical=True)  or 1

        return {"name": name.strip(), "cores": cores, "threads": threads}
    except Exception:
        return None


# ── GPU (NVIDIA via pynvml) ────────────────────────────────

def get_gpu_info() -> Optional[Dict[str, Any]]:
    """
    Uses pynvml (nvidia-ml-py) for NVIDIA GPU detection.
    Returns None cleanly for AMD / integrated / headless systems.
    """
    if not _HAS_NVML:
        return None
    try:
        device_count = nvmlDeviceGetCount()
        if device_count == 0:
            return None

        handle    = nvmlDeviceGetHandleByIndex(0)
        name      = nvmlDeviceGetName(handle)
        # nvmlDeviceGetName may return bytes on some versions
        if isinstance(name, bytes):
            name = name.decode("utf-8")

        mem_info  = nvmlDeviceGetMemoryInfo(handle)
        vram_gb   = f"{mem_info.total / (1024 ** 3):.0f} GB"

        return {"name": name, "vram": vram_gb, "cuda": True}
    except Exception:
        return None



# ── RAM ────────────────────────────────────────────────────

def get_ram_info() -> Optional[Dict[str, Any]]:
    try:
        vm = psutil.virtual_memory()
        return {
            "total":     _bytes_to_gb(vm.total),
            "available": _bytes_to_gb(vm.available),
        }
    except Exception:
        return None


# ── Disk ───────────────────────────────────────────────────

def get_disk_info() -> Optional[Dict[str, Any]]:
    try:
        drive = "C:\\" if platform.system() == "Windows" else "/"
        usage = psutil.disk_usage(drive)
        return {
            "total": _bytes_to_gb(usage.total),
            "free":  _bytes_to_gb(usage.free),
        }
    except Exception:
        return None


# ── OS / Hostname ──────────────────────────────────────────

def get_os_string() -> str:
    try:
        sys = platform.system()
        if sys == "Windows":
            return f"Windows {platform.release()} ({platform.version()})"
        elif sys == "Darwin":
            return f"macOS {platform.mac_ver()[0]}"
        else:
            return f"{sys} {platform.release()}"
    except Exception:
        return platform.platform()


def get_hostname() -> str:
    try:
        return socket.gethostname()
    except Exception:
        return "Unknown"


# ── Aggregate ──────────────────────────────────────────────

def get_all_hardware() -> Dict[str, Any]:
    return {
        "cpu":      get_cpu_info(),
        "gpu":      get_gpu_info(),
        "ram":      get_ram_info(),
        "disk":     get_disk_info(),
        "os":       get_os_string(),
        "hostname": get_hostname(),
    }
