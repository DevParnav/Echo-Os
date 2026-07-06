'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSystemStatus } from '../../features/boot/hooks/useSystemStatus';
import { Cpu, Server, Database, Activity, HardDrive, Shield, ChevronRight, ChevronLeft } from 'lucide-react';
import Card from '../ui/Card';

const MONO = '"JetBrains Mono", "Fira Code", monospace';

export default function RightPanel() {
  const { data, status, check } = useSystemStatus();
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('echoos_right_panel_collapsed');
    if (saved === 'true') setCollapsed(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('echoos_right_panel_collapsed', String(collapsed));
    }
  }, [collapsed, mounted]);

  // On mount, if it's pending, fire a check
  useEffect(() => {
    if (status === 'pending') {
      check();
    }
  }, [status, check]);

  if (!mounted) return null;

  return (
    <motion.div
      initial={false}
      animate={{ width: collapsed ? '48px' : '280px' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      style={{
        height: 'calc(100vh - var(--space-8))',
        margin: 'var(--space-4) var(--space-4) var(--space-4) 0',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Card
        variant="glass"
        hoverable={false}
        animateHover={false}
        style={{
          width: '100%',
          height: '100%',
          padding: collapsed ? 'var(--space-4) 0' : 'var(--space-6)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-6)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            position: 'absolute',
            top: '16px',
            right: collapsed ? '12px' : '16px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '6px',
            color: '#A8A8A8',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#F5F5F5';
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#A8A8A8';
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
          }}
          title={collapsed ? 'Show System Status' : 'Hide System Status'}
        >
          {collapsed ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>

        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', height: '100%', overflowY: 'auto', overflowX: 'hidden' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: '32px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#F5F5F5' }}>System Status</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: status === 'success' ? '#10B981' : status === 'error' ? '#EF4444' : '#F59E0B' }} />
                  <span style={{ fontFamily: MONO, fontSize: '10px', color: '#A8A8A8', textTransform: 'uppercase' }}>
                    {status}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {/* Hardware */}
                <StatusSection title="Hardware">
                  <StatusRow icon={<Cpu size={14} />} label="CPU" value={data?.hardware.cpu?.name || 'Unknown'} />
                  <StatusRow icon={<Cpu size={14} />} label="Cores" value={data?.hardware.cpu?.cores ? `${data.hardware.cpu.cores} Cores` : 'Unknown'} />
                  <StatusRow icon={<Server size={14} />} label="GPU" value={data?.hardware.gpu?.name || 'None'} />
                  <StatusRow icon={<Server size={14} />} label="VRAM" value={data?.hardware.gpu?.vram || 'None'} />
                  <StatusRow icon={<Database size={14} />} label="RAM Total" value={data?.hardware.ram?.total || 'Unknown'} />
                  <StatusRow icon={<Database size={14} />} label="RAM Available" value={data?.hardware.ram?.available || 'Unknown'} />
                  <StatusRow icon={<HardDrive size={14} />} label="Disk Total" value={data?.hardware.disk?.total || 'Unknown'} />
                  <StatusRow icon={<HardDrive size={14} />} label="Disk Free" value={data?.hardware.disk?.free || 'Unknown'} />
                  <StatusRow icon={<Activity size={14} />} label="OS" value={data?.hardware.os || 'Unknown'} />
                  <StatusRow icon={<Activity size={14} />} label="Hostname" value={data?.hardware.hostname || 'Unknown'} />
                </StatusSection>

                <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.05)' }} />

                {/* AI Engine */}
                <StatusSection title="AI Engine">
                  <StatusRow 
                    icon={<Activity size={14} />} 
                    label="Ollama Status" 
                    value={data?.ollama.running ? 'Running' : 'Offline'} 
                    isGood={data?.ollama.running}
                  />
                  <StatusRow 
                    icon={<Server size={14} />} 
                    label="Ollama Version" 
                    value={data?.ollama.version || 'Unknown'} 
                  />
                  <StatusRow 
                    icon={<Server size={14} />} 
                    label="Models" 
                    value={data?.ollama.models?.length ? `${data.ollama.models.length} Installed` : '0 Installed'} 
                  />
                </StatusSection>

                <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.05)' }} />

                {/* Memory Engine */}
                <StatusSection title="Memory Engine">
                  <StatusRow 
                    icon={<Database size={14} />} 
                    label="Vector DB" 
                    value={data?.memory.chromadb ? 'Chroma' : data?.memory.sqlite ? 'SQLite' : 'Offline'} 
                  />
                  <StatusRow 
                    icon={<Shield size={14} />} 
                    label="Privacy Layer" 
                    value="Active" 
                    isGood={true}
                  />
                </StatusSection>
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: MONO, fontSize: '10px', color: '#6E6E6E' }}>LATENCY</span>
                <span style={{ fontFamily: MONO, fontSize: '11px', color: '#F5F5F5' }}>
                  {data?.health.latency ? `${data.health.latency}ms` : '--'}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}

function StatusSection({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <span style={{ fontFamily: MONO, fontSize: '10px', fontWeight: 600, color: '#6E6E6E', letterSpacing: '0.06em', marginBottom: '4px' }}>
        {title.toUpperCase()}
      </span>
      {children}
    </div>
  );
}

function StatusRow({ icon, label, value, isGood }: { icon: React.ReactNode, label: string, value: string, isGood?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#A8A8A8' }}>
        {icon}
        <span style={{ fontSize: '13px' }}>{label}</span>
      </div>
      <span style={{ 
        fontFamily: MONO, 
        fontSize: '11px', 
        color: isGood === true ? '#10B981' : isGood === false ? '#EF4444' : '#E0E0E0' 
      }}>
        {value}
      </span>
    </div>
  );
}
