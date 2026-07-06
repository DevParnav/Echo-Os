import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Inbox, RotateCcw } from 'lucide-react';
import PopButton from './pop-button';

// --- PULSING SKELETON BLOCK ---
export interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  style?: React.CSSProperties;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rectangular',
  width = '100%',
  height = '16px',
  borderRadius,
  style,
}) => {
  const getRadius = () => {
    if (borderRadius) return borderRadius;
    if (variant === 'circular') return '50%';
    if (variant === 'text') return '4px';
    return '12px'; // Rounded rectangles
  };

  return (
    <div
      className="skeleton-pulse"
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius: getRadius(),
        ...style,
      }}
    />
  );
};

// --- TYPING INDICATOR (AI BRAIN RESPONDING) ---
export const TypingIndicator: React.FC = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: 'var(--space-2) var(--space-3)' }}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'easeInOut',
          }}
          style={{
            width: '6px',
            height: '6px',
            backgroundColor: 'var(--color-primary)',
            borderRadius: '50%',
            display: 'inline-block',
          }}
        />
      ))}
    </div>
  );
};

// --- MINIMAL RING LOADER ---
export interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export const Loader: React.FC<LoaderProps> = ({ size = 'md', label }) => {
  const sizePx = size === 'sm' ? 24 : size === 'lg' ? 48 : 36;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-3)', justifyContent: 'center' }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        style={{
          width: `${sizePx}px`,
          height: `${sizePx}px`,
          borderRadius: '50%',
          border: '2px solid var(--color-surface)',
          borderTopColor: 'var(--color-primary)',
        }}
      />
      {label && (
        <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-secondary)', fontWeight: 'var(--font-weight-medium)' }}>
          {label}
        </span>
      )}
    </div>
  );
};

// --- EMPTY STATE WRAPPER ---
export interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onActionClick?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionLabel,
  onActionClick,
  icon = <Inbox size={32} style={{ color: 'var(--color-neutral)' }} />,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-12) var(--space-6)',
        textAlign: 'center',
        border: '1px dashed var(--color-surface)',
        borderRadius: 'var(--radius-card)',
        backgroundColor: 'var(--color-white)',
        maxWidth: '480px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <div style={{ marginBottom: 'var(--space-4)' }}>{icon}</div>
      <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-2)' }}>
        {title}
      </h3>
      <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-secondary)', marginBottom: 'var(--space-5)', maxWidth: '340px' }}>
        {description}
      </p>
      {actionLabel && onActionClick && (
        <PopButton size="sm" onClick={onActionClick}>
          {actionLabel}
        </PopButton>
      )}
    </div>
  );
};

// --- ERROR STATE ---
export interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Cognitive Layer Failure',
  message,
  onRetry,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-10) var(--space-6)',
        textAlign: 'center',
        border: '1px solid rgba(216, 60, 60, 0.1)',
        borderRadius: 'var(--radius-card)',
        backgroundColor: 'rgba(216, 60, 60, 0.02)',
        maxWidth: '480px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <div style={{ marginBottom: 'var(--space-4)', color: 'var(--color-danger)' }}>
        <AlertCircle size={32} />
      </div>
      <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-2)' }}>
        {title}
      </h3>
      <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-secondary)', marginBottom: 'var(--space-5)', maxWidth: '360px' }}>
        {message}
      </p>
      {onRetry && (
        <PopButton size="sm" onClick={onRetry}>
          <RotateCcw size={14} /> Retry Sync
        </PopButton>
      )}
    </div>
  );
};
