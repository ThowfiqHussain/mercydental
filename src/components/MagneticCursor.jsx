import React, { useEffect, useRef, useState } from 'react';

export default function MagneticCursor() {
  const dotRef   = useRef(null);
  const ringRef  = useRef(null);
  const [isHover, setIsHover] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const pos = useRef({ x: -200, y: -200 });
  const ring = useRef({ x: -200, y: -200 });
  const raf  = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      // Dot follows instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      // Ring follows with lag — premium trailing feel
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px)`;
      }
      raf.current = requestAnimationFrame(animate);
    };

    const onEnter = (e) => {
      const el = e.target.closest('a, button, [data-magnetic]');
      if (el) setIsHover(true);
    };
    const onLeave = () => setIsHover(false);
    const onDown  = () => setIsClick(true);
    const onUp    = () => setIsClick(false);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout',  onLeave);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup',   onUp);
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout',  onLeave);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup',   onUp);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      {/* Dot — snappy */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none transition-opacity duration-200"
        style={{
          width: isClick ? '6px' : '8px',
          height: isClick ? '6px' : '8px',
          borderRadius: '50%',
          background: isHover
            ? 'transparent'
            : 'linear-gradient(135deg, #D4AF37, #FCE762)',
          boxShadow: isHover ? 'none' : '0 0 12px rgba(212,175,55,0.9)',
          transition: 'width 0.15s, height 0.15s, background 0.2s',
        }}
      />

      {/* Ring — lagging */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          width:  isHover ? '52px' : '40px',
          height: isHover ? '52px' : '40px',
          borderRadius: '50%',
          border: isHover
            ? '1.5px solid rgba(212,175,55,0.9)'
            : '1.5px solid rgba(212,175,55,0.45)',
          background: isHover ? 'rgba(212,175,55,0.06)' : 'transparent',
          backdropFilter: isHover ? 'blur(4px)' : 'none',
          transition: 'width 0.35s cubic-bezier(0.16,1,0.3,1), height 0.35s cubic-bezier(0.16,1,0.3,1), border 0.2s, background 0.2s',
          mixBlendMode: 'normal',
        }}
      />
    </>
  );
}
