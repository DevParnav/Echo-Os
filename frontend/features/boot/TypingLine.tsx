'use client';

import React, { useState, useEffect, useRef } from 'react';

interface TypingLineProps {
  text: string;
  speed?: number;       // ms per character
  startDelay?: number;  // ms before typing begins
  onComplete?: () => void;
  style?: React.CSSProperties;
}

export const TypingLine: React.FC<TypingLineProps> = ({
  text,
  speed = 22,
  startDelay = 0,
  onComplete,
  style,
}) => {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const delayRef   = useRef<ReturnType<typeof setTimeout>  | null>(null);

  useEffect(() => {
    setDisplayed('');
    setDone(false);

    delayRef.current = setTimeout(() => {
      let i = 0;
      intervalRef.current = setInterval(() => {
        i += 1;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(intervalRef.current!);
          setDone(true);
          onComplete?.();
        }
      }, speed);
    }, startDelay);

    return () => {
      if (delayRef.current)   clearTimeout(delayRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, speed, startDelay]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <style>{`
        @keyframes echo-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
      <span style={style}>
        {displayed}
        {!done && (
          <span
            style={{
              display: 'inline-block',
              width: '1.5px',
              height: '0.85em',
              backgroundColor: 'currentColor',
              marginLeft: '1px',
              verticalAlign: 'text-bottom',
              animation: 'echo-blink 700ms step-end infinite',
            }}
          />
        )}
      </span>
    </>
  );
};

export default TypingLine;
