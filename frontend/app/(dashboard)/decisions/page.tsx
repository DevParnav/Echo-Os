'use client';

import React from 'react';
import { CheckSquare } from 'lucide-react';
import GlassCard from '../../../components/ui/GlassCard';

export default function DecisionsPage() {
  const decisions = [
    { title: 'Decline UI Engineering course purchase', status: 'Succeeded', alignment: 'High', date: 'July 5, 2026' },
    { title: 'Implement custom Vanilla CSS token set', status: 'Succeeded', alignment: 'Max', date: 'July 4, 2026' },
    { title: 'Migrate landing page to route group routing', status: 'Succeeded', alignment: 'Max', date: 'July 3, 2026' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', padding: 'var(--space-4) 0' }}>
      <div>
        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', color: '#F5F5F5', margin: 0 }}>
          Decision Tracker
        </h2>
        <p style={{ fontSize: 'var(--font-size-sm)', color: '#A8A8A8', marginTop: '4px', margin: 0 }}>
          Monitor the lifecycle and parameter alignment of your active decisions.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {decisions.map((dec, idx) => (
          <GlassCard key={idx} style={{ padding: 'var(--space-5)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckSquare size={16} style={{ color: '#F5F5F5' }} />
                <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'bold', color: '#F5F5F5' }}>
                  {dec.title}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
                <span style={{ color: '#6E6E6E' }}>ALIGNMENT: {dec.alignment}</span>
                <span style={{ color: '#F5F5F5', fontWeight: 'bold' }}>{dec.status.toUpperCase()}</span>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
