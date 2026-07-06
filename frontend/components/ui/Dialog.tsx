import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, RefreshCw } from 'lucide-react';
import PopButton from './pop-button';

// --- BASE MODAL DIALOG ---
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: string; // e.g. 520px
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = '520px',
}) => {
  // Bind escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-overlay">
          {/* Glass backdrop fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              height: '100%',
              zIndex: -1,
            }}
          />

          {/* Modal Card slide/scale */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="modal-content"
            style={{ maxWidth }}
          >
            {/* Close Button */}
            <PopButton className="modal-close" onClick={onClose} size="sm">
              <X size={18} />
            </PopButton>

            {/* Title Header */}
            {title && (
              <h3 style={{ marginBottom: 'var(--space-4)', fontSize: 'var(--font-size-xl)' }}>
                {title}
              </h3>
            )}

            {/* Modal Body */}
            <div>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- CONFIRMATION DIALOG ---
export interface ConfirmationModalProps extends Omit<ModalProps, 'children'> {
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  isLoading?: boolean;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  title = 'Confirm Action',
  message,
  confirmLabel = 'Proceed',
  cancelLabel = 'Cancel',
  onConfirm,
  isLoading = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <p style={{ marginBottom: 'var(--space-6)', fontSize: 'var(--font-size-base)' }}>
        {message}
      </p>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
        <PopButton size="sm" onClick={onClose} disabled={isLoading}>
          {cancelLabel}
        </PopButton>
        <PopButton size="sm" onClick={onConfirm} disabled={isLoading}>
          {confirmLabel}
        </PopButton>
      </div>
    </Modal>
  );
};

// --- DELETE (DESTRUCTIVE) DIALOG ---
export interface DeleteModalProps extends Omit<ModalProps, 'children'> {
  targetName: string;
  onDelete: () => void;
  isLoading?: boolean;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  title = 'Delete Node permanently',
  targetName,
  onDelete,
  isLoading = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <p style={{ marginBottom: 'var(--space-6)', fontSize: 'var(--font-size-base)' }}>
        Are you absolutely sure you want to delete <strong style={{ color: 'var(--color-primary)' }}>"{targetName}"</strong>? This will permanently sever this neuron pathway. This action is irreversible.
      </p>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
        <PopButton size="sm" onClick={onClose} disabled={isLoading}>
          Retain Pathway
        </PopButton>
        <PopButton size="sm" color="red" onClick={onDelete} disabled={isLoading}>
          Sever Pathway
        </PopButton>
      </div>
    </Modal>
  );
};

// --- PROFILE / SETTINGS DIALOG ---
export interface ProfileModalProps extends Omit<ModalProps, 'children'> {
  userName: string;
  userEmail: string;
  onSyncRun?: () => void;
  isSyncing?: boolean;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  title = 'Cognitive Profile',
  userName,
  userEmail,
  onSyncRun,
  isSyncing = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="580px">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        {/* User Badge Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-white)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '24px',
            }}
          >
            {userName.charAt(0)}
          </div>
          <div>
            <h4 style={{ margin: 0, fontWeight: 'var(--font-weight-semibold)' }}>{userName}</h4>
            <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-secondary)' }}>
              {userEmail}
            </span>
          </div>
        </div>

        {/* Sync Status Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--space-4)',
            backgroundColor: 'var(--color-background)',
            padding: 'var(--space-4)',
            borderRadius: '16px',
            border: '1px solid var(--color-surface)',
          }}
        >
          <div>
            <small style={{ color: 'var(--color-secondary)' }}>Neural Nodes</small>
            <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: 'var(--color-primary)' }}>
              1,248 Memory Points
            </p>
          </div>
          <div>
            <small style={{ color: 'var(--color-secondary)' }}>Integrations</small>
            <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: 'var(--color-primary)' }}>
              Vocal, Mail, Calendar
            </p>
          </div>
        </div>

        {/* Cognitive Settings Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--color-secondary)', textTransform: 'uppercase' }}>
            Privacy & Trust
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-secondary)' }}>
            <Shield size={14} />
            <span style={{ fontSize: 'var(--font-size-xs)' }}>
              All neural layers encrypted locally. Zero analytics data shared.
            </span>
          </div>
        </div>

        {/* Footer controls */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid var(--color-surface)',
            paddingTop: 'var(--space-4)',
            marginTop: 'var(--space-2)',
          }}
        >
          {onSyncRun && (
            <PopButton
              size="sm"
              onClick={onSyncRun}
              disabled={isSyncing}
            >
              <RefreshCw size={14} /> Force Sync
            </PopButton>
          )}
          <PopButton size="sm" onClick={onClose}>
            Done
          </PopButton>
        </div>
      </div>
    </Modal>
  );
};
export default Modal;
