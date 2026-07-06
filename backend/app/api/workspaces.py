from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from pydantic import BaseModel
from app.services.workspace import WorkspaceService

router = APIRouter(prefix="/workspaces", tags=["workspaces"])

class WorkspaceCreate(BaseModel):
    name: str

@router.get("")
def list_workspaces():
    return WorkspaceService.list_workspaces()

@router.post("")
def create_workspace(data: WorkspaceCreate):
    try:
        return WorkspaceService.create_workspace(data.name)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/{ws_id}/open")
def open_workspace(ws_id: str):
    try:
        return WorkspaceService.open_workspace(ws_id)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Workspace not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
