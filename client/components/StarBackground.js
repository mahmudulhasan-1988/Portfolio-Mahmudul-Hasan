'use client';

import { useEffect, useRef } from 'react';

export default function StarBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Generate stars
    const makeStars = () =>
      Array.from({ length: 220 }, () => ({
        x:     Math.random() * canvas.width,
        y:     Math.random() * canvas.height,
        r:     Math.random() * 1.4 + 0.2,
        alpha: Math.random() * 0.6 + 0.2,
        speed: Math.random() * 0.4 + 0.05,
        phase: Math.random() * Math.PI * 2,
        // color: purple-white mix
        hue:   Math.random() > 0.6 ? 270 : 240,
      }));

    let stars = makeStars();
    window.addEventListener('resize', () => { resize(); stars = makeStars(); });

    // Occasional shooting stars
    let shooters = [];
    const spawnShooter = () => {
      shooters.push({
        x:  Math.random() * canvas.width,
        y:  Math.random() * canvas.height * 0.5,
        vx: 4 + Math.random() * 3,
        vy: 2 + Math.random() * 2,
        len: 80 + Math.random() * 60,
        alpha: 1,
        life: 0,
        maxLife: 40 + Math.random() * 20,
      });
    };
    let shooterTimer = 0;

    const draw = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw static stars with twinkling
      stars.forEach(s => {
        const tw = 0.4 + 0.6 * Math.abs(Math.sin(time * 0.0008 * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue}, 70%, 85%, ${s.alpha * tw})`;
        ctx.fill();
      });

      // Shooting stars
      shooterTimer++;
      if (shooterTimer > 180 + Math.random() * 120) {
        spawnShooter();
        shooterTimer = 0;
      }
      shooters = shooters.filter(sh => sh.life < sh.maxLife);
      shooters.forEach(sh => {
        sh.life++;
        sh.x += sh.vx;
        sh.y += sh.vy;
        const prog = sh.life / sh.maxLife;
        const alpha = (1 - prog) * 0.7;
        const grad = ctx.createLinearGradient(sh.x, sh.y, sh.x - sh.vx * (sh.len / 5), sh.y - sh.vy * (sh.len / 5));
        grad.addColorStop(0, `rgba(167,139,250,${alpha})`);
        grad.addColorStop(1, 'rgba(167,139,250,0)');
        ctx.beginPath();
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.moveTo(sh.x, sh.y);
        ctx.lineTo(sh.x - sh.vx * (sh.len / 5), sh.y - sh.vy * (sh.len / 5));
        ctx.stroke();
      });

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, opacity: 0.7 }}
    />
  );
}
