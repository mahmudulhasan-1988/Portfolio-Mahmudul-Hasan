'use client';

import { useEffect } from 'react';

export default function MouseSpotlight() {
  useEffect(() => {
    const update = (e) => {
      document.documentElement.style.setProperty('--mx', e.clientX + 'px');
      document.documentElement.style.setProperty('--my', e.clientY + 'px');
    };
    window.addEventListener('mousemove', update, { passive: true });
    return () => window.removeEventListener('mousemove', update);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="mouse-spotlight"
    />
  );
}
