import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'outline' | 'fill' | 'pulse';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'outline',
  className = '',
  style,
  ...props
}) => {
  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px 10px',
    borderRadius: '9999px',
    fontSize: '11px',
    fontFamily: 'var(--font-mono)',
    fontWeight: 'bold',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    ...(variant === 'outline' && {
      border: '1px solid rgba(255, 255, 255, 0.1)',
      background: 'rgba(255, 255, 255, 0.02)',
      color: '#A8A8A8',
    }),
    ...(variant === 'fill' && {
      background: '#F5F5F5',
      color: '#000000',
    }),
    ...(variant === 'pulse' && {
      border: '1px solid rgba(255, 255, 255, 0.15)',
      background: 'rgba(255, 255, 255, 0.04)',
      color: '#F5F5F5',
    }),
    ...style,
  };

  return (
    <span className={className} style={baseStyle} {...props}>
      {variant === 'pulse' && (
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#F5F5F5',
            marginRight: '6px',
            display: 'inline-block',
            boxShadow: '0 0 6px rgba(245, 245, 245, 0.8)',
            animation: 'pulse-glow 1.5s infinite ease-in-out',
          }}
        />
      )}
      {children}
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.15); }
        }
      `}</style>
    </span>
  );
};

export default Badge;
