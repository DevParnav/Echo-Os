import { SystemStatusResponse } from '../types/system';

const TIMEOUT_MS  = 10_000;

/**
 * Fetches the complete system status from the EchoOS local backend.
 * Single call replacing the previous three separate endpoints.
 *
 * Endpoint: GET /api/system/status (Proxied through Next.js)
 */
export async function fetchSystemStatus(): Promise<SystemStatusResponse> {
  const ctrl  = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);

  try {
    // Direct backend URL since Next.js rewrites may be misconfigured or blocked
    const res = await fetch('http://127.0.0.1:8000/api/system/status', {
      signal:  ctrl.signal,
      headers: { Accept: 'application/json' },
      cache:   'no-store',
    });

    if (!res.ok) {
      throw new Error(`Backend returned HTTP ${res.status}`);
    }

    return res.json() as Promise<SystemStatusResponse>;
  } finally {
    clearTimeout(timer);
  }
}
