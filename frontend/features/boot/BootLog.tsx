'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { BootLogLine } from './types/boot';
import TypingLine      from './TypingLine';

const MONO = '"JetBrains Mono", "Fira Code", "Cascadia Code", "SF Mono", monospace';

interface BootLogProps {
  lines:        BootLogLine[];
  visibleCount: number;
}

export const BootLog: React.FC<BootLogProps> = ({ lines, visibleCount }) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const visible   = lines.slice(0, visibleCount);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [visibleCount]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
        fontFamily: MONO,
        fontSize: '12px',
        lineHeight: 1.75,
      }}
    >
      {visible.map((line, idx) => {
        const isNewest = idx === visible.length - 1;
        return (
          <motion.div
            key={line.id}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ color: '#4A4A4A', userSelect: 'none' }}
          >
            {line.typing && isNewest ? (
              <TypingLine text={line.text} speed={20} style={{ color: '#A8A8A8' }} />
            ) : (
              <span style={{ color: isNewest ? '#A8A8A8' : '#4A4A4A' }}>{line.text}</span>
            )}
          </motion.div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
};

export default BootLog;
