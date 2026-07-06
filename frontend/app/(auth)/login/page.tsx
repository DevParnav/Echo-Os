'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import NeuralBackground from '../../../components/animations/NeuralBackground';
import BootSequence from '../../../components/auth/BootSequence';
import LoginForm from '../../../components/auth/LoginForm';
import Footer from '../../../components/layout/Footer';

export default function LoginPage() {
  const router = useRouter();
  const [bootCompleted, setBootCompleted] = useState(false);

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
      {/* Dark monochrome neural drift background */}
      <NeuralBackground />

      {!bootCompleted ? (
        <BootSequence onComplete={() => setBootCompleted(true)} />
      ) : (
        <LoginForm onSuccess={() => router.push('/mind')} />
      )}

      {/* Floating sticky footer */}
      <Footer sticky />
    </div>
  );
}
