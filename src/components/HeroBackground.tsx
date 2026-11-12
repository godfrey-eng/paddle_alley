import { cx } from '../utils/classNames';
import type { HeroSlide } from '../types';

interface HeroBackgroundProps {
  slides: HeroSlide[];
  activeIndex: number;
}

const PAN_STYLES = 3; // pan-0, pan-1, pan-2 in hero.css

function getSlideClass(slide: HeroSlide, index: number, activeIndex: number): string {
  return cx('hero-bg', `pan-${index % PAN_STYLES}`, slide.focus, index === activeIndex && 'active');
}

// The stacked slideshow images behind the hero text. Only the active one is visible.
export default function HeroBackground({ slides, activeIndex }: HeroBackgroundProps) {
  return (
    <>
      {slides.map((slide, index) => (
        <img
          key={slide.src}
          src={slide.src}
          alt=""
          aria-hidden="true"
          className={getSlideClass(slide, index, activeIndex)}
        />
      ))}
    </>
  );
}
