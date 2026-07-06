'use client';

import React from 'react';
import { BarChart2, ShieldAlert } from 'lucide-react';
import GlassCard from '../../../components/ui/GlassCard';

export default function InsightsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', padding: 'var(--space-4) 0' }}>
      <div>
        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', color: '#F5F5F5', margin: 0 }}>
          Cognitive Insights
        </h2>
        <p style={{ fontSize: 'var(--font-size-sm)', color: '#A8A8A8', marginTop: '4px', margin: 0 }}>
          Analytical mapping of bias distributions and local reasoning statistics.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 'var(--space-6)' }}>
        {/* SVG Chart Panel */}
        <GlassCard hoverable={false} animateHover={false} style={{ padding: 'var(--space-6)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#A8A8A8', fontWeight: 'bold' }}>DECISION SUCCESS VECTORS</span>
            <BarChart2 size={16} style={{ color: '#6E6E6E' }} />
          </div>

          <div style={{ width: '100%', height: '180px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 var(--space-4)' }}>
            {[65, 40, 85, 55, 90, 70].map((val, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '12%' }}>
                <div style={{ position: 'relative', width: '100%', height: '140px', display: 'flex', alignItems: 'flex-end' }}>
                  {/* Background track */}
                  <div style={{ position: 'absolute', top: 0, bottom: 0, left: 'calc(50% - 2px)', width: '4px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '999px' }} />
                  {/* Active bar */}
                  <div
                    style={{
                      height: `${val}%`,
                      width: '4px',
                      backgroundColor: '#F5F5F5',
                      borderRadius: '999px',
                      boxShadow: '0 0 10px rgba(255,255,255,0.3)',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      position: 'relative',
                      zIndex: 5,
                    }}
                  />
                </div>
                <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#6E6E6E' }}>W{idx + 1}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Biases Card */}
        <GlassCard hoverable={false} animateHover={false} style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#A8A8A8', fontWeight: 'bold' }}>COGNITIVE PATTERNS</span>
            <ShieldAlert size={16} style={{ color: '#6E6E6E' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {[
              { name: 'Sunk Cost Bias', rate: '75%', color: '#F5F5F5' },
              { name: 'Decision Fatigue', rate: '40%', color: '#A8A8A8' },
              { name: 'Confirmation Bias', rate: '20%', color: '#6E6E6E' },
            ].map((bias, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-sm)' }}>
                  <span style={{ color: '#F5F5F5', fontWeight: 500 }}>{bias.name}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: '#A8A8A8' }}>{bias.rate}</span>
                </div>
                <div style={{ height: '4px', width: '100%', backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: bias.rate, backgroundColor: bias.color }} />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
