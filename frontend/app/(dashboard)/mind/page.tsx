'use client';

import React, { useState, useEffect } from 'react';
import { Brain, Target, History, Zap, CalendarDays } from 'lucide-react';
import Card from '../../../components/ui/Card';

const MONO = '"JetBrains Mono", "Fira Code", monospace';

export default function MindPage() {
  const [greeting, setGreeting] = useState('Good Day');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* ── Greeting ────────────────────────────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-2)' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 600, letterSpacing: '-0.02em', color: '#F5F5F5', margin: '0 0 8px 0' }}>
            {greeting}, Creator
          </h1>
          <p style={{ color: '#A8A8A8', fontSize: '15px', margin: 0 }}>
            Your cognitive workspace is ready.
          </p>
        </div>
        <div style={{ fontFamily: MONO, fontSize: '12px', color: '#6E6E6E' }}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* ── Top Widgets (3 Columns) ───────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)' }}>
        
        {/* Today's Activity */}
        <WidgetCard title="Today's Activity" icon={<ActivityIcon />}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <ActivityRow label="New Memories" value="+12" trend="up" />
            <ActivityRow label="Decisions Logged" value="3" trend="neutral" />
            <ActivityRow label="Deep Work" value="4.2h" trend="up" />
          </div>
        </WidgetCard>

        {/* Active Goals */}
        <WidgetCard title="Active Goals" icon={<Target size={16} />}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <GoalRow label="Master AI Operating Systems" progress={65} />
            <GoalRow label="Weekly Physical Training" progress={40} />
            <GoalRow label="Complete Q3 OKRs" progress={80} />
          </div>
        </WidgetCard>

        {/* AI Suggestions */}
        <WidgetCard title="AI Suggestions" icon={<Zap size={16} />}>
          <p style={{ color: '#E0E0E0', fontSize: '14px', lineHeight: '1.5', margin: '0 0 12px 0' }}>
            I noticed you've been working late. Consider logging a "Rest" goal to optimize cognitive recovery for tomorrow.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 12px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '6px', fontSize: '12px', color: '#F5F5F5', cursor: 'pointer' }}>
            Apply Suggestion
          </div>
        </WidgetCard>
      </div>

      {/* ── Bottom Widgets (2 Columns) ────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-4)' }}>
        
        {/* Decision Timeline */}
        <WidgetCard title="Decision Timeline" icon={<History size={16} />} style={{ minHeight: '300px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <TimelineItem time="10:30 AM" title="Refactored Frontend Architecture" desc="Decided to move to a 3-pane layout for better AI context." type="code" />
            <TimelineItem time="09:15 AM" title="Daily Planning" desc="Prioritized AI integration over visual tweaks." type="plan" />
            <TimelineItem time="Yesterday" title="Switched to Local Models" desc="Replaced cloud API with Ollama for privacy." type="system" />
          </div>
        </WidgetCard>

        {/* Recent Memories */}
        <WidgetCard title="Recent Memories" icon={<Brain size={16} />}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <MemoryBadge text="Local-first Architecture" />
            <MemoryBadge text="Framer Motion Transitions" />
            <MemoryBadge text="FastAPI Integration" />
            <MemoryBadge text="TypeScript Generics" />
            <MemoryBadge text="Glassmorphism Design" />
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#6E6E6E', fontFamily: MONO }}>
              + 4,102 more nodes
            </div>
          </div>
        </WidgetCard>

      </div>
    </div>
  );
}

// ── Internal Components ─────────────────────────────────────

function WidgetCard({ title, icon, children, style }: { title: string, icon: React.ReactNode, children: React.ReactNode, style?: React.CSSProperties }) {
  return (
    <Card variant="glass" style={{ padding: '24px', display: 'flex', flexDirection: 'column', ...style }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', color: '#A8A8A8' }}>
        {icon}
        <h3 style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.02em', textTransform: 'uppercase', margin: 0 }}>
          {title}
        </h3>
      </div>
      <div style={{ flex: 1 }}>{children}</div>
    </Card>
  );
}

function ActivityIcon() {
  return <CalendarDays size={16} />;
}

function ActivityRow({ label, value, trend }: { label: string, value: string, trend: 'up' | 'down' | 'neutral' }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ color: '#E0E0E0', fontSize: '14px' }}>{label}</span>
      <span style={{ fontFamily: MONO, fontSize: '14px', color: trend === 'up' ? '#10B981' : trend === 'down' ? '#EF4444' : '#F5F5F5' }}>
        {value}
      </span>
    </div>
  );
}

function GoalRow({ label, progress }: { label: string, progress: number }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
        <span style={{ color: '#E0E0E0' }}>{label}</span>
        <span style={{ color: '#6E6E6E', fontFamily: MONO }}>{progress}%</span>
      </div>
      <div style={{ width: '100%', height: '4px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
        <div style={{ width: `${progress}%`, height: '100%', backgroundColor: '#F5F5F5', borderRadius: '2px' }} />
      </div>
    </div>
  );
}

function TimelineItem({ time, title, desc, type }: { time: string, title: string, desc: string, type: 'code' | 'plan' | 'system' }) {
  const color = type === 'code' ? '#60A5FA' : type === 'plan' ? '#F472B6' : '#10B981';
  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: color, marginTop: '6px' }} />
        <div style={{ width: '1px', flex: 1, backgroundColor: 'rgba(255,255,255,0.1)', marginTop: '4px' }} />
      </div>
      <div>
        <div style={{ fontFamily: MONO, fontSize: '11px', color: '#6E6E6E', marginBottom: '4px' }}>{time}</div>
        <div style={{ color: '#F5F5F5', fontSize: '14px', fontWeight: 500, marginBottom: '4px' }}>{title}</div>
        <div style={{ color: '#A8A8A8', fontSize: '13px', lineHeight: '1.5' }}>{desc}</div>
      </div>
    </div>
  );
}

function MemoryBadge({ text }: { text: string }) {
  return (
    <div style={{ 
      display: 'inline-block', 
      padding: '6px 12px', 
      backgroundColor: 'rgba(255,255,255,0.03)', 
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '8px',
      fontSize: '13px',
      color: '#E0E0E0',
      width: 'max-content'
    }}>
      {text}
    </div>
  );
}
