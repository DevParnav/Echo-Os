'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Container from '../layout/Container';
import GlassCard from '../ui/GlassCard';

export const Roadmap: React.FC = () => {
  const items = [
    {
      quarter: 'Q3 2026',
      title: 'Contextual Filters',
      description: 'Filter reasoning trees based on fatigue levels, mood registers, and locations.',
      status: 'In Progress',
    },
    {
      quarter: 'Q4 2026',
      title: 'Sleep Consolidation',
      description: 'Local background agent compiles and reduces daily memories into compressed mental tokens.',
      status: 'Planned',
    },
    {
      quarter: 'Q1 2027',
      title: 'Multi-Agent Reasoning',
      description: 'Spawns internal virtual agents representing different thinking biases to challenge your plans.',
      status: 'Planned',
    },
    {
      quarter: 'Q2 2027',
      title: 'Cross-Device Local Sync',
      description: 'Peer-to-peer encrypted synchronization between mobile and desktop vector spaces.',
      status: 'Planned',
    },
  ];

  return (
    <section
      id="roadmap"
      style={{
        padding: '120px 0',
        backgroundColor: '#050505',
        borderTop: '1px solid rgba(255, 255, 255, 0.03)',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <Container>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-16)' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 'bold',
              color: '#6E6E6E',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
            }}
          >
            Project Evolution
          </span>
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              marginTop: 'var(--space-2)',
              fontWeight: 'bold',
              color: '#F5F5F5',
              letterSpacing: '-0.03em',
            }}
          >
            Roadmap to Cognitive Autonomy
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 'var(--space-6)',
          }}
        >
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <GlassCard hoverable style={{ padding: 'var(--space-6)', height: '100%', display: 'flex', flexDirection: 'column', justifyItems: 'space-between', justifyContent: 'space-between', borderTop: item.status === 'In Progress' ? '2px solid #F5F5F5' : '1px solid rgba(255, 255, 255, 0.06)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#A8A8A8', fontWeight: 'bold' }}>
                      {item.quarter}
                    </span>
                    <span style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', padding: '2px 6px', borderRadius: '4px', backgroundColor: item.status === 'In Progress' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.02)', color: item.status === 'In Progress' ? '#F5F5F5' : '#6E6E6E', border: '1px solid rgba(255,255,255,0.05)', fontWeight: 'bold' }}>
                      {item.status.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h4 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'bold', color: '#F5F5F5', marginBottom: '8px' }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: 'var(--font-size-sm)', color: '#A8A8A8', lineHeight: 1.5, margin: 0 }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Roadmap;
