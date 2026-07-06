'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface StatusRow {
  label: string;
  value: string;
  delay: number;
}

const STATUS_ROWS: StatusRow[] = [
  { label: 'Local AI',         value: 'ONLINE',  delay: 0    },
  { label: 'Memory Engine',    value: 'ONLINE',  delay: 0.12 },
  { label: 'Decision Engine',  value: 'READY',   delay: 0.24 },
  { label: 'Embeddings',       value: 'READY',   delay: 0.36 },
  { label: 'Privacy Layer',    value: 'ENABLED', delay: 0.48 },
];

/**
 * Standalone system-status grid shown at the end of the boot sequence.
 * Kept as a separate component so it can be reused in dashboards.
 */
export const SystemStatus: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        fontFamily: '"JetBrains Mono", "Fira Code", monospace',
        fontSize: '12px',
      }}
    >
      {STATUS_ROWS.map((row) => (
        <motion.div
          key={row.label}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: row.delay, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '4px 0',
            borderBottom: '1px solid rgba(255,255,255,0.04)',
          }}
        >
          <span style={{ color: '#6E6E6E' }}>{row.label}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {/* Blinking status dot */}
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                backgroundColor: '#F5F5F5',
                boxShadow: '0 0 5px rgba(245,245,245,0.6)',
                display: 'inline-block',
              }}
            />
            <span style={{ color: '#F5F5F5', fontWeight: 700, fontSize: '11px', letterSpacing: '0.06em' }}>
              {row.value}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SystemStatus;
