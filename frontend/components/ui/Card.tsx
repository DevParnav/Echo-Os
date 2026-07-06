import React from 'react';
import { motion } from 'framer-motion';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'standard' | 'glass' | 'insight' | 'decision' | 'memory' | 'goal' | 'chat' | 'sidebar';
  hoverable?: boolean;
  animateHover?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'standard',
      hoverable = true,
      animateHover = true,
      children,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    // Determine card classes
    const cardClasses = [
      'card-base',
      variant === 'glass' && 'card-glass',
      variant === 'insight' && 'card-insight',
      variant === 'decision' && 'card-decision',
      variant === 'memory' && 'card-memory',
      variant === 'goal' && 'card-goal',
      variant === 'chat' && 'card-chat-variant',
      variant === 'sidebar' && 'card-sidebar-variant',
      hoverable && 'card-hover',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const combinedStyle: React.CSSProperties = {
      ...(variant === 'chat' && {
        borderRadius: '16px',
        padding: 'var(--space-4)',
      }),
      ...(variant === 'sidebar' && {
        borderRadius: '12px',
        padding: 'var(--space-3)',
        border: 'none',
        background: 'transparent',
      }),
      ...style,
    };

    if (animateHover && hoverable) {
      return (
        <motion.div
          ref={ref as any}
          className={cardClasses}
          style={combinedStyle}
          whileHover={{ y: -4, boxShadow: 'var(--shadow-md)' }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          {...(props as any)}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div ref={ref} className={cardClasses} style={combinedStyle} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// Card Helper Subcomponents for Structure
export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  style,
  ...props
}) => (
  <div
    className={`card-header ${className}`}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 'var(--space-3)',
      ...style,
    }}
    {...props}
  >
    {children}
  </div>
);

export const CardBody: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div className={`card-body ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  style,
  ...props
}) => (
  <div
    className={`card-footer ${className}`}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginTop: 'var(--space-4)',
      paddingTop: 'var(--space-3)',
      borderTop: '1px solid var(--color-surface)',
      ...style,
    }}
    {...props}
  >
    {children}
  </div>
);

export default Card;
