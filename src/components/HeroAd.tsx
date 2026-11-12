import '../hero.css';
import '../hero-slides.css';
import { Tag } from 'antd';
import { facts, heroSlides } from '../data/content';
import { selectHeroIndex, useAdStore } from '../store/useAdStore';
import useHeroSlideshow from '../hooks/useHeroSlideshow';
import { getStatus } from '../utils/time';
import { COLORS } from '../theme/brand';
import HeroBackground from './HeroBackground';
import HeroFacts from './HeroFacts';

const SLIDE_MS = 5000;
const SLIDE_COUNT = heroSlides.length;

export default function HeroAd() {
  const heroIndex = useAdStore(selectHeroIndex);
  const status = getStatus();
  const tagColor = status.open ? COLORS.lime : COLORS.white;

  useHeroSlideshow(SLIDE_COUNT, SLIDE_MS);

  return (
    <section className="hero">
      <HeroBackground slides={heroSlides} activeIndex={heroIndex} />

      <div className="wrap">
        <Tag color={tagColor} className="status-tag">
          {status.text}
        </Tag>
        <h1>Serve. Dink. Smash.</h1>
        <p>
          Paddle Alley is the neighborhood court where you walk in, pick a time, and play. No
          membership, no account.
        </p>
        <HeroFacts facts={facts} />
      </div>
    </section>
  );
}
