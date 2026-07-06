'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  animateHover?: boolean;
  blur?: string;
  borderColor?: string;
  borderRadius?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  hoverable = true,
  animateHover = true,
  blur = '32px',
  borderColor = 'rgba(255, 255, 255, 0.06)',
  borderRadius = '24px',
  className = '',
  style,
  ...props
}) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const baseStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.02)',
    backdropFilter: `blur(${blur})`,
    WebkitBackdropFilter: `blur(${blur})`,
    border: `1px solid ${borderColor}`,
    borderRadius,
    boxShadow: '0 24px 64px rgba(0, 0, 0, 0.4)',
    overflow: 'hidden',
    position: 'relative',
    transition: 'border-color 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    ...style,
  };

  if (animateHover && hoverable) {
    return (
      <motion.div
        className={className}
        style={baseStyle}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{
          y: -5,
          borderColor: 'rgba(255, 255, 255, 0.16)',
          boxShadow: '0 32px 80px rgba(0, 0, 0, 0.55), 0 0 20px rgba(255, 255, 255, 0.03)',
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        {...(props as any)}
      >
        {/* Vercel-style radial flashlight glow */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: 'none',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.4s ease-out',
            background: `radial-gradient(220px circle at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.045), transparent 85%)`,
            zIndex: 1,
          }}
        />

        {/* Content Wrapper */}
        <div style={{ position: 'relative', zIndex: 2, height: '100%' }}>
          {children}
        </div>
      </motion.div>
    );
  }

  return (
    <div className={className} style={baseStyle} {...props}>
      {children}
    </div>
  );
};

export default GlassCard;
