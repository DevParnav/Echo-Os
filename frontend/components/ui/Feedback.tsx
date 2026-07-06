import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import PopButton from './pop-button';

// --- AVATAR ---
export interface AvatarProps {
  name: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg';
  status?: 'synced' | 'reflecting' | 'idle';
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  src,
  size = 'md',
  status,
}) => {
  const sizePx = size === 'sm' ? 32 : size === 'lg' ? 64 : 44;
  const fontSize = size === 'sm' ? '12px' : size === 'lg' ? '24px' : '16px';

  // Status color codes
  const statusColors = {
    synced: '#000000',      // Solid black
    reflecting: '#A8A8A8',  // Light gray
    idle: 'transparent',
  };

  return (
    <div
      style={{
        position: 'relative',
        width: `${sizePx}px`,
        height: `${sizePx}px`,
        flexShrink: 0,
      }}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '1px solid var(--color-surface)',
          }}
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-white)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-sans)',
            fontWeight: 'bold',
            fontSize,
            userSelect: 'none',
          }}
        >
          {name.charAt(0).toUpperCase()}
        </div>
      )}

      {/* Online/Synced Status Dot */}
      {status && status !== 'idle' && (
        <span
          style={{
            position: 'absolute',
            bottom: '0px',
            right: '0px',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: statusColors[status],
            border: '2px solid var(--color-white)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        />
      )}
    </div>
  );
};

// --- BADGE ---
export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'solid' | 'outline' | 'surface';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'surface' }) => {
  const badgeStyle: React.CSSProperties = {
    ...(variant === 'solid' && {
      backgroundColor: 'var(--color-primary)',
      color: 'var(--color-white)',
    }),
    ...(variant === 'outline' && {
      backgroundColor: 'transparent',
      border: '1.5px solid var(--color-neutral)',
      color: 'var(--color-primary)',
    }),
    ...(variant === 'surface' && {
      backgroundColor: 'var(--color-surface)',
      color: 'var(--color-primary)',
    }),
  };

  return (
    <span className="badge" style={badgeStyle}>
      {children}
    </span>
  );
};

// --- TOAST NOTIFICATION ---
export interface ToastItem {
  id: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
}

export interface ToastProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 'var(--space-6)',
        right: 'var(--space-6)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2)',
        zIndex: 2000,
        pointerEvents: 'none',
      }}
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
            transition={{ type: 'spring', stiffness: 260, damping: 25 }}
            style={{ pointerEvents: 'auto' }}
          >
            <div
              className="glass-effect shadow-soft-md"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 'var(--space-3) var(--space-4)',
                borderRadius: '16px',
                minWidth: '280px',
                maxWidth: '420px',
                color: 'var(--color-primary)',
                gap: 'var(--space-3)',
                border: '1px solid rgba(0, 0, 0, 0.08)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {toast.type === 'error' && (
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-danger)',
                    }}
                  />
                )}
                <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                  {toast.message}
                </span>
              </div>
              <PopButton
                size="sm"
                onClick={() => onDismiss(toast.id)}
                style={{
                  background: 'transparent',
                  color: 'var(--color-secondary)',
                  padding: '2px',
                }}
              >
                <X size={14} />
              </PopButton>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// --- TOOLTIP ---
export interface TooltipProps {
  content: string;
  children: React.ReactElement;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children, position = 'top' }) => {
  const [active, setActive] = useState(false);

  const getPositionStyle = (): React.CSSProperties => {
    switch (position) {
      case 'bottom':
        return { top: '100%', left: '50%', transform: 'translateX(-50%) translateY(8px)' };
      case 'left':
        return { top: '50%', right: '100%', transform: 'translateY(-50%) translateX(-8px)' };
      case 'right':
        return { top: '50%', left: '100%', transform: 'translateY(-50%) translateX(8px)' };
      case 'top':
      default:
        return { bottom: '100%', left: '50%', transform: 'translateX(-50%) translateY(-8px)' };
    }
  };

  return (
    <div
      style={{ display: 'inline-block', position: 'relative' }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      {children}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'absolute',
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-white)',
              padding: '6px 10px',
              borderRadius: '8px',
              fontSize: '11px',
              fontWeight: '500',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              zIndex: 1000,
              boxShadow: 'var(--shadow-sm)',
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

// --- PROGRESS BAR ---
export interface ProgressProps {
  value: number; // 0 to 100
  max?: number;
}

export const Progress: React.FC<ProgressProps> = ({ value, max = 100 }) => {
  const percentage = Math.max(0, Math.min(100, (value / max) * 100));

  return (
    <div
      style={{
        width: '100%',
        height: '6px',
        backgroundColor: 'var(--color-surface)',
        borderRadius: '999px',
        overflow: 'hidden',
      }}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          height: '100%',
          backgroundColor: 'var(--color-primary)',
          borderRadius: '999px',
        }}
      />
    </div>
  );
};
