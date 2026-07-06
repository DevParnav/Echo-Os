'use client';

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// Layout & Sections
import NeuralBackground from '../../components/animations/NeuralBackground';
import Navbar           from '../../components/layout/Navbar';
import Footer           from '../../components/layout/Footer';
import Hero             from '../../components/sections/Hero';
import Features         from '../../components/sections/Features';
import HowItWorks       from '../../components/sections/HowItWorks';
import Privacy          from '../../components/sections/Privacy';
import Roadmap          from '../../components/sections/Roadmap';
import FAQ              from '../../components/sections/FAQ';

// Auth form (replaced by local onboarding)
import WorkspaceManager from '../../components/onboarding/WorkspaceManager';

// ── NEW: cinematic boot feature ──────────────────────────
import BootSequence from '../../features/boot/BootSequence';

// Screen state machine
//   landing  → booting  → onboarding
type ScreenState = 'landing' | 'booting' | 'onboarding';

export default function Home() {
  const [screen, setScreen] = useState<ScreenState>('landing');

  const startBoot = () => setScreen('booting');
  const enterOnboarding = () => setScreen('onboarding');

  return (
    <div
      style={{
        backgroundColor: '#050505',
        color: '#F5F5F5',
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Animated neural canvas backdrop */}
      <NeuralBackground />

      {/* Sticky glass navigation */}
      <Navbar onLaunchClick={startBoot} />

      {/* Scrollable landing content */}
      <main style={{ flexGrow: 1 }}>
        <Hero       onLaunchClick={startBoot} />
        <Features   />
        <HowItWorks />
        <Privacy    />
        <Roadmap    />
        <FAQ        />
      </main>

      <Footer sticky={false} />

      {/* ── Cinematic Boot Sequence ─────────────────────── */}
      <AnimatePresence>
        {screen === 'booting' && (
          <BootSequence key="boot" onComplete={enterOnboarding} />
        )}
      </AnimatePresence>

      {/* ── Onboarding overlay (shown after boot) ────────────── */}
      <AnimatePresence>
        {screen === 'onboarding' && (
          <WorkspaceManager key="manager" />
        )}
      </AnimatePresence>
    </div>
  );
}
