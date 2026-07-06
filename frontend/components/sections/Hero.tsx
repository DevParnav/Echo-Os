'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import PopButton from '../ui/pop-button';
import StatusPanel from './StatusPanel';
import Container from '../layout/Container';

interface HeroProps {
  onLaunchClick: () => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

export const Hero: React.FC<HeroProps> = ({ onLaunchClick }) => {
  return (
    <section
      id="hero"
      style={{
        padding: '160px 0 100px 0',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10,
        overflow: 'hidden',
      }}
    >
      <Container>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr',
            gap: 'var(--space-12)',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Staggered Text Reveal */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
          >
            {/* Eyebrow */}
            <motion.span
              variants={fadeUp}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: '11px',
                fontWeight: 'bold',
                color: '#6E6E6E',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                marginBottom: 'var(--space-4)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              Cognitive Infrastructure
            </motion.span>

            {/* H1 */}
            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
                lineHeight: 1.05,
                fontWeight: 'var(--font-weight-bold)',
                letterSpacing: '-0.04em',
                color: '#F5F5F5',
                marginBottom: 'var(--space-6)',
              }}
            >
              Your Personal<br />
              Cognitive Operating System
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: 'var(--font-size-base)',
                lineHeight: 'var(--line-height-normal)',
                color: '#A8A8A8',
                maxWidth: '520px',
                marginBottom: 'var(--space-8)',
              }}
            >
              EchoOS remembers your decisions, understands your thinking, and helps your future
              self make better choices — using completely local AI.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}
            >
              <PopButton
                size="lg"
                onClick={onLaunchClick}
              >
                Launch EchoOS <ArrowRight size={16} />
              </PopButton>
              <PopButton
                size="lg"
                onClick={() => {
                  const el = document.getElementById('features');
                  if (el) {
                    const rect = el.getBoundingClientRect();
                    window.scrollTo({ top: rect.top + window.scrollY - 80, behavior: 'smooth' });
                  }
                }}
                style={{ background: 'transparent', color: '#F5F5F5', border: '1px solid rgba(255,255,255,0.2)' }}
              >
                Learn More
              </PopButton>
            </motion.div>
          </motion.div>

          {/* Right Column: Floating Status Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <StatusPanel />
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
