'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { BootPhase, BootLogLine, CheckStatus } from './types/boot';
import { HardwareInfo, OllamaInfo, MemoryInfo } from './types/system';

import BootLog       from './BootLog';
import HardwarePanel from './HardwarePanel';
import ModelPanel    from './ModelPanel';
import HealthPanel   from './HealthPanel';

const MONO    = '"JetBrains Mono", "Fira Code", "Cascadia Code", monospace';
const DIVIDER = '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━';

interface BootTerminalProps {
  phase:      BootPhase;
  logLines:   BootLogLine[];
  logVisible: number;

  // All data slices from the single API response
  checkStatus: CheckStatus;
  hwData:      HardwareInfo | null;
  ollamaData:  OllamaInfo   | null;
  memoryData:  MemoryInfo   | null;
  apiError:    string | null;
  onRetry:     () => void;
}

export const BootTerminal: React.FC<BootTerminalProps> = ({
  phase, logLines, logVisible,
  checkStatus, hwData, ollamaData, memoryData, apiError, onRetry,
}) => {
  const showChecks = phase === 'checking' || phase === 'complete' || phase === 'ready' || phase === 'exiting';
  const showReady  = phase === 'ready'    || phase === 'exiting';

  return (
    <div style={{ width: '100%', maxWidth: '700px', display: 'flex', flexDirection: 'column' }}>

      {/* ── Top bar ─────────────────────────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        paddingBottom: '12px', marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <motion.div
            animate={{ rotate: [0, 45, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: '13px', height: '13px', backgroundColor: '#F5F5F5',
              borderRadius: '3px', flexShrink: 0 }}
          />
          <span style={{ fontFamily: MONO, fontSize: '13px', fontWeight: 700,
            color: '#F5F5F5', letterSpacing: '-0.01em' }}>
            EchoOS  <span style={{ color: '#3A3A3A', fontWeight: 400 }}>v1.0.0</span>
          </span>
        </div>

        {/* Live badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <motion.span
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#F5F5F5',
              boxShadow: '0 0 6px rgba(245,245,245,0.7)', display: 'inline-block' }}
          />
          <span style={{ fontFamily: MONO, fontSize: '10px', fontWeight: 700,
            color: '#4A4A4A', letterSpacing: '0.08em' }}>
            {showReady ? 'READY' : 'BOOTING'}
          </span>
        </div>
      </div>

      {/* ── Scrollable body ─────────────────────────────── */}
      <div style={{ maxHeight: '65vh', overflowY: 'auto', overflowX: 'hidden',
        scrollbarWidth: 'none', msOverflowStyle: 'none',
        display: 'flex', flexDirection: 'column', gap: '0px' }}>
        <style>{`div::-webkit-scrollbar { display: none; }`}</style>

        <BootLog lines={logLines} visibleCount={logVisible} />

        <AnimatePresence>
          {showChecks && (
            <motion.div key="panels" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '16px' }}>

              <span style={{ fontFamily: MONO, fontSize: '10px',
                color: 'rgba(255,255,255,0.06)', userSelect: 'none' }}>{DIVIDER}</span>

              <HardwarePanel
                status={checkStatus}
                data={hwData}
                onRetry={onRetry}
              />

              <span style={{ fontFamily: MONO, fontSize: '10px',
                color: 'rgba(255,255,255,0.06)', userSelect: 'none' }}>{DIVIDER}</span>

              <ModelPanel
                status={checkStatus}
                data={ollamaData}
                error={apiError}
                onRetry={onRetry}
              />

              <span style={{ fontFamily: MONO, fontSize: '10px',
                color: 'rgba(255,255,255,0.06)', userSelect: 'none' }}>{DIVIDER}</span>

              <HealthPanel
                status={checkStatus}
                data={memoryData}
                onRetry={onRetry}
              />

              {/* Final "System Ready" message */}
              <AnimatePresence>
                {showReady && (
                  <motion.div key="ready" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingTop: '8px' }}>
                    <span style={{ fontFamily: MONO, fontSize: '10px',
                      color: 'rgba(255,255,255,0.06)', userSelect: 'none' }}>{DIVIDER}</span>
                    <div style={{ height: '12px' }} />
                    {['EchoOS', 'System Ready.', 'Welcome Back.', 'Opening Workspace...'].map((line, i) => (
                      <motion.div key={line}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.3, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        style={{ fontFamily: MONO,
                          fontSize: i === 0 ? '16px' : '13px',
                          fontWeight: i === 0 ? 700 : 400,
                          color: i === 0 ? '#F5F5F5' : i === 3 ? '#4A4A4A' : '#A8A8A8',
                          letterSpacing: i === 0 ? '-0.02em' : '0',
                        }}>
                        {line}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
        <div style={{ height: '24px' }} />
      </div>

      {/* ── Bottom meta ─────────────────────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        paddingTop: '10px', marginTop: '10px', borderTop: '1px solid rgba(255,255,255,0.04)',
        fontFamily: MONO, fontSize: '10px', color: '#2A2A2A', letterSpacing: '0.06em' }}>
        <span>ECHOOS  ·  LOCAL COGNITIVE MODE  ·  v1.0.0</span>
        <span>{new Date().toLocaleTimeString('en-US', { hour12: false })}</span>
      </div>
    </div>
  );
};

export default BootTerminal;
