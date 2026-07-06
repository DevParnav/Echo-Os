'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Brain, MessageSquare, History, CheckSquare, BarChart2, Settings, LogOut } from 'lucide-react';
import Card from '../ui/Card';

export const Sidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const links = [
    { label: 'Workspace', path: '/mind', icon: Brain },
    { label: 'AI Chat', path: '/chat', icon: MessageSquare },
    { label: 'Memory', path: '/memories', icon: History },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <Card
      variant="glass"
      hoverable={false}
      animateHover={false}
      style={{
        width: '260px',
        height: 'calc(100vh - var(--space-8))',
        margin: 'var(--space-4) 0 var(--space-4) var(--space-4)',
        padding: 'var(--space-6)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        {/* Workspace Brand Logo */}
        <div
          onClick={() => router.push('/')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', paddingLeft: 'var(--space-2)' }}
        >
          <div style={{ width: '18px', height: '18px', backgroundColor: '#F5F5F5', borderRadius: '4px' }} />
          <span style={{ fontWeight: 'bold', fontSize: 'var(--font-size-base)', letterSpacing: '-0.02em', color: '#F5F5F5' }}>
            EchoOS
          </span>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.path;

            return (
              <div
                key={link.path}
                onClick={() => router.push(link.path)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  padding: '10px var(--space-4)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  backgroundColor: isActive ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                  color: isActive ? '#F5F5F5' : '#A8A8A8',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#F5F5F5';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#A8A8A8';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <Icon size={16} />
                <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500 }}>{link.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Logout */}
      <div
        onClick={() => {
          alert('Exiting vector workspace...');
          router.push('/');
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)',
          padding: '10px var(--space-4)',
          borderRadius: '12px',
          cursor: 'pointer',
          color: '#6E6E6E',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#F5F5F5';
          e.currentTarget.style.backgroundColor = 'rgba(216, 60, 60, 0.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#6E6E6E';
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <LogOut size={16} />
        <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500 }}>Exit Workspace</span>
      </div>
    </Card>
  );
};

export default Sidebar;
