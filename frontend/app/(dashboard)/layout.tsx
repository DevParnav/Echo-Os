'use client';

import React from 'react';
import Sidebar from '../../components/layout/Sidebar';
import RightPanel from '../../components/layout/RightPanel';
import NeuralBackground from '../../components/animations/NeuralBackground';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        backgroundColor: '#050505',
        color: '#F5F5F5',
        minHeight: '100vh',
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
      }}
    >
      {/* Background Neural Canvas */}
      <NeuralBackground />

      {/* Persistent Left Sidebar */}
      <Sidebar />

      {/* Dynamic Content Panel */}
      <main
        style={{
          flexGrow: 1,
          height: '100vh',
          overflowY: 'auto',
          padding: 'var(--space-4) var(--space-6)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {children}
      </main>

      {/* Persistent Right AI Status Panel */}
      <RightPanel />
    </div>
  );
}
