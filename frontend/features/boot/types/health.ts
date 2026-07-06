// Health status types returned by GET /api/system/health

export type ServiceStatus = 'online' | 'offline' | 'ready' | 'enabled' | 'disabled' | 'unavailable' | 'checking';

export type OverallHealth = 'healthy' | 'degraded' | 'offline';

export interface HealthStatus {
  memoryEngine:   ServiceStatus;
  vectorDatabase: ServiceStatus;
  embeddingModel: ServiceStatus;
  decisionEngine: ServiceStatus;
  privacyLayer:   ServiceStatus;
  overallHealth:  OverallHealth;
}
