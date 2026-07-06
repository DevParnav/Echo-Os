'use client';

import React, { useEffect, useRef } from 'react';

export const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const nodeCount = 90;
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      depth: number;
    }> = [];

    // Initialize slower nodes for premium feeling
    for (let i = 0; i < nodeCount; i++) {
      const depth = Math.random() * 0.8 + 0.2;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.08 * depth, // Very slow movement
        vy: (Math.random() - 0.5) * 0.08 * depth,
        radius: (Math.random() * 1.2 + 0.4) * depth,
        depth,
      });
    }

    let parallaxX = 0;
    let parallaxY = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Dark monochrome backdrop
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, width, height);

      // Smoothly interpolate parallax target (lerp)
      if (mouseRef.current.x !== -1000) {
        const targetX = (mouseRef.current.x - width / 2) * -0.03;
        const targetY = (mouseRef.current.y - height / 2) * -0.03;
        parallaxX += (targetX - parallaxX) * 0.04;
        parallaxY += (targetY - parallaxY) * 0.04;
      } else {
        parallaxX += (0 - parallaxX) * 0.04;
        parallaxY += (0 - parallaxY) * 0.04;
      }

      ctx.save();
      // Apply parallax translation for GPU acceleration
      ctx.translate(parallaxX, parallaxY);

      // Draw lines between nearby nodes
      ctx.lineWidth = 0.8;
      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 160 && Math.abs(nodes[i].depth - nodes[j].depth) < 0.25) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.022 * (1 - dist / 160)})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw and update nodes
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;

        // Wrap-around bounds with offset to prevent sudden clips
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;

        // Subtle pull toward mouse coordinates
        if (mouseRef.current.x !== -1000) {
          const dx = mouseRef.current.x - parallaxX - n.x;
          const dy = mouseRef.current.y - parallaxY - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 250) {
            const force = (250 - dist) / 250;
            n.x += (dx / dist) * force * 0.15 * n.depth;
            n.y += (dy / dist) * force * 0.15 * n.depth;
          }
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 245, 245, ${n.depth * 0.18})`;
        ctx.fill();
      });

      // Drifting tiny premium particles (dust specs)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
      for (let i = 0; i < 20; i++) {
        ctx.beginPath();
        ctx.arc(
          (Math.sin(Date.now() * 0.0003 + i) * width * 0.6) + width * 0.5,
          (Math.cos(Date.now() * 0.00018 + i) * height * 0.6) + height * 0.5,
          0.6,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }

      ctx.restore();

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default NeuralBackground;
