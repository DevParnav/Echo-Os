'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import PopButton from '../ui/pop-button';

interface NavbarProps {
  onLaunchClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLaunchClick }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState('');
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll for glass blur + shrink
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track which section is in view
  useEffect(() => {
    if (pathname !== '/') return;

    const sections = ['features', 'how-it-works', 'privacy', 'roadmap', 'faq'];

    const handleScrollActive = () => {
      const scrollPos = window.scrollY + 130;

      for (const secId of sections) {
        const el = document.getElementById(secId);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(secId);
            return;
          }
        }
      }
      setActiveSection('');
    };

    window.addEventListener('scroll', handleScrollActive, { passive: true });
    handleScrollActive();

    return () => window.removeEventListener('scroll', handleScrollActive);
  }, [pathname]);

  const handleLinkClick = (e: React.MouseEvent, secId: string) => {
    e.preventDefault();
    if (pathname !== '/') {
      router.push(`/#${secId}`);
      return;
    }
    const el = document.getElementById(secId);
    if (el) {
      const rect = el.getBoundingClientRect();
      window.scrollTo({ top: rect.top + window.scrollY - 80, behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'Features', id: 'features' },
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'Privacy', id: 'privacy' },
    { label: 'Roadmap', id: 'roadmap' },
    { label: 'FAQ', id: 'faq' },
  ];

  return (
    <motion.nav
      animate={{ height: isScrolled ? 60 : 80 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 var(--space-8)',
        zIndex: 50,
        borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid transparent',
        backgroundColor: isScrolled ? 'rgba(5, 5, 5, 0.70)' : 'rgba(5, 5, 5, 0)',
        backdropFilter: isScrolled ? 'blur(24px) saturate(180%)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(24px) saturate(180%)' : 'none',
        transition: 'background-color 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
      }}
    >
      {/* Logo */}
      <div
        onClick={() => {
          if (pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
          else router.push('/');
        }}
        style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}
      >
        <motion.div
          animate={{ rotate: isScrolled ? 45 : 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: '16px', height: '16px', backgroundColor: '#F5F5F5', borderRadius: '4px' }}
        />
        <span
          style={{
            fontWeight: 'var(--font-weight-bold)',
            fontSize: 'var(--font-size-base)',
            letterSpacing: '-0.02em',
            color: '#F5F5F5',
          }}
        >
          EchoOS
        </span>
      </div>

      {/* Navigation links */}
      <div style={{ display: 'flex', gap: 'var(--space-8)', alignItems: 'center' }}>
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          const isHovered = hoveredLink === item.id;

          return (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredLink(item.id)}
              onMouseLeave={() => setHoveredLink(null)}
              style={{ position: 'relative', padding: '6px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <a
                href={`#${item.id}`}
                onClick={(e) => handleLinkClick(e, item.id)}
                style={{
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: isActive ? '#F5F5F5' : isHovered ? '#D4D4D4' : '#A8A8A8',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
              >
                {/* Active dot indicator */}
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      key="dot"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        backgroundColor: '#F5F5F5',
                        display: 'inline-block',
                        flexShrink: 0,
                        boxShadow: '0 0 6px rgba(245, 245, 245, 0.7)',
                      }}
                    />
                  )}
                </AnimatePresence>
                {item.label}
              </a>

              {/* Animated underline — shared layoutId slides between links */}
              <AnimatePresence>
                {(isActive || isHovered) && (
                  <motion.div
                    key={isActive ? 'active-line' : 'hover-line'}
                    layoutId={isActive ? 'navbar-active-underline' : undefined}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    exit={{ scaleX: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '1.5px',
                      backgroundColor: '#F5F5F5',
                      borderRadius: '999px',
                      transformOrigin: 'center',
                      opacity: isActive ? 1 : 0.45,
                    }}
                  />
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Action CTA */}
      <PopButton
        size="sm"
        onClick={onLaunchClick ?? (() => router.push('/login'))}
        style={{ background: 'transparent', color: '#F5F5F5', border: '1px solid rgba(255,255,255,0.2)' }}
      >
        Launch EchoOS
      </PopButton>
    </motion.nav>
  );
};

export default Navbar;
