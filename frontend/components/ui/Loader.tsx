import React from 'react';

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  size = 'md',
  color = '#F5F5F5',
  className = '',
  style,
  ...props
}) => {
  const pixelSize = size === 'sm' ? '16px' : size === 'lg' ? '40px' : '24px';
  const borderThickness = size === 'sm' ? '2px' : size === 'lg' ? '4px' : '3px';

  return (
    <div
      className={className}
      style={{
        display: 'inline-block',
        width: pixelSize,
        height: pixelSize,
        border: `${borderThickness} solid rgba(255, 255, 255, 0.05)`,
        borderTopColor: color,
        borderRadius: '50%',
        animation: 'loader-spin 0.8s linear infinite',
        ...style,
      }}
      {...props}
    >
      <style>{`
        @keyframes loader-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loader;
