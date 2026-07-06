'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckStatus } from './types/boot';
import { MemoryInfo }  from './types/system';
import SystemCheck     from './SystemCheck';

const MONO = '"JetBrains Mono", "Fira Code", monospace';

interface HealthPanelProps {
  status:  CheckStatus;
  data:    MemoryInfo | null;
  onRetry: () => void;
}

// Convert boolean availability to a CheckStatus
function boolStatus(val: boolean | undefined, parent: CheckStatus): CheckStatus {
  if (parent === 'pending')  return 'pending';
  if (parent === 'checking') return 'checking';
  if (val === true)          return 'success';
  if (val === false)         return 'error';
  return 'warning';
}

export const HealthPanel: React.FC<HealthPanelProps> = ({
  status, data, onRetry,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}
    >
      <span style={{ fontFamily: MONO, fontSize: '10px', fontWeight: 700,
        color: '#3A3A3A', letterSpacing: '0.12em', marginBottom: '8px' }}>
        MEMORY ENGINE
      </span>

      <SystemCheck
        label="SQLite"
        status={boolStatus(data?.sqlite, status)}
        value={data?.sqlite ? 'Available' : null}
        error="Unavailable"
        onRetry={boolStatus(data?.sqlite, status) === 'error' ? onRetry : undefined}
      />

      <SystemCheck
        label="ChromaDB"
        status={boolStatus(data?.chromadb, status)}
        value={data?.chromadb ? 'Available' : null}
        error="Not Installed"
      />

      <SystemCheck
        label="Embeddings"
        status={boolStatus(data?.embeddings, status)}
        value={data?.embeddings ? 'Model Loaded' : null}
        error="No Embed Model"
      />

      <SystemCheck
        label="Decision Engine"
        status={boolStatus(data?.decisionEngine, status)}
        value={data?.decisionEngine ? 'Ready' : null}
        error="Unavailable"
      />

      <SystemCheck
        label="Privacy Layer"
        status={status === 'pending' ? 'pending' : status === 'checking' ? 'checking' : 'success'}
        value="Enabled"
      />
    </motion.div>
  );
};

export default HealthPanel;
