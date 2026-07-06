'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PopButton from '../ui/pop-button';
import GlassCard from '../ui/GlassCard';

interface LoginFormProps {
  onSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (onSuccess) {
        onSuccess();
      } else {
        alert('Cognitive space unlocked. Initializing Dashboard...');
      }
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        width: '100%',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <GlassCard hoverable={false} animateHover={false} style={{ padding: 'var(--space-8)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
          <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-semibold)', color: '#F5F5F5', marginBottom: 'var(--space-2)' }}>
            Welcome Back.
          </h3>
          <p style={{ fontSize: 'var(--font-size-sm)', color: '#A8A8A8', margin: 0 }}>
            Your memories are waiting.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <small style={{ color: '#A8A8A8', fontWeight: '500' }}>Workspace Email</small>
            <input
              type="email"
              required
              placeholder="name@workspace.local"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <small style={{ color: '#A8A8A8', fontWeight: '500' }}>Workspace Password</small>
            <input
              type="password"
              required
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
          </div>

          <PopButton
            size="default"
            type="submit"
            isLoading={loading}
            style={{
              marginTop: 'var(--space-2)',
            }}
          >
            Enter Workspace
          </PopButton>
        </form>
      </GlassCard>
    </motion.div>
  );
};

export default LoginForm;
