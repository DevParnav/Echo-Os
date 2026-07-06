import React, { useState, useLayoutEffect } from 'react';

interface RippleProps {
  color?: string;
  duration?: number;
}

interface RippleItem {
  id: number;
  x: number;
  y: number;
  size: number;
}

export const Ripple: React.FC<RippleProps> = ({
  color = 'rgba(0, 0, 0, 0.08)',
  duration = 600,
}) => {
  const [ripples, setRipples] = useState<RippleItem[]>([]);

  useLayoutEffect(() => {
    let timer: any;
    if (ripples.length > 0) {
      timer = setTimeout(() => {
        setRipples([]);
      }, duration + 100);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [ripples, duration]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const newRipple = {
      id: Date.now(),
      x,
      y,
      size,
    };

    setRipples((prev) => [...prev, newRipple]);
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        zIndex: 0,
        borderRadius: 'inherit',
        pointerEvents: 'none',
      }}
      onMouseDown={handleMouseDown}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          style={{
            position: 'absolute',
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            borderRadius: '50%',
            backgroundColor: color,
            transform: 'scale(0)',
            animation: `ripple-animation ${duration}ms cubic-bezier(0.1, 0.8, 0.3, 1) forwards`,
            pointerEvents: 'none',
          }}
        />
      ))}
      <style>{`
        @keyframes ripple-animation {
          to {
            transform: scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Ripple;
