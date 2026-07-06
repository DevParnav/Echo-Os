'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import NeuralBackground from '../../../components/animations/NeuralBackground';
import PopButton from '../../../components/ui/pop-button';
import GlassCard from '../../../components/ui/GlassCard';
import Footer from '../../../components/layout/Footer';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) return;
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Cognitive account created successfully. Booting system...');
      router.push('/login');
    }, 1200);
  };

  return (
    <div
      style={{
        backgroundColor: '#050505',
        color: '#F5F5F5',
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <NeuralBackground />

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
              Create Account.
            </h3>
            <p style={{ fontSize: 'var(--font-size-sm)', color: '#A8A8A8', margin: 0 }}>
              Prepare your private cognitive workspace.
            </p>
          </div>

          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
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
              <small style={{ color: '#A8A8A8', fontWeight: '500' }}>Security Password</small>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <small style={{ color: '#A8A8A8', fontWeight: '500' }}>Confirm Password</small>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field"
              />
            </div>

            <PopButton type="submit" isLoading={loading} style={{ marginTop: 'var(--space-2)' }}>
              Register Workspace
            </PopButton>
          </form>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-4)' }}>
            <small
              onClick={() => router.push('/login')}
              style={{ color: '#6E6E6E', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Already registered? Sign in
            </small>
          </div>
        </GlassCard>
      </motion.div>

      <Footer sticky />
    </div>
  );
}
