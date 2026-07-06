import os
import chromadb
from typing import List, Dict, Any

class VectorService:
    def __init__(self, workspace_path: str):
        db_path = os.path.join(workspace_path, "vectors")
        # Initialize Persistent Client
        self.client = chromadb.PersistentClient(path=db_path)
        
        # We will use one main collection for memories.
        # Nomic embed text is 768 dimensions.
        self.collection = self.client.get_or_create_collection(name="memories")

    def add_memory(self, text: str, metadata: Dict[str, Any], memory_id: str):
        """
        Add a semantic memory block to the vector database.
        Chroma will automatically embed the text using its default embedding function
        unless we pass embeddings manually. For simplicity, we use the default (all-MiniLM-L6-v2) 
        for now, which works well enough completely locally.
        """
        self.collection.add(
            documents=[text],
            metadatas=[metadata],
            ids=[memory_id]
        )

    def search_memories(self, query: str, n_results: int = 5) -> List[Dict[str, Any]]:
        """
        Search for memories related to a query.
        """
        if self.collection.count() == 0:
            return []
            
        results = self.collection.query(
            query_texts=[query],
            n_results=min(n_results, self.collection.count())
        )
        
        # Format results
        formatted = []
        if results and results["documents"] and results["documents"][0]:
            for doc, meta, id, dist in zip(
                results["documents"][0],
                results["metadatas"][0],
                results["ids"][0],
                results["distances"][0] if results.get("distances") else [0]*len(results["ids"][0])
            ):
                formatted.append({
                    "id": id,
                    "document": doc,
                    "metadata": meta,
                    "distance": dist
                })
        return formatted
