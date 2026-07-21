import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Eagerly import all frames from imgzip
const frameModules = import.meta.glob('../../imgzip/*.gif', { eager: true, import: 'default' });

// Sort frame URLs sequentially by index (frame_00 to frame_50)
const frameUrls = Object.keys(frameModules)
  .sort((a, b) => {
    const numA = parseInt(a.match(/frame_(\d+)/)?.[1] || '0', 10);
    const numB = parseInt(b.match(/frame_(\d+)/)?.[1] || '0', 10);
    return numA - numB;
  })
  .map((key) => frameModules[key]);

export default function ToothBackgroundCanvas() {
  const canvasRef       = useRef(null);
  const imagesRef       = useRef([]);
  const currentFrameRef = useRef(0);

  useEffect(() => {
    let isMounted = true;
    const totalFrames = frameUrls.length;
    let loadedCount = 0;
    const loadedImages = [];

    function renderCanvasFrame(img) {
      const canvas = canvasRef.current;
      if (!canvas || !img) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const isDesktop = width >= 1024;
      const isTablet  = width >= 768 && width < 1024;

      const sizeRatio = isDesktop ? 0.76 : isTablet ? 0.60 : 0.48;
      const targetHeight = height * sizeRatio;
      const scale = targetHeight / img.height;

      const drawWidth  = img.width * scale;
      const drawHeight = img.height * scale;

      let posX;
      if (isDesktop) {
        posX = width * 0.68 - drawWidth / 2;
        posX = Math.min(posX, width - drawWidth - 32);
      } else {
        posX = (width - drawWidth) / 2;
      }

      let posY = isDesktop ? (height - drawHeight) / 2 : height * 0.45 - drawHeight / 2;

      // Draw original frame onto canvas
      ctx.drawImage(
        img,
        0, 0, img.width, img.height,
        posX, posY, drawWidth, drawHeight
      );

      // Chroma-key / Luminance Thresholding: Remove dark rectangular outer box
      try {
        const renderX = Math.floor(posX * dpr);
        const renderY = Math.floor(posY * dpr);
        const renderW = Math.floor(drawWidth * dpr);
        const renderH = Math.floor(drawHeight * dpr);

        if (renderW > 0 && renderH > 0) {
          const imgData = ctx.getImageData(renderX, renderY, renderW, renderH);
          const data = imgData.data;
          const len = data.length;

          for (let i = 0; i < len; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            // Luminance calculation
            const lum = 0.299 * r + 0.587 * g + 0.114 * b;

            if (lum < 38) {
              // Smoothly fade out dark outer box background pixels
              const alphaFactor = Math.max(0, (lum - 12) / 26);
              data[i + 3] = Math.floor(data[i + 3] * alphaFactor);
            }
          }

          ctx.putImageData(imgData, renderX, renderY);
        }
      } catch (err) {
        // Fallback gracefully if canvas context security / dpr boundary prevents pixel manipulation
      }

      ctx.restore();
    }

    const drawFrame = (index) => {
      const img = imagesRef.current[index] || loadedImages[index];
      if (img) renderCanvasFrame(img);
    };

    // Preload frames
    frameUrls.forEach((src, index) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        if (!isMounted) return;
        loadedImages[index] = img;
        loadedCount++;

        if (index === 0) drawFrame(0);
        if (loadedCount === totalFrames) imagesRef.current = loadedImages;
      };
    });

    // ScrollTrigger spanning from top of page down to end of #about section
    const st = ScrollTrigger.create({
      trigger: '#hero',
      endTrigger: '#about',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.4,
      onUpdate: (self) => {
        const frameIndex = Math.min(
          totalFrames - 1,
          Math.max(0, Math.floor(self.progress * (totalFrames - 1)))
        );
        if (currentFrameRef.current !== frameIndex) {
          currentFrameRef.current = frameIndex;
          drawFrame(frameIndex);
        }
      },
    });

    const handleResize = () => drawFrame(currentFrameRef.current);
    window.addEventListener('resize', handleResize);

    return () => {
      isMounted = false;
      window.removeEventListener('resize', handleResize);
      st.kill();
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-95 transition-opacity duration-300"
      />
    </div>
  );
}
