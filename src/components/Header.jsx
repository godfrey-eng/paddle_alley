import '../header.css';
import { useEffect, useRef } from 'react';
import logoMark from '../assets/logo-mark.png';

const FADE_DISTANCE = 320;

export default function Header() {
  const ref = useRef(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const p = Math.min(window.scrollY / FADE_DISTANCE, 1);
      if (ref.current) {
        ref.current.style.opacity = String(1 - p);
        ref.current.style.transform = `translateY(${-p * 24}px)`;
      }
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header className="header" ref={ref}>
      <a href="#top">
  <img src={logoMark} alt="" />
  <span>PADDLE ALLEY</span>
  </a>
    </header>
  );
}