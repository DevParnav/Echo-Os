'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, EyeOff, Lock, Server } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import Container from '../layout/Container';

export const Privacy: React.FC = () => {
  const points = [
    {
      icon: <Shield size={20} />,
      title: 'Zero Cloud Sync',
      description: 'Your memories, thoughts, and outputs are saved completely locally. No server requests, no external tracking.',
    },
    {
      icon: <EyeOff size={20} />,
      title: 'Local AI (Ollama)',
      description: 'Powered by Ollama running local LLMs (like Qwen, Llama, Nomic). Fits seamlessly inside your RAM/GPU.',
    },
    {
      icon: <Lock size={20} />,
      title: 'Encrypted Vectors',
      description: 'All local SQLite and Chroma vector stores are encrypted at rest using local cryptographic keys.',
    },
    {
      icon: <Server size={20} />,
      title: 'Self-Hosted Control',
      description: 'You own your cognitive database. Back up, delete, or migrate your vector files anytime.',
    },
  ];

  return (
    <section
      id="privacy"
      style={{
        padding: '120px 0',
        backgroundColor: '#050505',
        borderTop: '1px solid rgba(255, 255, 255, 0.03)',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <Container>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: 'var(--space-12)',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Heading (Slide in from Left) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
          >
            <span
              style={{
                fontSize: '11px',
                fontWeight: 'bold',
                color: '#6E6E6E',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                marginBottom: 'var(--space-2)',
              }}
            >
              Security Infrastructure
            </span>
            <h2
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 'bold',
                color: '#F5F5F5',
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
                marginBottom: 'var(--space-6)',
              }}
            >
              Your thoughts should remain yours. Forever.
            </h2>
            <p
              style={{
                fontSize: 'var(--font-size-base)',
                lineHeight: 'var(--line-height-normal)',
                color: '#A8A8A8',
                maxWidth: '480px',
                margin: 0,
              }}
            >
              EchoOS is architected on local-first principles. We do not use third-party APIs. Your data never leaves your personal hardware.
            </p>
          </motion.div>

          {/* Right Column: Grid (Staggered fade-up from bottom right) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--space-6)',
            }}
          >
            {points.map((pt, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30, x: 20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <GlassCard hoverable style={{ padding: 'var(--space-6)', height: '100%' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    <div style={{ color: '#F5F5F5' }}>{pt.icon}</div>
                    <h4 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'bold', color: '#F5F5F5', margin: 0 }}>
                      {pt.title}
                    </h4>
                    <p style={{ fontSize: '13px', color: '#A8A8A8', lineHeight: 1.5, margin: 0 }}>
                      {pt.description}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Privacy;
