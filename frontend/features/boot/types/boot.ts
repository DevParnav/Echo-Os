// Shared boot-level primitive types

export type CheckStatus = 'pending' | 'checking' | 'success' | 'warning' | 'error';

export type BootPhase =
  | 'idle'       // not yet started
  | 'fading'     // overlay fading to black
  | 'terminal'   // sequential log lines playing
  | 'checking'   // API calls in flight, panels visible
  | 'complete'   // all checks resolved
  | 'ready'      // final "System Ready" message visible
  | 'exiting';   // fading out before navigation

export interface BootLogLine {
  id: string;
  text: string;
  delay: number; // ms from start of terminal phase
  typing?: boolean;
}
