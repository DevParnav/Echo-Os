'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const getPositionStyle = () => {
    switch (position) {
      case 'bottom':
        return { top: '100%', left: '50%', translateX: '-50%', translateY: '8px' };
      case 'left':
        return { right: '100%', top: '50%', translateX: '-8px', translateY: '-50%' };
      case 'right':
        return { left: '100%', top: '50%', translateX: '8px', translateY: '-50%' };
      case 'top':
      default:
        return { bottom: '100%', left: '50%', translateX: '-50%', translateY: '-8px' };
    }
  };

  return (
    <div
      style={{ display: 'inline-block', position: 'relative' }}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              zIndex: 200,
              backgroundColor: '#050505',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '6px 10px',
              color: '#F5F5F5',
              fontSize: '11px',
              fontFamily: 'var(--font-sans)',
              fontWeight: 500,
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
              ...getPositionStyle(),
            }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;
