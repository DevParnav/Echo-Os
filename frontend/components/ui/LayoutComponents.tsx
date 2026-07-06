import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import PopButton from './pop-button';

// --- TIMELINE ---
export interface TimelineItem {
  id: string | number;
  title: string;
  description?: string;
  date: string;
  dotColor?: string;
}

export interface TimelineProps {
  items: TimelineItem[];
}

export const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <div className="timeline-container">
      {items.map((item) => (
        <div key={item.id} className="timeline-item">
          <div
            className="timeline-dot"
            style={{
              backgroundColor: item.dotColor || 'var(--color-primary)',
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-neutral)', fontWeight: 'var(--font-weight-medium)' }}>
              {item.date}
            </span>
            <h4 style={{ margin: 0, fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>
              {item.title}
            </h4>
            {item.description && (
              <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--color-secondary)', marginTop: '4px' }}>
                {item.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

// --- ACCORDION ---
export interface AccordionItem {
  id: string | number;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({ items, allowMultiple = false }) => {
  const [expandedIds, setExpandedIds] = useState<Array<string | number>>([]);

  const toggleItem = (id: string | number) => {
    if (allowMultiple) {
      setExpandedIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    } else {
      setExpandedIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div style={{ width: '100%' }}>
      {items.map((item) => {
        const isExpanded = expandedIds.includes(item.id);
        return (
          <div key={item.id} className="accordion-item">
            <div className="accordion-header" onClick={() => toggleItem(item.id)}>
              <span>{item.title}</span>
              <motion.span
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                style={{ display: 'flex' }}
              >
                <ChevronDown size={16} />
              </motion.span>
            </div>
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="accordion-content">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

// --- TABS ---
export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultTabId?: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, defaultTabId }) => {
  const [activeTabId, setActiveTabId] = useState(defaultTabId || tabs[0]?.id);

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Tab Switcher Headers */}
      <div
        style={{
          display: 'flex',
          borderBottom: '1px solid var(--color-surface)',
          gap: 'var(--space-6)',
        }}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <PopButton
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              style={{
                background: 'transparent',
                padding: 'var(--space-2) 0 var(--space-3) 0',
                color: isActive ? 'var(--color-primary)' : 'var(--color-secondary)',
                position: 'relative',
              }}
            >
              {tab.label}
              {isActive && (
                <motion.div
                  layoutId="activeTabUnderline"
                  style={{
                    position: 'absolute',
                    bottom: '-1px',
                    left: 0,
                    right: 0,
                    height: '2px',
                    backgroundColor: 'var(--color-primary)',
                  }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </PopButton>
          );
        })}
      </div>

      {/* Tab Panel */}
      <div>{tabs.find((tab) => tab.id === activeTabId)?.content}</div>
    </div>
  );
};

// --- TABLE ---
export interface TableColumn<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  width?: string;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
}

export function Table<T extends { id: string | number }>({ columns, data }: TableProps<T>) {
  return (
    <div style={{ width: '100%', overflowX: 'auto', border: '1px solid var(--color-surface)', borderRadius: '16px' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          textAlign: 'left',
          fontSize: 'var(--font-size-sm)',
          fontFamily: 'var(--font-sans)',
        }}
      >
        <thead>
          <tr style={{ backgroundColor: 'var(--color-background)', borderBottom: '1px solid var(--color-surface)' }}>
            {columns.map((col, idx) => (
              <th
                key={idx}
                style={{
                  padding: 'var(--space-4) var(--space-6)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--color-secondary)',
                  width: col.width,
                }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              style={{
                borderBottom: '1px solid var(--color-surface)',
                transition: 'background-color var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.01)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {columns.map((col, colIdx) => {
                const cellContent =
                  typeof col.accessor === 'function'
                    ? col.accessor(row)
                    : (row[col.accessor] as React.ReactNode);

                return (
                  <td
                    key={colIdx}
                    style={{
                      padding: 'var(--space-4) var(--space-6)',
                      color: 'var(--color-primary)',
                    }}
                  >
                    {cellContent}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
