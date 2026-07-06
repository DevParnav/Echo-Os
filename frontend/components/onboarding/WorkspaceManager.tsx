'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Folder, Plus, ChevronRight, Clock, Database, MessageSquare } from 'lucide-react';
import PopButton from '../ui/pop-button';

const MONO = '"JetBrains Mono", "Fira Code", monospace';

type WorkspaceInfo = {
  id: string;
  name: string;
  lastOpened: string;
  memoryCount: number;
  chatCount: number;
  createdDate: string;
};

export default function WorkspaceManager() {
  const router = useRouter();
  const [view, setView] = useState<'list' | 'create'>('list');
  const [newWorkspaceName, setNewWorkspaceName] = useState('');
  const [workspaces, setWorkspaces] = useState<WorkspaceInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/workspaces');
        if (res.ok) {
          const data = await res.json();
          setWorkspaces(data);
        }
      } catch (err) {
        console.error('Failed to fetch workspaces', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWorkspaces();
  }, []);

  const handleOpen = async (id: string) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/workspaces/${id}/open`, {
        method: 'POST'
      });
      if (res.ok) {
        localStorage.setItem('workspaceId', id);
        router.push('/chat');
      }
    } catch (err) {
      console.error('Failed to open workspace', err);
    }
  };

  const handleCreate = async () => {
    if (!newWorkspaceName.trim()) return;
    try {
      const res = await fetch('http://127.0.0.1:8000/api/workspaces', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newWorkspaceName.trim() })
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('workspaceId', data.id);
        router.push('/chat');
      }
    } catch (err) {
      console.error('Failed to create workspace', err);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: '#050505',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <AnimatePresence mode="wait">
        {view === 'list' && (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ width: '100%', maxWidth: '640px' }}
          >
            <h1 style={{ fontSize: '32px', fontWeight: 600, letterSpacing: '-0.02em', color: '#F5F5F5', marginBottom: '8px' }}>
              EchoOS Workspace
            </h1>
            <p style={{ color: '#A8A8A8', fontSize: '15px', marginBottom: '40px' }}>
              Select a cognitive environment or create a new one.
            </p>

            <div style={{ display: 'grid', gap: '16px', marginBottom: '32px' }}>
              {isLoading ? (
                <div style={{ color: '#A8A8A8', fontFamily: MONO, fontSize: '14px' }}>Loading workspaces...</div>
              ) : workspaces.length === 0 ? (
                <div style={{ color: '#A8A8A8', fontFamily: MONO, fontSize: '14px' }}>No workspaces found.</div>
              ) : (
                workspaces.map(ws => (
                  <div
                    key={ws.id}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      borderRadius: '16px',
                      padding: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Folder size={20} color="#F5F5F5" />
                        </div>
                        <div>
                          <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#F5F5F5', margin: '0 0 4px 0' }}>{ws.name}</h3>
                          <span style={{ fontSize: '12px', color: '#6E6E6E', fontFamily: MONO }}>Created {ws.createdDate}</span>
                        </div>
                      </div>
                      <PopButton
                        onClick={() => handleOpen(ws.id)}
                        style={{
                          background: '#F5F5F5',
                          color: '#050505',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '8px 16px',
                          fontSize: '13px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        Open Workspace <ChevronRight size={14} />
                      </PopButton>
                    </div>

                    <div style={{ display: 'flex', gap: '24px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#A8A8A8', fontSize: '13px' }}>
                        <Clock size={14} /> {ws.lastOpened}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#A8A8A8', fontSize: '13px' }}>
                        <Database size={14} /> {ws.memoryCount} memories
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#A8A8A8', fontSize: '13px' }}>
                        <MessageSquare size={14} /> {ws.chatCount} chats
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <PopButton
              onClick={() => setView('create')}
              style={{
                width: '100%',
                padding: '20px',
                background: 'transparent',
                border: '1px dashed rgba(255,255,255,0.2)',
                borderRadius: '16px',
                color: '#E0E0E0',
                fontSize: '15px',
                fontWeight: 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s',
              }}
            >
              <Plus size={18} /> Create New Workspace
            </PopButton>
          </motion.div>
        )}

        {view === 'create' && (
          <motion.div
            key="create"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{ width: '100%', maxWidth: '480px' }}
          >
            <button
              onClick={() => setView('list')}
              style={{ background: 'transparent', border: 'none', color: '#A8A8A8', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '24px' }}
            >
              ← Back to Workspaces
            </button>
            <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#F5F5F5', marginBottom: '8px' }}>Name Your Workspace</h2>
            <p style={{ color: '#A8A8A8', fontSize: '14px', marginBottom: '24px' }}>This will create an isolated local environment for memory and settings.</p>
            
            <input
              type="text"
              placeholder="e.g. Work OS"
              value={newWorkspaceName}
              onChange={(e) => setNewWorkspaceName(e.target.value)}
              autoFocus
              style={{
                width: '100%',
                padding: '16px',
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                color: '#F5F5F5',
                fontSize: '16px',
                marginBottom: '24px',
                outline: 'none',
              }}
            />

            <PopButton
              onClick={handleCreate}
              disabled={!newWorkspaceName.trim()}
              style={{
                width: '100%',
                padding: '16px',
                backgroundColor: newWorkspaceName.trim() ? '#F5F5F5' : 'rgba(255,255,255,0.1)',
                color: newWorkspaceName.trim() ? '#050505' : 'rgba(255,255,255,0.3)',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: 600,
                cursor: newWorkspaceName.trim() ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              Initialize Workspace
            </PopButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
