import React from 'react';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  clean?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  clean = false,
  className = '',
  style,
  ...props
}) => {
  return (
    <div
      className={`container-1440 ${className}`}
      style={{
        width: '100%',
        maxWidth: clean ? 'none' : '1440px',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: 'var(--space-6)',
        paddingRight: 'var(--space-6)',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
