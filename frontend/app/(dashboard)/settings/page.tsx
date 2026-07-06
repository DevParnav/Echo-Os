'use client';

import React, { useState } from 'react';
import Card from '../../../components/ui/Card';

import PopButton from '../../../components/ui/pop-button';

export default function SettingsPage() {
  const [model, setModel] = useState('llama3:latest');
  const [reasoningModel, setReasoningModel] = useState('llama3:latest');
  const [embeddingModel, setEmbeddingModel] = useState('nomic-embed-text');
  const [memorySensitivity, setMemorySensitivity] = useState('medium');

  const handleSave = () => {
    // TODO: Send to backend /api/workspaces/settings
    alert('Settings saved to local workspace preferences.');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 600, color: '#F5F5F5', marginBottom: '8px' }}>Workspace Settings</h1>
        <p style={{ color: '#A8A8A8', fontSize: '15px' }}>Configure your local cognitive engine parameters.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        <Card variant="glass" hoverable={false} animateHover={false} style={{ padding: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#F5F5F5', marginBottom: '24px' }}>AI Engine</h2>
          
          <div style={{ display: 'grid', gap: '24px' }}>
            <div>
              <label style={{ display: 'block', color: '#E0E0E0', fontSize: '14px', marginBottom: '8px' }}>Default Chat Model</label>
              <select 
                value={model}
                onChange={e => setModel(e.target.value)}
                style={{ width: '100%', padding: '12px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#F5F5F5', outline: 'none' }}
              >
                <option value="llama3:latest">llama3:latest</option>
                <option value="phi3:latest">phi3:latest</option>
                <option value="mistral:latest">mistral:latest</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', color: '#E0E0E0', fontSize: '14px', marginBottom: '8px' }}>Reasoning Model (Memory Extraction)</label>
              <select 
                value={reasoningModel}
                onChange={e => setReasoningModel(e.target.value)}
                style={{ width: '100%', padding: '12px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#F5F5F5', outline: 'none' }}
              >
                <option value="llama3:latest">llama3:latest</option>
                <option value="qwen2:7b">qwen2:7b</option>
              </select>
            </div>
          </div>
        </Card>

        <Card variant="glass" hoverable={false} animateHover={false} style={{ padding: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#F5F5F5', marginBottom: '24px' }}>Memory System</h2>
          
          <div style={{ display: 'grid', gap: '24px' }}>
            <div>
              <label style={{ display: 'block', color: '#E0E0E0', fontSize: '14px', marginBottom: '8px' }}>Embedding Model (Vector Storage)</label>
              <select 
                value={embeddingModel}
                onChange={e => setEmbeddingModel(e.target.value)}
                style={{ width: '100%', padding: '12px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#F5F5F5', outline: 'none' }}
              >
                <option value="nomic-embed-text">nomic-embed-text</option>
                <option value="mxbai-embed-large">mxbai-embed-large</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', color: '#E0E0E0', fontSize: '14px', marginBottom: '8px' }}>Memory Extraction Sensitivity</label>
              <select 
                value={memorySensitivity}
                onChange={e => setMemorySensitivity(e.target.value)}
                style={{ width: '100%', padding: '12px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#F5F5F5', outline: 'none' }}
              >
                <option value="low">Low (Only explicit facts)</option>
                <option value="medium">Medium (Facts and strong preferences)</option>
                <option value="high">High (Everything)</option>
              </select>
            </div>
          </div>
        </Card>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
          <PopButton onClick={handleSave}>
            Save Preferences
          </PopButton>
        </div>
      </div>
    </div>
  );
}
