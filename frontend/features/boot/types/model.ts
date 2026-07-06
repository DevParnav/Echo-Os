// Ollama / AI model types returned by GET /api/system/models

export type ModelRole = 'llm' | 'embed' | 'vision' | 'unknown';

export interface ModelInfo {
  name: string;
  displayName?: string;   // human-friendly e.g. "Qwen3 8B"
  size?: string;          // e.g. "4.9 GB"
  sizeBytes?: number;
  role?: ModelRole;
  modifiedAt?: string;
}

export interface OllamaStatus {
  running: boolean;
  version?: string;        // e.g. "0.1.32"
  models: ModelInfo[];
  embeddingModel?: string | null;  // primary embed model name
}
