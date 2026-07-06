'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import Container from '../layout/Container';
import GlassCard from '../ui/GlassCard';

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  idx: number;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  question,
  answer,
  isOpen,
  onToggle,
  idx,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
    style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', padding: 'var(--space-4) 0' }}
  >
    <button
      onClick={onToggle}
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: 'var(--space-2) 0',
        color: '#F5F5F5',
        textAlign: 'left',
      }}
    >
      <span style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)', letterSpacing: '-0.01em' }}>
        {question}
      </span>
      <div style={{ color: '#A8A8A8', display: 'flex', alignItems: 'center' }}>
        {isOpen ? <Minus size={16} /> : <Plus size={16} />}
      </div>
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{ overflow: 'hidden' }}
        >
          <p style={{ fontSize: 'var(--font-size-sm)', color: '#A8A8A8', lineHeight: 1.6, padding: 'var(--space-2) 0 var(--space-4) 0', margin: 0 }}>
            {answer}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

export const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Does EchoOS require an active internet connection?',
      answer: 'No. EchoOS is designed to run 100% offline. All embedding generations, vector indexing, and reasoning checks are executed directly on your local system using Ollama.',
    },
    {
      question: 'Which local LLMs are supported?',
      answer: 'By default, the setup hooks into Qwen2.5 (3B/7B), Llama3 (8B), and Nomic-Embed. Any models pulled into your local Ollama library can be configured as parameter nodes.',
    },
    {
      question: 'How is my private data encrypted?',
      answer: 'All local vectors are stored in AES-256 encrypted SQLite and Chroma files on your local drive. We do not transmit logs, telemetry, or thinking nodes to any cloud hosts.',
    },
    {
      question: 'How does it help me make decisions?',
      answer: 'EchoOS correlates the variables of your decisions (e.g. fatigue levels, spending amounts) with subsequent feedback updates. Over time, it prompts warnings if you begin repeating historical mistakes.',
    },
  ];

  return (
    <section
      id="faq"
      style={{
        padding: '120px 0',
        backgroundColor: '#050505',
        borderTop: '1px solid rgba(255, 255, 255, 0.03)',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <Container>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.4fr',
            gap: 'var(--space-12)',
            alignItems: 'flex-start',
          }}
        >
          {/* Left Column: Heading (Slide in from Left) */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              style={{
                fontSize: '11px',
                fontWeight: 'bold',
                color: '#6E6E6E',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                marginBottom: 'var(--space-2)',
                display: 'inline-block',
              }}
            >
              Support Core
            </span>
            <h2
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 'bold',
                color: '#F5F5F5',
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
                marginBottom: 'var(--space-4)',
              }}
            >
              Frequently Queried Nodes
            </h2>
            <p style={{ fontSize: 'var(--font-size-base)', color: '#A8A8A8', lineHeight: 1.6, margin: 0, maxWidth: '360px' }}>
              Learn more about local AI mechanics, GPU memory buffers, and context storage structures.
            </p>
          </motion.div>

          {/* Right Column: Accordion */}
          <GlassCard hoverable={false} animateHover={false} style={{ padding: 'var(--space-6) var(--space-8)' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {faqs.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  idx={idx}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIdx === idx}
                  onToggle={() => setOpenIdx(openIdx === idx ? null : idx)}
                />
              ))}
            </div>
          </GlassCard>
        </div>
      </Container>
    </section>
  );
};

export default FAQ;
