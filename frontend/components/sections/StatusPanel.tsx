'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';

interface StatusPanelProps {
  screenState?: 'landing' | 'booting' | 'login';
}

export const StatusPanel: React.FC<StatusPanelProps> = ({
  screenState = 'landing',
}) => {
  const [privacyValue, setPrivacyValue] = useState(0);
  const [ramUsage, setRamUsage] = useState(4.18);
  const [latency, setLatency] = useState(13);

  // Increment Privacy loader
  useEffect(() => {
    if (screenState !== 'landing') return;
    setPrivacyValue(0);
    const interval = setInterval(() => {
      setPrivacyValue((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 25);
    return () => clearInterval(interval);
  }, [screenState]);

  // Fluctuating real-time RAM and Latency loops
  useEffect(() => {
    const interval = setInterval(() => {
      setRamUsage((prev) => {
        const delta = (Math.random() - 0.5) * 0.06;
        const next = parseFloat((prev + delta).toFixed(2));
        return next < 4.0 ? 4.0 : next > 4.5 ? 4.5 : next;
      });
      setLatency((prev) => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        const next = prev + delta;
        return next < 10 ? 10 : next > 18 ? 18 : next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const items = [
    { label: 'Model Core', value: 'Qwen2.5-Coder (1.5B)', status: 'active' },
    { label: 'GPU Engine', value: 'RTX 4090 / CUDA', status: 'active' },
    { label: 'Active RAM', value: `${ramUsage} GB`, status: 'active', hasProgress: true, progressPct: ((ramUsage - 4.0) / 0.5) * 100 },
    { label: 'Network Ping', value: `${latency} ms`, status: 'active', hasProgress: true, progressPct: ((latency - 10) / 8) * 100 },
    { label: 'Index Privacy', value: `${privacyValue}%`, status: 'active' },
  ];

  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        width: '100%',
        maxWidth: '380px',
      }}
    >
      <GlassCard hoverable={false} animateHover={false} style={{ padding: 'var(--space-6) var(--space-8)' }}>
        {/* Card Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-5)', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 'var(--space-3)' }}>
          <span style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.1em', color: '#A8A8A8', fontFamily: 'var(--font-mono)' }}>COGNITIVE MONITOR</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#F5F5F5',
                boxShadow: '0 0 8px rgba(245, 245, 245, 0.8)',
              }}
            />
            <span style={{ fontSize: '9px', fontWeight: 'bold', letterSpacing: '0.05em', color: '#F5F5F5', fontFamily: 'var(--font-mono)' }}>LIVE NODE</span>
          </div>
        </div>

        {/* System Diagnostics */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {items.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <motion.span
                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.2 }}
                    style={{
                      width: '5px',
                      height: '5px',
                      borderRadius: '50%',
                      backgroundColor: '#F5F5F5',
                      boxShadow: '0 0 6px rgba(245,245,245,0.5)',
                      display: 'inline-block',
                    }}
                  />
                  <span style={{ fontSize: '12px', color: '#A8A8A8', fontWeight: '500', fontFamily: 'var(--font-mono)' }}>{item.label}</span>
                </div>
                
                <span style={{ fontSize: '12px', color: '#F5F5F5', fontWeight: 'bold', fontFamily: 'var(--font-mono)' }}>
                  {item.value}
                </span>
              </div>

              {/* Conditional Progress Bar / Oscillators */}
              {item.hasProgress && (
                <div style={{ height: '3px', width: '100%', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '999px', overflow: 'hidden' }}>
                  <motion.div
                    animate={{ width: `${item.progressPct}%` }}
                    transition={{ type: 'spring', stiffness: 80, damping: 15 }}
                    style={{ height: '100%', backgroundColor: '#A8A8A8', opacity: 0.6 }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Console Sync Footer */}
        <div style={{ marginTop: 'var(--space-6)', paddingTop: 'var(--space-4)', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <small style={{ color: '#6E6E6E', fontSize: '9px', fontWeight: 'bold', fontFamily: 'var(--font-mono)' }}>HARDWARE INDEX ACTIVE</small>
          <small style={{ color: '#A8A8A8', fontSize: '9px', fontWeight: 'bold', fontFamily: 'var(--font-mono)' }}>v0.1.20-OLLAMA</small>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default StatusPanel;
