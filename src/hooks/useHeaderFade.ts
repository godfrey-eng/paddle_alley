import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

const FADE_DISTANCE = 320;
const SLIDE_UP_PX = 24;

// Fades the header out and slides it up as the visitor scrolls down.
// Works on the element directly (no React state) so scrolling stays smooth.
export default function useHeaderFade(): RefObject<HTMLElement> {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const progress = Math.min(window.scrollY / FADE_DISTANCE, 1);
      if (!ref.current) return;
      ref.current.style.opacity = String(1 - progress);
      ref.current.style.transform = `translateY(${-progress * SLIDE_UP_PX}px)`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return ref;
}