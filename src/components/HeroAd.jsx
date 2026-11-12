import '../hero.css';
import { useEffect } from 'react';
import { Button, Tag } from 'antd';
import { heroSlides, facts } from '../data/content';
import { useAdStore } from '../store/useAdStore';
import { getStatus } from '../utils/time';

const SLIDE_MS = 5000;
const COUNT = heroSlides.length;

// Fully automatic slideshow: the background changes by itself, no clicks needed.
export default function HeroAd() {
  const openBooking = useAdStore((s) => s.openBooking);
  const index = useAdStore((s) => s.heroIndex);
  const goHero = useAdStore((s) => s.goHero);
  const status = getStatus();

  useEffect(() => {
    const id = setInterval(() => goHero(useAdStore.getState().heroIndex + 1, COUNT), SLIDE_MS);
    return () => clearInterval(id);
  }, [goHero]);

  return (
    <section className="hero">
      {heroSlides.map((s, i) => (
        <div key={s.src} aria-hidden="true"
          className={`hero-bg ${i === index ? 'active' : ''} pan-${i % 3}`}
          style={{ backgroundImage: `url(${s.src})`, backgroundPosition: s.pos }} />
      ))}

      <div className="wrap">
        <Tag color={status.open ? '#C3D82E' : '#ffffff'} style={{ color: '#1B3A66', fontWeight: 700 }}>
          {status.text}
        </Tag>
        <h1>Serve. Dink. Smash.</h1>
        <p>Paddle Alley is the neighborhood court where you walk in, pick a time, and play. No membership, no account.</p>
        <div className="facts">
          {facts.map((f) => (
            <div key={f.label}><b>{f.value}</b><span>{f.label}</span></div>
          ))}
        </div>
      </div>
    </section>
  );
}
