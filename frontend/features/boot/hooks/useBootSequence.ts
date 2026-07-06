import { useState, useCallback, useRef } from 'react';
import { BootPhase, BootLogLine } from '../types/boot';

// ─────────────────────────────────────────────────────────
// Terminal log lines — sequential cosmetic lines only
// ─────────────────────────────────────────────────────────
export const TERMINAL_LINES: BootLogLine[] = [
  { id: 'l1', text: '> Initializing Cognitive Kernel...',  delay: 150,  typing: true },
  { id: 'l2', text: '> Loading Local Runtime...',          delay: 600,  typing: true },
  { id: 'l3', text: '> Detecting Hardware...',             delay: 1050, typing: true },
  { id: 'l4', text: '> Connecting to Ollama...',           delay: 1480, typing: true },
  { id: 'l5', text: '> Loading AI Models...',              delay: 1900, typing: true },
  { id: 'l6', text: '> Initializing Memory Engine...',     delay: 2300, typing: true },
  { id: 'l7', text: '> Preparing Cognitive Workspace...',  delay: 2700, typing: true },
];

const LOG_PHASE_DURATION = 3_200; // ms before API calls fire

// ─────────────────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────────────────
export interface UseBootSequenceReturn {
  phase:           BootPhase;
  logVisible:      number;
  start:           () => void;
  cleanup:         () => void;
  notifyCheckDone: () => void;  // call once when the single API check settles
  progress:        number;      // 0-100
}

export function useBootSequence(onComplete: () => void): UseBootSequenceReturn {
  const [phase,      setPhase     ] = useState<BootPhase>('idle');
  const [logVisible, setLogVisible] = useState(0);
  const [checkDone,  setCheckDone ] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // ── Drive exit sequence once check settles ────────────
  const hasTriggered = useRef(false);
  const driveCompletion = useCallback(() => {
    if (hasTriggered.current) return;
    hasTriggered.current = true;
    const t1 = setTimeout(() => setPhase('complete'), 300);
    const t2 = setTimeout(() => setPhase('ready'),    1_100);
    const t3 = setTimeout(() => setPhase('exiting'),  3_000);
    const t4 = setTimeout(() => onComplete(),          3_900);
    timersRef.current.push(t1, t2, t3, t4);
  }, [onComplete]);

  const notifyCheckDone = useCallback(() => {
    setCheckDone(true);
    driveCompletion();
  }, [driveCompletion]);

  // ── Start ─────────────────────────────────────────────
  const start = useCallback(() => {
    setPhase('fading');
    setLogVisible(0);
    setCheckDone(false);
    hasTriggered.current = false;

    // Begin terminal log after overlay is black
    const t0 = setTimeout(() => {
      setPhase('terminal');
      TERMINAL_LINES.forEach((line, i) => {
        const t = setTimeout(() => setLogVisible(i + 1), line.delay);
        timersRef.current.push(t);
      });
      // Switch to checking phase after log completes
      const t1 = setTimeout(() => setPhase('checking'), LOG_PHASE_DURATION);
      timersRef.current.push(t1);
    }, 700);
    timersRef.current.push(t0);
  }, []);

  const cleanup = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  // ── Progress calculation ──────────────────────────────
  // Log phase: 0 → 20%
  // Check in-progress: 20% → 80% (spring animation fills the gap)
  // Check done / complete / ready: → 100%
  const logProgress =
    TERMINAL_LINES.length > 0
      ? (logVisible / TERMINAL_LINES.length) * 20
      : 0;

  const checkProgress = checkDone ? 70 : phase === 'checking' ? 10 : 0;

  const completeBonus =
    phase === 'complete' || phase === 'ready' || phase === 'exiting' ? 10 : 0;

  const progress = Math.min(logProgress + checkProgress + completeBonus, 100);

  return { phase, logVisible, start, cleanup, notifyCheckDone, progress };
}
