'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckStatus }  from './types/boot';
import { HardwareInfo } from './types/system';
import SystemCheck      from './SystemCheck';

const MONO = '"JetBrains Mono", "Fira Code", monospace';

interface HardwarePanelProps {
  status:  CheckStatus;
  data:    HardwareInfo | null;
  onRetry: () => void;
}

export const HardwarePanel: React.FC<HardwarePanelProps> = ({
  status, data, onRetry,
}) => {
  // Per-field status: mirrors parent unless data is null (then 'error')
  const f = (val: unknown): CheckStatus =>
    status === 'pending'  ? 'pending'  :
    status === 'checking' ? 'checking' :
    val  != null          ? 'success'  :
    status === 'error'    ? 'error'    : 'warning';

  const cpu  = data?.cpu;
  const gpu  = data?.gpu;
  const ram  = data?.ram;
  const disk = data?.disk;
  const os   = data?.os ?? null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}
    >
      <span style={{ fontFamily: MONO, fontSize: '10px', fontWeight: 700,
        color: '#3A3A3A', letterSpacing: '0.12em', marginBottom: '8px' }}>
        HARDWARE
      </span>

      <SystemCheck
        label="CPU"
        status={f(cpu)}
        value={cpu ? `${cpu.name}  ·  ${cpu.cores}C / ${cpu.threads}T` : null}
        error="Unavailable"
        onRetry={f(cpu) === 'error' ? onRetry : undefined}
      />

      <SystemCheck
        label="GPU"
        status={f(gpu)}
        value={gpu?.name ?? null}
        subRows={gpu?.vram ? [{ label: 'VRAM', value: gpu.vram }] : undefined}
        error="Unavailable"
      />

      <SystemCheck
        label="RAM"
        status={f(ram)}
        value={ram ? `${ram.total}  ·  ${ram.available} free` : null}
        error="Unavailable"
      />

      <SystemCheck
        label="Disk"
        status={f(disk)}
        value={disk ? `${disk.total}  ·  ${disk.free} free` : null}
        error="Unavailable"
      />

      <SystemCheck
        label="OS"
        status={f(os)}
        value={os}
        error="Unavailable"
      />
    </motion.div>
  );
};

export default HardwarePanel;
