import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, X, ChevronRight, Menu, Database, Settings } from 'lucide-react';
import Card from './Card';
import PopButton from './pop-button';

// --- BREADCRUMBS ---
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          {idx > 0 && <ChevronRight size={14} style={{ color: 'var(--color-neutral)' }} />}
          {item.href ? (
            <a
              href={item.href}
              style={{
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--color-secondary)',
                textDecoration: 'none',
                transition: 'color var(--transition-fast)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-secondary)')}
            >
              {item.label}
            </a>
          ) : (
            <span
              style={{
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-primary)',
              }}
            >
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

// --- SIDEBAR ---
export interface SidebarLink {
  label: string;
  icon: React.ReactNode;
  href: string;
  active?: boolean;
}

export interface SidebarProps {
  links: SidebarLink[];
  activeLinkIdx?: number;
  userName?: string;
  userAvatarUrl?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  links,
  activeLinkIdx = 0,
  userName = 'Parnav',
  userAvatarUrl: _userAvatarUrl,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.div
      animate={{ width: collapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)' }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      style={{
        height: '100vh',
        backgroundColor: 'var(--color-white)',
        borderRight: '1px solid rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'var(--space-6) var(--space-4)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div>
        {/* Logo & Toggle */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'space-between',
            marginBottom: 'var(--space-8)',
            paddingLeft: collapsed ? '0' : 'var(--space-2)',
          }}
        >
          {!collapsed && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  backgroundColor: 'var(--color-primary)',
                  borderRadius: '6px',
                }}
              />
              <span style={{ fontWeight: 'var(--font-weight-bold)', fontSize: 'var(--font-size-lg)' }}>
                EchoOS
              </span>
            </div>
          )}
          <PopButton
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            style={{
              background: 'transparent',
              color: 'var(--color-secondary)',
              padding: '6px',
            }}
          >
            <Menu size={18} />
          </PopButton>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
          {links.map((link, idx) => {
            const isActive = idx === activeLinkIdx;
            return (
              <a
                key={idx}
                href={link.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  padding: 'var(--space-3) var(--space-4)',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: isActive ? 'var(--font-weight-semibold)' : 'var(--font-weight-medium)',
                  color: isActive ? 'var(--color-primary)' : 'var(--color-secondary)',
                  backgroundColor: isActive ? 'var(--color-surface)' : 'transparent',
                  transition: 'all var(--transition-fast)',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = 'var(--color-background)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <span style={{ display: 'flex', flexShrink: 0 }}>{link.icon}</span>
                {!collapsed && <span>{link.label}</span>}
              </a>
            );
          })}
        </div>
      </div>

      {/* Footer Info / User Account */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {!collapsed && (
          <Card
            variant="glass"
            hoverable={false}
            animateHover={false}
            style={{ padding: 'var(--space-3)', borderRadius: '12px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: '11px', color: 'var(--color-secondary)' }}>
              <Database size={12} />
              <span>Brain Memory: 42% Synced</span>
            </div>
          </Card>
        )}

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'space-between',
            paddingTop: 'var(--space-3)',
            borderTop: '1px solid var(--color-surface)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-white)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '12px',
              }}
            >
              {userName.charAt(0)}
            </div>
            {!collapsed && (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                  {userName}
                </span>
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-secondary)' }}>
                  Cognitive Tier
                </span>
              </div>
            )}
          </div>
          {!collapsed && (
            <div style={{ display: 'flex', gap: '8px', color: 'var(--color-secondary)' }}>
              <Settings size={16} style={{ cursor: 'pointer' }} />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// --- TOP NAVIGATION BAR ---
export interface TopNavigationProps {
  breadcrumbsItems: BreadcrumbItem[];
  onSearchClick: () => void;
  activeMode?: 'focus' | 'reflect' | 'dream';
  onModeChange?: (mode: 'focus' | 'reflect' | 'dream') => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  breadcrumbsItems,
  onSearchClick,
  activeMode = 'focus',
  onModeChange,
}) => {
  return (
    <header
      style={{
        height: 'var(--header-height)',
        backgroundColor: 'rgba(245, 245, 245, 0.75)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 'var(--space-6)',
        paddingRight: 'var(--space-6)',
        position: 'sticky',
        top: 0,
        zIndex: 40,
      }}
    >
      <Breadcrumbs items={breadcrumbsItems} />

      {/* Center cognitive state toggle */}
      {onModeChange && (
        <div
          style={{
            display: 'flex',
            backgroundColor: 'var(--color-surface)',
            borderRadius: '999px',
            padding: '3px',
            gap: '2px',
          }}
        >
          {(['focus', 'reflect', 'dream'] as const).map((mode) => {
            const isSelected = mode === activeMode;
            return (
              <PopButton
                key={mode}
                size="sm"
                onClick={() => onModeChange(mode)}
                style={{
                  borderRadius: '999px',
                  textTransform: 'capitalize',
                  backgroundColor: isSelected ? 'var(--color-primary)' : 'transparent',
                  color: isSelected ? 'var(--color-white)' : 'var(--color-secondary)',
                }}
              >
                {mode}
              </PopButton>
            );
          })}
        </div>
      )}

      {/* Right side controls (Search trigger button) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        <PopButton
          size="sm"
          onClick={onSearchClick}
        >
          Search OS
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1px',
              border: '1px solid var(--color-neutral)',
              borderRadius: '4px',
              padding: '1px 4px',
              marginLeft: 'var(--space-2)',
              fontSize: '9px',
            }}
          >
            <Command size={8} />
            <span>K</span>
          </div>
        </PopButton>
      </div>
    </header>
  );
};

// --- COMMAND PALETTE OVERLAY ---
export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSearchSelect?: (item: any) => void;
}

const mockSearchItems = [
  { category: 'Memories', title: 'Coffee with Sarah talking about Startup scaling', date: '2 hours ago' },
  { category: 'Decisions', title: 'Chose Ollama over OpenAI API for local reasoning', date: 'Yesterday' },
  { category: 'Insights', title: 'Sleep patterns correlate negatively with cognitive delay', date: '2 days ago' },
  { category: 'Goals', title: 'Complete first screen layouts of EchoOS', date: 'Due tomorrow' },
];

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onSearchSelect }) => {
  const [query, setQuery] = useState('');

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const filteredItems = mockSearchItems.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-overlay" style={{ alignItems: 'flex-start', paddingTop: '10vh' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: '100%', maxWidth: '640px' }}
          >
            <Card
              variant="glass"
              hoverable={false}
              animateHover={false}
              style={{
                padding: 0,
                overflow: 'hidden',
                borderRadius: '20px',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: '0 24px 64px rgba(0, 0, 0, 0.1)',
              }}
            >
              {/* Search Bar header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: 'var(--space-4) var(--space-5)',
                  borderBottom: '1px solid var(--color-surface)',
                }}
              >
                <Search size={20} style={{ color: 'var(--color-secondary)', marginRight: 'var(--space-3)' }} />
                <input
                  type="text"
                  placeholder="Search decisions, outcomes, memories, filters..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                  style={{
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    width: '100%',
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--font-size-base)',
                    color: 'var(--color-primary)',
                  }}
                />
                <PopButton
                  size="sm"
                  onClick={onClose}
                  style={{
                    background: 'transparent',
                    color: 'var(--color-secondary)',
                    padding: '4px',
                  }}
                >
                  <X size={16} />
                </PopButton>
              </div>

              {/* Items List */}
              <div
                style={{
                  maxHeight: '380px',
                  overflowY: 'auto',
                  padding: 'var(--space-2) 0',
                }}
              >
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        if (onSearchSelect) onSearchSelect(item);
                        onClose();
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: 'var(--space-3) var(--space-5)',
                        cursor: 'pointer',
                        transition: 'background var(--transition-fast)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(0, 0, 0, 0.03)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                        <span
                          className="badge"
                          style={{
                            fontSize: '10px',
                            fontWeight: 'bold',
                            padding: '2px 8px',
                            minWidth: '70px',
                            textAlign: 'center',
                          }}
                        >
                          {item.category}
                        </span>
                        <span
                          style={{
                            fontSize: 'var(--font-size-sm)',
                            fontWeight: 'var(--font-weight-medium)',
                            color: 'var(--color-primary)',
                          }}
                        >
                          {item.title}
                        </span>
                      </div>
                      <small style={{ color: 'var(--color-neutral)', flexShrink: 0 }}>
                        {item.date}
                      </small>
                    </div>
                  ))
                ) : (
                  <div
                    style={{
                      padding: 'var(--space-8)',
                      textAlign: 'center',
                      color: 'var(--color-secondary)',
                      fontSize: 'var(--font-size-sm)',
                    }}
                  >
                    No matching thoughts found in this cognitive cluster.
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
export default Sidebar;
