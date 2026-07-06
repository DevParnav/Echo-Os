'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckStatus } from './types/boot';
import PopButton from '../../components/ui/pop-button';

const MONO = '"JetBrains Mono", "Fira Code", "Cascadia Code", "SF Mono", monospace';

// ── Status Indicator ──────────────────────────────────────

const Spinner: React.FC = () => (
  <>
    <style>{`
      @keyframes echo-spin { to { transform: rotate(360deg); } }
    `}</style>
    <span
      style={{
        display: 'inline-block',
        width: '10px',
        height: '10px',
        border: '1.5px solid rgba(255,255,255,0.15)',
        borderTopColor: '#A8A8A8',
        borderRadius: '50%',
        animation: 'echo-spin 0.7s linear infinite',
        flexShrink: 0,
      }}
    />
  </>
);

const statusIcon = (s: CheckStatus): React.ReactNode => {
  switch (s) {
    case 'checking': return <Spinner />;
    case 'success':  return <span style={{ color: '#F5F5F5', fontWeight: 700 }}>✓</span>;
    case 'warning':  return <span style={{ color: '#A8A8A8', fontWeight: 700 }}>⚠</span>;
    case 'error':    return <span style={{ color: '#6E6E6E', fontWeight: 700 }}>✕</span>;
    default:         return <span style={{ color: '#3A3A3A' }}>·</span>;
  }
};

// ── Props ─────────────────────────────────────────────────

interface SystemCheckProps {
  label:    string;
  status:   CheckStatus;
  value?:   string | string[] | null;
  subRows?: Array<{ label: string; value?: string; status?: CheckStatus }>;
  error?:   string | null;
  onRetry?: () => void;
}

// ── Component ─────────────────────────────────────────────

export const SystemCheck: React.FC<SystemCheckProps> = ({
  label,
  status,
  value,
  subRows,
  error,
  onRetry,
}) => {
  const values = value
    ? Array.isArray(value) ? value : [value]
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
    >
      {/* Main row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '140px 16px 1fr',
          gap: '8px',
          alignItems: 'center',
          fontFamily: MONO,
          fontSize: '12px',
        }}
      >
        <span style={{ color: '#6E6E6E', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {label}
        </span>

        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {statusIcon(status)}
        </span>

        <span style={{ color: status === 'success' ? '#F5F5F5' : status === 'warning' ? '#A8A8A8' : status === 'error' ? '#6E6E6E' : '#3A3A3A', whiteSpace: 'nowrap' }}>
          <AnimatePresence mode="wait">
            {status === 'pending' && (
              <motion.span key="p" initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} exit={{ opacity: 0 }}>
                —
              </motion.span>
            )}
            {status === 'checking' && (
              <motion.span key="c" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ color: '#4A4A4A', fontStyle: 'italic' }}>
                Checking...
              </motion.span>
            )}
            {(status === 'success' || status === 'warning') && values.length > 0 && (
              <motion.span key="v" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>
                {values[0]}
              </motion.span>
            )}
            {(status === 'success' || status === 'warning') && values.length === 0 && (
              <motion.span key="s" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                style={{ color: '#A8A8A8' }}>
                Ready
              </motion.span>
            )}
            {status === 'error' && (
              <motion.span key="e" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{ color: '#6E6E6E' }}>
                {error ?? 'Unavailable'}
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </div>

      {/* Additional value rows (e.g. model list) */}
      <AnimatePresence>
        {(status === 'success' || status === 'warning') && values.length > 1 &&
          values.slice(1).map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, duration: 0.25 }}
              style={{
                display: 'grid',
                gridTemplateColumns: '140px 16px 1fr',
                gap: '8px',
                fontFamily: MONO,
                fontSize: '12px',
              }}
            >
              <span />
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F5F5F5', fontWeight: 700, fontSize: '10px' }}>✓</span>
              <span style={{ color: '#C0C0C0' }}>{v}</span>
            </motion.div>
          ))
        }
      </AnimatePresence>

      {/* Sub-rows (e.g. GPU VRAM under GPU name) */}
      <AnimatePresence>
        {subRows && (status === 'success' || status === 'warning') &&
          subRows.map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.07 }}
              style={{
                display: 'grid',
                gridTemplateColumns: '140px 16px 1fr',
                gap: '8px',
                fontFamily: MONO,
                fontSize: '11px',
              }}
            >
              <span style={{ color: '#3A3A3A', paddingLeft: '12px' }}>{row.label}</span>
              <span />
              <span style={{ color: '#5A5A5A' }}>{row.value ?? '—'}</span>
            </motion.div>
          ))
        }
      </AnimatePresence>

      {/* Retry button */}
      <AnimatePresence>
        {status === 'error' && onRetry && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ paddingLeft: '164px', marginTop: '2px' }}
          >
            <PopButton
              size="sm"
              onClick={onRetry}
              style={{
                fontFamily: MONO,
                fontSize: '10px',
                color: '#6E6E6E',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.08)',
                letterSpacing: '0.04em',
              }}
            >
              RETRY
            </PopButton>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SystemCheck;
