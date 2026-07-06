'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useSystemStatus } from '../../features/boot/hooks/useSystemStatus';
import { Check, Shield, Server, Box, ArrowRight, Loader2 } from 'lucide-react';
import PopButton from '../ui/pop-button';

const MONO = '"JetBrains Mono", "Fira Code", monospace';

type WizardStep = 'welcome' | 'workspace' | 'privacy' | 'detection' | 'completion';

export default function OnboardingWizard() {
  const router = useRouter();
  const [step, setStep] = useState<WizardStep>('welcome');
  const [workspaceName, setWorkspaceName] = useState('My Workspace');
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const { data, status, check } = useSystemStatus();

  const nextStep = (next: WizardStep) => {
    setStep(next);
  };

  const handleComplete = () => {
    router.push('/mind');
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: '#050505',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <AnimatePresence mode="wait">
        {step === 'welcome' && (
          <WizardCard key="welcome">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <div style={{ width: '48px', height: '48px', backgroundColor: '#F5F5F5', borderRadius: '12px', marginBottom: '24px' }} />
            </motion.div>
            <h1 style={{ fontSize: '32px', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: '16px' }}>
              Welcome to EchoOS
            </h1>
            <p style={{ color: '#A8A8A8', fontSize: '16px', lineHeight: '1.5', marginBottom: '32px' }}>
              You are entering a local-first cognitive operating system. 
              No cloud accounts. No tracking. Just your hardware and your mind.
            </p>
            <Button onClick={() => nextStep('workspace')}>Begin Setup</Button>
          </WizardCard>
        )}

        {step === 'workspace' && (
          <WizardCard key="workspace">
            <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '16px' }}>
              Name Your Workspace
            </h2>
            <p style={{ color: '#A8A8A8', fontSize: '15px', marginBottom: '24px' }}>
              This is your isolated cognitive environment.
            </p>
            <input
              type="text"
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              style={{
                width: '100%',
                padding: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                color: '#F5F5F5',
                fontSize: '16px',
                fontFamily: MONO,
                marginBottom: '32px',
                outline: 'none',
              }}
              onFocus={(e) => (e.target.style.border = '1px solid rgba(255, 255, 255, 0.3)')}
              onBlur={(e) => (e.target.style.border = '1px solid rgba(255, 255, 255, 0.1)')}
            />
            <Button onClick={() => nextStep('privacy')} disabled={!workspaceName.trim()}>
              Continue
            </Button>
          </WizardCard>
        )}

        {step === 'privacy' && (
          <WizardCard key="privacy">
            <Shield size={40} color="#F5F5F5" style={{ marginBottom: '24px' }} />
            <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '16px' }}>
              Privacy by Design
            </h2>
            <p style={{ color: '#A8A8A8', fontSize: '15px', lineHeight: '1.6', marginBottom: '32px' }}>
              EchoOS is fully local. Your memories, decisions, and data never leave this device. 
              There are no telemetry servers.
            </p>
            
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', marginBottom: '32px' }}>
              <div 
                style={{ 
                  width: '24px', height: '24px', borderRadius: '6px', 
                  border: '1px solid rgba(255,255,255,0.2)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  backgroundColor: privacyAgreed ? '#F5F5F5' : 'transparent'
                }}
              >
                {privacyAgreed && <Check size={16} color="#000" />}
              </div>
              <span style={{ fontSize: '14px', color: '#E0E0E0' }}>
                I understand my data is stored locally and securely.
              </span>
              <input type="checkbox" checked={privacyAgreed} onChange={(e) => setPrivacyAgreed(e.target.checked)} style={{ display: 'none' }} />
            </label>

            <Button onClick={() => {
              check(); // start fetching system status again for the next step
              nextStep('detection');
            }} disabled={!privacyAgreed}>
              Confirm
            </Button>
          </WizardCard>
        )}

        {step === 'detection' && (
          <WizardCard key="detection">
            <Server size={40} color="#F5F5F5" style={{ marginBottom: '24px' }} />
            <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '16px' }}>
              AI Environment
            </h2>
            <p style={{ color: '#A8A8A8', fontSize: '15px', marginBottom: '24px' }}>
              EchoOS relies on your local compute.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
              <StatusRow label="Hardware" value={data?.hardware.cpu ? 'Detected' : 'Checking...'} ready={!!data?.hardware.cpu} />
              <StatusRow label="Ollama Runtime" value={data?.ollama.running ? 'Running' : 'Checking...'} ready={data?.ollama.running} />
              <StatusRow label="Vector Engine" value={data?.memory.chromadb || data?.memory.sqlite ? 'Ready' : 'Checking...'} ready={!!data?.memory.sqlite} />
            </div>

            <Button onClick={() => nextStep('completion')} disabled={status === 'pending' || status === 'checking'}>
              Finalize Setup
            </Button>
          </WizardCard>
        )}

        {step === 'completion' && (
          <WizardCard key="completion">
            <Box size={48} color="#F5F5F5" style={{ marginBottom: '24px' }} />
            <h2 style={{ fontSize: '32px', fontWeight: 600, marginBottom: '16px' }}>
              System Ready
            </h2>
            <p style={{ color: '#A8A8A8', fontSize: '16px', marginBottom: '32px' }}>
              Workspace "{workspaceName}" has been initialized.
            </p>
            <Button onClick={handleComplete}>
              Enter Workspace
            </Button>
          </WizardCard>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Shared UI Helpers ─────────────────────────────────────

function WizardCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{
        width: '100%',
        maxWidth: '480px',
        padding: '40px',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '24px',
        backdropFilter: 'blur(20px)',
      }}
    >
      {children}
    </motion.div>
  );
}

function Button({ children, onClick, disabled }: { children: React.ReactNode, onClick: () => void, disabled?: boolean }) {
  return (
    <PopButton
      size="lg"
      onClick={onClick}
      disabled={disabled}
      style={{
        width: '100%',
        backgroundColor: disabled ? 'rgba(255, 255, 255, 0.1)' : '#F5F5F5',
        color: disabled ? 'rgba(255, 255, 255, 0.3)' : '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
      }}
    >
      {children}
      {!disabled && <ArrowRight size={18} />}
    </PopButton>
  );
}

function StatusRow({ label, value, ready }: { label: string, value: string, ready?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
      <span style={{ color: '#E0E0E0', fontSize: '14px' }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontFamily: MONO, fontSize: '12px', color: ready ? '#F5F5F5' : '#888' }}>{value}</span>
        {ready === false && <Loader2 size={14} className="animate-spin" color="#888" />}
        {ready === true && <Check size={14} color="#F5F5F5" />}
      </div>
    </div>
  );
}
