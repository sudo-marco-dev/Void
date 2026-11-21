'use client';

import { useEffect, type ReactNode } from 'react';
import Lenis from 'lenis';
import { MotionConfig } from 'motion/react';

export function MotionProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.08,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      prevent: (node) => {
        if (node.getAttribute('role') === 'dialog' || node.hasAttribute('data-lenis-prevent')) {
          return true;
        }
        const overflowY = window.getComputedStyle(node).overflowY;
        return (
          (overflowY === 'auto' || overflowY === 'scroll') &&
          node.scrollHeight > node.clientHeight
        );
      },
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };
    rafId = window.requestAnimationFrame(raf);

    // Pause Lenis scroll physics while any drawer or modal locks body scroll.
    const syncBodyLock = () => {
      if (document.body.style.overflow === 'hidden') {
        lenis.stop();
      } else {
        lenis.start();
      }
    };
    const bodyObserver = new MutationObserver(syncBodyLock);
    bodyObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ['style'],
    });

    return () => {
      bodyObserver.disconnect();
      if (rafId) window.cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
