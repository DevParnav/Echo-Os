import os
import json
import datetime
import uuid
from typing import List, Dict, Any

# Adjust base path dynamically depending on where the script runs from
# We assume workspaces lives parallel to frontend and backend:
WORKSPACES_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__)))), "workspaces")

class WorkspaceService:
    @staticmethod
    def _ensure_workspaces_dir():
        if not os.path.exists(WORKSPACES_DIR):
            os.makedirs(WORKSPACES_DIR)

    @staticmethod
    def list_workspaces() -> List[Dict[str, Any]]:
        WorkspaceService._ensure_workspaces_dir()
        workspaces = []
        for d in os.listdir(WORKSPACES_DIR):
            path = os.path.join(WORKSPACES_DIR, d)
            if os.path.isdir(path):
                config_path = os.path.join(path, "config.json")
                if os.path.exists(config_path):
                    with open(config_path, "r") as f:
                        config = json.load(f)
                        workspaces.append(config)
        return workspaces

    @staticmethod
    def create_workspace(name: str) -> Dict[str, Any]:
        WorkspaceService._ensure_workspaces_dir()
        
        ws_id = name.strip()
        path = os.path.join(WORKSPACES_DIR, ws_id)
        
        os.makedirs(path, exist_ok=True)
        os.makedirs(os.path.join(path, "chat"), exist_ok=True)
        os.makedirs(os.path.join(path, "vectors"), exist_ok=True)
        os.makedirs(os.path.join(path, "logs"), exist_ok=True)
        os.makedirs(os.path.join(path, "knowledge"), exist_ok=True)
        os.makedirs(os.path.join(path, "attachments"), exist_ok=True)

        created_date = datetime.datetime.now().strftime("%Y-%m-%d")

        config = {
            "id": ws_id,
            "name": name,
            "createdDate": created_date,
            "lastOpened": "Just now",
            "memoryCount": 0,
            "chatCount": 0
        }

        with open(os.path.join(path, "config.json"), "w") as f:
            json.dump(config, f, indent=2)

        with open(os.path.join(path, "profile.json"), "w") as f:
            json.dump({"name": "Creator"}, f, indent=2)

        with open(os.path.join(path, "preferences.json"), "w") as f:
            json.dump({
                "theme": "dark",
                "defaultChatModel": "llama3",
                "reasoningModel": "llama3",
                "embeddingModel": "nomic-embed-text",
                "memorySensitivity": "medium",
                "autoSave": True
            }, f, indent=2)

        # Create empty sqlite
        open(os.path.join(path, "memory.sqlite"), "w").close()

        return config

    @staticmethod
    def open_workspace(ws_id: str) -> Dict[str, Any]:
        path = os.path.join(WORKSPACES_DIR, ws_id, "config.json")
        if not os.path.exists(path):
            raise FileNotFoundError(f"Workspace {ws_id} not found")
            
        with open(path, "r") as f:
            config = json.load(f)
            
        config["lastOpened"] = "Just now"
        with open(path, "w") as f:
            json.dump(config, f, indent=2)
            
        return config
