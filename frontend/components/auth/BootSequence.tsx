'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

interface BootSequenceProps {
  onComplete: () => void;
}

export const BootSequence: React.FC<BootSequenceProps> = ({
  onComplete,
}) => {
  const [bootProgress, setBootProgress] = useState(0);
  const [bootLogs, setBootLogs] = useState<string[]>([]);

  useEffect(() => {
    const logs = [
      'EchoOS Core',
      'Initializing system modules...',
      'Loading Cognitive Engine...',
      'Checking Local AI...',
      'Qwen3            ✓',
      'Nomic Embed      ✓',
      'Memory Engine    Ready',
    ];

    let logIdx = 0;
    const logInterval = setInterval(() => {
      if (logIdx < logs.length) {
        const currentLog = logs[logIdx];
        setBootLogs((prev) => [...prev, currentLog]);
        logIdx++;
      } else {
        clearInterval(logInterval);
      }
    }, 450);

    const progressInterval = setInterval(() => {
      setBootProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            onComplete();
          }, 600);
          return 100;
        }
        return prev + 1.25;
      });
    }, 40);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98, y: -10 }}
      transition={{ duration: 0.4 }}
      style={{
        width: '100%',
        maxWidth: '440px',
        margin: '0 auto',
      }}
    >
      <GlassCard hoverable={false} animateHover={false} style={{ padding: 'var(--space-8)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-6)' }}>
          <Terminal size={16} style={{ color: '#A8A8A8' }} />
          <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'bold', letterSpacing: '-0.02em' }}>EchoOS</span>
        </div>

        {/* Console log outputs */}
        <div style={{ minHeight: '160px', display: 'flex', flexDirection: 'column', gap: '6px', fontFamily: 'var(--font-mono)', fontSize: '13px', marginBottom: 'var(--space-6)' }}>
          {bootLogs.map((log, idx) => {
            if (!log) return null;
            const isCheck = log.includes('✓') || log.includes('Ready');
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  color: isCheck ? '#F5F5F5' : '#A8A8A8',
                }}
              >
                <span>{log.replace('✓', '').replace('Ready', '')}</span>
                {log.includes('✓') && <span style={{ color: '#F5F5F5' }}>✓</span>}
                {log.includes('Ready') && <span style={{ color: '#F5F5F5', fontWeight: 'bold' }}>Ready</span>}
              </motion.div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#6E6E6E', fontFamily: 'var(--font-mono)' }}>
            <span>LOADING PATHWAYS</span>
            <span>{Math.round(bootProgress)}%</span>
          </div>
          <div style={{ height: '4px', width: '100%', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '999px', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${bootProgress}%`,
                backgroundColor: '#F5F5F5',
                boxShadow: '0 0 10px rgba(255,255,255,0.4)',
                transition: 'width 0.1s linear',
              }}
            />
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default BootSequence;
