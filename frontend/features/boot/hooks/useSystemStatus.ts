import { useState, useCallback } from 'react';
import { CheckStatus }           from '../types/boot';
import { SystemStatusResponse }  from '../types/system';
import { fetchSystemStatus }     from '../services/system';

export interface UseSystemStatusReturn {
  status: CheckStatus;
  data:   SystemStatusResponse | null;
  error:  string | null;
  check:  () => Promise<void>;
  retry:  () => Promise<void>;
}

/**
 * Single hook for all system checks.
 * Makes ONE call to GET /api/system/status and exposes the full response.
 * Callers slice the data they need (hardware, ollama, memory, health).
 */
export function useSystemStatus(): UseSystemStatusReturn {
  const [status, setStatus] = useState<CheckStatus>('pending');
  const [data,   setData  ] = useState<SystemStatusResponse | null>(null);
  const [error,  setError ] = useState<string | null>(null);

  const check = useCallback(async () => {
    setStatus('checking');
    setError(null);

    try {
      const result = await fetchSystemStatus();
      setData(result);

      // Derive overall UI status from the health field
      const h = result.health.status;
      setStatus(h === 'healthy' ? 'success' : h === 'degraded' ? 'warning' : 'error');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Backend unreachable';
      setError(msg);
      setStatus('error');
    }
  }, []);

  return { status, data, error, check, retry: check };
}
