import React, { useEffect, useRef } from 'react';

interface FloatingParticlesProps {
  count?: number;
  color?: string;
  speed?: number;
}

export const FloatingParticles: React.FC<FloatingParticlesProps> = ({
  count = 30,
  color = '168, 168, 168', // RGB for neutral gray #A8A8A8
  speed = 0.3,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      fadeSpeed: number;
    }> = [];

    const createParticle = (isInitial = false) => {
      return {
        x: Math.random() * width,
        y: isInitial ? Math.random() * height : height + 10,
        size: Math.random() * 2 + 1, // 1px to 3px
        speedX: (Math.random() - 0.5) * speed,
        speedY: -Math.random() * speed - 0.1, // slowly drift upwards
        opacity: Math.random() * 0.4 + 0.1,
        fadeSpeed: (Math.random() * 0.005 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
      };
    };

    // Populate initial particles
    for (let i = 0; i < count; i++) {
      particles.push(createParticle(true));
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, idx) => {
        p.x += p.x < 0 ? width : p.x > width ? -width : p.speedX;
        p.y += p.speedY;

        // Oscillate opacity
        p.opacity += p.fadeSpeed;
        if (p.opacity > 0.6 || p.opacity < 0.1) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        // If particle drifts off screen vertically, reset to bottom
        if (p.y < -10) {
          particles[idx] = createParticle(false);
          return;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${Math.max(0, Math.min(1, p.opacity))})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(drawParticles);
    };

    drawParticles();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [count, color, speed]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.8,
      }}
    />
  );
};

export default FloatingParticles;
