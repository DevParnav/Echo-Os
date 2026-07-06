import React from 'react';
import { Shield, Cpu } from 'lucide-react';

interface FooterProps {
  sticky?: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  sticky = false,
}) => {
  return (
    <footer
      style={{
        position: sticky ? 'fixed' : 'relative',
        bottom: 0,
        left: 0,
        right: 0,
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 var(--space-8)',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        backgroundColor: sticky ? 'rgba(5, 5, 5, 0.85)' : 'rgba(5, 5, 5, 0.4)',
        backdropFilter: sticky ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: sticky ? 'blur(16px)' : 'none',
        zIndex: 40,
        marginTop: sticky ? 0 : 'var(--space-12)',
      }}
    >
      <span style={{ fontSize: '11px', color: '#6E6E6E', fontFamily: 'var(--font-mono)' }}>
        © 2026 EchoOS. All rights reserved.
      </span>

      <div style={{ display: 'flex', gap: 'var(--space-6)', fontSize: '11px', color: '#A8A8A8' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Shield size={10} /> Privacy First
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Cpu size={10} /> Built with Local AI
        </span>
      </div>
    </footer>
  );
};

export default Footer;
