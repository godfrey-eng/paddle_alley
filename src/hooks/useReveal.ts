import { useEffect } from 'react';

const REVEAL_SELECTOR = '[data-reveal]';
const VISIBLE_THRESHOLD = 0.15;

// Adds the "in" class to any [data-reveal] element when it scrolls into view.
export default function useReveal(): void {
  useEffect(() => {
    const reveal = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      });
    };

    const observer = new IntersectionObserver(reveal, { threshold: VISIBLE_THRESHOLD });
    document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
