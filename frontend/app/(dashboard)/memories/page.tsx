'use client';

import React from 'react';
import { History } from 'lucide-react';
import GlassCard from '../../../components/ui/GlassCard';

export default function MemoriesPage() {
  const memoryLogs = [
    { date: 'July 5, 2026', title: 'Declined React Course Checkout', desc: 'Sunk Cost Bias trigger prevented purchasing duplicate react materials. Sync efficiency confirmed.' },
    { date: 'June 28, 2026', title: 'Vite Boilerplate Framework Selection', desc: 'Outlined roadmap constraints. Prioritizing custom design systems over boilerplate dependencies.' },
    { date: 'June 15, 2026', title: 'Local AI Weight Adjustments', desc: 'Configured local ChromaDB collection limits to optimize GPU memory buffers on 16GB VRAM.' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', padding: 'var(--space-4) 0' }}>
      <div>
        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', color: '#F5F5F5', margin: 0 }}>
          Memory Log
        </h2>
        <p style={{ fontSize: 'var(--font-size-sm)', color: '#A8A8A8', marginTop: '4px', margin: 0 }}>
          Chronological index of cognitive weights and structured experiences.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {memoryLogs.map((log, idx) => (
          <GlassCard key={idx} style={{ padding: 'var(--space-5)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#6E6E6E', fontWeight: 'bold' }}>
                {log.date}
              </span>
              <History size={14} style={{ color: '#6E6E6E' }} />
            </div>
            <h4 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'bold', color: '#F5F5F5', margin: '0 0 6px 0' }}>
              {log.title}
            </h4>
            <p style={{ fontSize: 'var(--font-size-sm)', color: '#A8A8A8', lineHeight: 1.5, margin: 0 }}>
              {log.desc}
            </p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
