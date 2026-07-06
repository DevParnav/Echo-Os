'use client';

import React, { useState, useEffect } from 'react';

interface TypingTextProps {
  text: string;
  speed?: number; // Milliseconds per character
  delay?: number; // Milliseconds delay before starting
  onComplete?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const TypingText: React.FC<TypingTextProps> = ({
  text,
  speed = 30,
  delay = 0,
  onComplete,
  className = '',
  style,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingStarted, setIsTypingStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setIsTypingStarted(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!isTypingStarted) return;

    let index = 0;
    setDisplayedText('');

    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, isTypingStarted, onComplete]);

  return (
    <span className={className} style={style}>
      {displayedText}
      {!isTypingStarted && text.length > 0 && <span style={{ opacity: 0 }}>{text}</span>}
    </span>
  );
};

export default TypingText;
