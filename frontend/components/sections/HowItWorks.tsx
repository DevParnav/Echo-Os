'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Container from '../layout/Container';
import GlassCard from '../ui/GlassCard';

interface StepItemProps {
  number: string;
  title: string;
  description: string;
  delay?: number;
}

const StepItem: React.FC<StepItemProps> = ({
  number,
  title,
  description,
  delay = 0,
}) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    style={{
      position: 'relative',
      paddingLeft: 'var(--space-12)',
      marginBottom: 'var(--space-12)',
    }}
  >
    {/* Step Number Dot Indicator */}
    <div
      style={{
        position: 'absolute',
        left: '-5px',
        top: '6px',
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        backgroundColor: '#050505',
        border: '2px solid #F5F5F5',
        zIndex: 5,
        boxShadow: '0 0 10px rgba(245, 245, 245, 0.6)',
      }}
    />

    <GlassCard hoverable style={{ padding: 'var(--space-6)', display: 'inline-block', maxWidth: '640px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 'bold', color: '#6E6E6E' }}>
          STEP {number}
        </div>
        <h4 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'bold', color: '#F5F5F5', margin: 0 }}>
          {title}
        </h4>
        <p style={{ fontSize: 'var(--font-size-sm)', color: '#A8A8A8', lineHeight: 1.5, margin: 0 }}>
          {description}
        </p>
      </div>
    </GlassCard>
  </motion.div>
);

export const HowItWorks: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Link scroll progress to active tracing height
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const steps = [
    {
      number: '01',
      title: 'User writes a decision',
      description: 'You log an upcoming decision or goal (e.g. buying a course, choosing a framework, hiring).',
    },
    {
      number: '02',
      title: 'EchoOS stores memory',
      description: 'The decision, reasoning context, and parameters are stored securely inside your offline vector storage.',
    },
    {
      number: '03',
      title: 'Embeddings created',
      description: 'EchoOS runs a local embedding model to link the entry to past memories and outcomes.',
    },
    {
      number: '04',
      title: 'AI learns patterns',
      description: 'As you update outcomes, the engine correlates variables to identify repeating mistakes and cognitive biases.',
    },
    {
      number: '05',
      title: 'Future advice becomes personalized',
      description: 'The next time you make a similar query, the Local AI reviews historical outcomes to provide tailored recommendations.',
    },
  ];

  return (
    <section
      id="how-it-works"
      style={{
        padding: '120px 0',
        backgroundColor: '#050505',
        borderTop: '1px solid rgba(255, 255, 255, 0.03)',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <Container>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-20)' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 'bold',
              color: '#6E6E6E',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
            }}
          >
            Processing Pipeline
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
            How Your Cognitive OS Executes
          </h2>
        </div>

        {/* Scroll Linked Timeline Frame */}
        <div ref={containerRef} style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', paddingLeft: 'var(--space-8)' }}>
          {/* Faint static divider line */}
          <div
            style={{
              position: 'absolute',
              left: '0px',
              top: '12px',
              bottom: '40px',
              width: '1px',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
            }}
          />

          {/* Animated scrolling divider line */}
          <motion.div
            style={{
              position: 'absolute',
              left: '0px',
              top: '12px',
              height: lineHeight,
              width: '1.5px',
              backgroundColor: '#F5F5F5',
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.6)',
              originY: 0,
            }}
          />

          {steps.map((step, idx) => (
            <StepItem
              key={idx}
              number={step.number}
              title={step.title}
              description={step.description}
              delay={idx * 0.05}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default HowItWorks;
