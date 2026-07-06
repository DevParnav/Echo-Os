'use client';

import React, { useEffect, useRef } from 'react';
import { motion }            from 'framer-motion';

import { useBootSequence, TERMINAL_LINES } from './hooks/useBootSequence';
import { useSystemStatus }                 from './hooks/useSystemStatus';

import ParticleBackground from './ParticleBackground';
import BootTerminal       from './BootTerminal';
import ProgressBar        from './ProgressBar';

interface BootSequenceProps {
  onComplete: () => void;
}

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  // ── Phase orchestration ───────────────────────────────
  const boot = useBootSequence(onComplete);

  // ── Single unified system check ───────────────────────
  const sysCheck = useSystemStatus();

  // ── Notify boot when check settles ───────────────────
  const notified = useRef(false);
  useEffect(() => {
    const settled = sysCheck.status !== 'pending' && sysCheck.status !== 'checking';
    if (settled && !notified.current) {
      notified.current = true;
      boot.notifyCheckDone();
    }
  }, [sysCheck.status]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Fire API call when checking phase begins ──────────
  const fired = useRef(false);
  useEffect(() => {
    if (boot.phase === 'checking' && !fired.current) {
      fired.current = true;
      sysCheck.check();
    }
  }, [boot.phase]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Start on mount ────────────────────────────────────
  useEffect(() => {
    boot.start();
    return () => {
      boot.cleanup();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const isExiting = boot.phase === 'exiting';

  // Retry resets the notification guard and retries the API call
  const handleRetry = () => {
    notified.current = false;
    sysCheck.retry();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={isExiting
        ? { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
        : { duration: 0.65, ease: 'easeOut' }
      }
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        backgroundColor: '#000',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <ParticleBackground />

      {boot.phase !== 'idle' && boot.phase !== 'fading' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.995 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative', zIndex: 10, width: '100%', padding: '0 24px',
            display: 'flex', justifyContent: 'center' }}
        >
          <BootTerminal
            phase={boot.phase}
            logLines={TERMINAL_LINES}
            logVisible={boot.logVisible}

            checkStatus={sysCheck.status}
            hwData={sysCheck.data?.hardware ?? null}
            ollamaData={sysCheck.data?.ollama   ?? null}
            memoryData={sysCheck.data?.memory   ?? null}
            apiError={sysCheck.error}
            onRetry={handleRetry}
          />
        </motion.div>
      )}

      <ProgressBar
        value={boot.progress}
        visible={boot.phase !== 'idle' && boot.phase !== 'fading'}
      />
    </motion.div>
  );
};

export default BootSequence;
