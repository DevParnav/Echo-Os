import React, { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface PopButtonProps extends Omit<HTMLMotionProps<"button">, "color" | "children"> {
  size?: 'sm' | 'default' | 'lg';
  color?: 'default' | 'red' | 'green' | 'blue';
  asChild?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
}

const PopButton = forwardRef<HTMLButtonElement, PopButtonProps>(
  ({ size = 'default', color = 'default', asChild, isLoading, children, style, className, disabled, ...props }, ref) => {
    
    const isDisabled = disabled || isLoading;

    const baseStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      border: 'none',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      outline: 'none',
      position: 'relative',
      overflow: 'hidden',
      textDecoration: 'none',
      fontFamily: 'inherit',
      opacity: isDisabled ? 0.7 : 1,
      ...style,
    };

    // Sizing
    if (size === 'sm') {
      baseStyle.padding = '8px 16px';
      baseStyle.fontSize = '13px';
      baseStyle.borderRadius = '8px';
      baseStyle.fontWeight = 500;
    } else if (size === 'lg') {
      baseStyle.padding = '16px 32px';
      baseStyle.fontSize = '16px';
      baseStyle.borderRadius = '12px';
      baseStyle.fontWeight = 600;
    } else {
      baseStyle.padding = '12px 24px';
      baseStyle.fontSize = '14px';
      baseStyle.borderRadius = '10px';
      baseStyle.fontWeight = 500;
    }

    // Coloring
    if (color === 'red') {
      baseStyle.backgroundColor = '#EF4444';
      baseStyle.color = '#FFFFFF';
    } else if (color === 'green') {
      baseStyle.backgroundColor = '#10B981';
      baseStyle.color = '#FFFFFF';
    } else if (color === 'blue') {
      baseStyle.backgroundColor = '#3B82F6';
      baseStyle.color = '#FFFFFF';
    } else {
      // default monochrome
      baseStyle.backgroundColor = '#F5F5F5';
      baseStyle.color = '#050505';
    }

    const hoverAnimation = isDisabled ? {} : {
      y: -2,
      boxShadow: color === 'default' 
        ? '0 8px 24px rgba(245, 245, 245, 0.2)' 
        : `0 8px 24px ${baseStyle.backgroundColor}40`
    };

    const tapAnimation = isDisabled ? {} : {
      y: 0,
      scale: 0.98,
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
    };

    if (asChild) {
      if (React.isValidElement(children)) {
        return React.cloneElement(children as React.ReactElement<any>, {
          ref,
          style: { ...baseStyle, ...(children.props.style || {}) },
          className: `${className || ''} ${children.props.className || ''}`.trim(),
          disabled: isDisabled,
          ...props,
        });
      }
      return null;
    }

    return (
      <motion.button
        ref={ref}
        style={baseStyle}
        whileHover={hoverAnimation}
        whileTap={tapAnimation}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className={className}
        disabled={isDisabled}
        {...props}
      >
        {isLoading ? (
           <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="loader" style={{ width: '14px', height: '14px', border: '2px solid currentColor', borderBottomColor: 'transparent', borderRadius: '50%', display: 'inline-block', boxSizing: 'border-box', animation: 'rotation 1s linear infinite' }}></span>
              {children}
              <style>{`@keyframes rotation { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
           </span>
        ) : children}
      </motion.button>
    );
  }
);

PopButton.displayName = 'PopButton';

export default PopButton;
