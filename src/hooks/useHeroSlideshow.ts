import { useEffect } from 'react';
import { selectNextHero, useAdStore } from '../store/useAdStore';

// Fully automatic slideshow: moves to the next slide on a timer, no clicks needed.
export default function useHeroSlideshow(count: number, intervalMs: number): void {
  const nextHero = useAdStore(selectNextHero);

  useEffect(() => {
    const id = setInterval(nextHero, intervalMs, count);
    return () => clearInterval(id);
  }, [nextHero, count, intervalMs]);
}
