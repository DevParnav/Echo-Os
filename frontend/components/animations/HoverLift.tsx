import React from 'react';
import { motion } from 'framer-motion';

interface HoverLiftProps {
  children: React.ReactNode;
  amount?: number; // Distance to lift up in pixels (default: 4)
  scale?: number;  // Scale shift (default: 1.01)
  className?: string;
}

export const HoverLift: React.FC<HoverLiftProps> = ({
  children,
  amount = 4,
  scale = 1.01,
  className = '',
}) => {
  return (
    <motion.div
      className={className}
      whileHover={{
        y: -amount,
        scale: scale,
        transition: {
          duration: 0.3,
          ease: [0.16, 1, 0.3, 1], // Cubic-bezier out
        },
      }}
      style={{ display: 'inline-block', width: '100%' }}
    >
      {children}
    </motion.div>
  );
};

export default HoverLift;
