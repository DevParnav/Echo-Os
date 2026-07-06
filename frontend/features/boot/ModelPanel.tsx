'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckStatus } from './types/boot';
import { OllamaInfo }  from './types/system';
import SystemCheck     from './SystemCheck';

const MONO = '"JetBrains Mono", "Fira Code", monospace';

interface ModelPanelProps {
  status:  CheckStatus;
  data:    OllamaInfo | null;
  error:   string | null;
  onRetry: () => void;
}

export const ModelPanel: React.FC<ModelPanelProps> = ({
  status, data, error, onRetry,
}) => {
  const running = data?.running ?? false;
  const models  = data?.models  ?? [];

  const ollamaStatus: CheckStatus =
    status === 'pending'  ? 'pending'  :
    status === 'checking' ? 'checking' :
    running               ? 'success'  : 'error';

  const modelsStatus: CheckStatus =
    status === 'pending'  ? 'pending'   :
    status === 'checking' ? 'checking'  :
    !running              ? 'error'     :
    models.length > 0     ? 'success'   : 'warning';

  const ollamaValue = running
    ? `Running${data?.version ? `  ·  v${data.version}` : ''}`
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}
    >
      <span style={{ fontFamily: MONO, fontSize: '10px', fontWeight: 700,
        color: '#3A3A3A', letterSpacing: '0.12em', marginBottom: '8px' }}>
        AI ENGINE
      </span>

      <SystemCheck
        label="Ollama"
        status={ollamaStatus}
        value={ollamaValue}
        error={error ?? 'Ollama Offline'}
        onRetry={ollamaStatus === 'error' ? onRetry : undefined}
      />

      <SystemCheck
        label="Models"
        status={modelsStatus}
        value={models.length > 0 ? models : null}
        error={models.length === 0 ? 'No models installed' : null}
        onRetry={(modelsStatus === 'error' || modelsStatus === 'warning') ? onRetry : undefined}
      />
    </motion.div>
  );
};

export default ModelPanel;
