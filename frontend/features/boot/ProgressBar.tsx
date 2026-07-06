'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;   // 0 – 100
  visible?: boolean;
}

/**
 * Fixed 1px bottom-of-screen progress bar.
 * Uses spring physics for smooth, never-jumping animation.
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  visible = true,
}) => {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '1.5px',
        backgroundColor: 'rgba(255,255,255,0.04)',
        zIndex: 200,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.6s ease',
      }}
    >
      <motion.div
        animate={{ width: `${value}%` }}
        transition={{ type: 'spring', stiffness: 55, damping: 20, mass: 0.6 }}
        style={{
          height: '100%',
          backgroundColor: '#F5F5F5',
          boxShadow: '0 0 10px rgba(255,255,255,0.5), 0 0 3px rgba(255,255,255,0.8)',
          borderRadius: '999px',
          transformOrigin: 'left',
          willChange: 'width',
        }}
      />
    </div>
  );
};

export default ProgressBar;
