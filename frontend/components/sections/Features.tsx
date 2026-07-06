'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Cpu, Shield, Clock, Target, BarChart2, Lock, Eye } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import Container from '../layout/Container';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  delay = 0,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    style={{ height: '100%' }}
  >
    <GlassCard style={{ padding: 'var(--space-6)', height: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', height: '100%', justifyContent: 'space-between' }}>
        <div style={{ color: '#F5F5F5', backgroundColor: 'rgba(255,255,255,0.03)', width: '38px', height: '38px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center' }}>
          {icon}
        </div>
        <div>
          <h4 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'bold', color: '#F5F5F5', marginBottom: '8px' }}>
            {title}
          </h4>
          <p style={{ fontSize: 'var(--font-size-sm)', color: '#A8A8A8', lineHeight: 1.5, margin: 0 }}>
            {description}
          </p>
        </div>
      </div>
    </GlassCard>
  </motion.div>
);

export const Features: React.FC = () => {
  const features = [
    {
      icon: <Brain size={18} />,
      title: 'Memory Engine',
      description: 'Automatically indexes and structures memories, conversations, and reasoning logs locally.',
    },
    {
      icon: <Cpu size={18} />,
      title: 'Decision Engine',
      description: 'Evaluates upcoming actions against historical outcomes to calculate success rates.',
    },
    {
      icon: <Clock size={18} />,
      title: 'Interactive Timeline',
      description: 'Trace your decision history chronologically. Understand exactly how your thinking evolved over months.',
    },
    {
      icon: <Target size={18} />,
      title: 'Cognitive Goals',
      description: 'Define cognitive objectives and let EchoOS track repeating behavioral bottlenecks.',
    },
    {
      icon: <BarChart2 size={18} />,
      title: 'Actionable Insights',
      description: 'Visualizes repeat mistakes, cognitive biases, and success vectors with high precision.',
    },
    {
      icon: <Eye size={18} />,
      title: 'Behavior Analysis',
      description: 'Detects fatigue, repeating errors, and decision fatigue patterns in real-time.',
    },
    {
      icon: <Lock size={18} />,
      title: '100% Offline AI',
      description: 'Run robust LLMs locally on your own GPU. Zero cloud sync. Zero data collection.',
    },
    {
      icon: <Shield size={18} />,
      title: 'Cryptographic Privacy',
      description: 'All local vectors are fully encrypted. No personal parameters ever exit your desktop.',
    },
  ];

  return (
    <section
      id="features"
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
            Neural Capabilities
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
            A Mind of Its Own. Built for Yours.
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 'var(--space-6)',
          }}
        >
          {features.map((feat, idx) => (
            <FeatureCard
              key={idx}
              icon={feat.icon}
              title={feat.title}
              description={feat.description}
              delay={(idx % 4) * 0.09}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Features;
