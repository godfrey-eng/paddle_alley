import logo from '../assets/logo.jpg';
import sign from '../assets/sign.jpg';
import banner from '../assets/court-banner.jpg';
import wide from '../assets/court-wide.jpg';
import side from '../assets/court-side.jpg';
import net from '../assets/court-net.jpg';
import light from '../assets/court-light.jpg';
import sunset from '../assets/court-sunset.jpg';
import type { CourtDetail, Fact, FaqEntry, HeroSlide, Photo } from '../types';
import { CLOSE_HOUR, HOURLY_RATE, OPEN_HOUR, clockLabel, hourShort, peso } from '../utils/pricing';

export { logo, banner };

// `focus` is the crop point when a tall photo is shown in the wide hero.
// The matching classes live in hero-slides.css.
export const heroSlides: HeroSlide[] = [
  { src: wide, focus: 'focus-center' },
  { src: banner, focus: 'focus-60' },
  { src: side, focus: 'focus-center' },
  { src: sign, focus: 'focus-40' },
  { src: sunset, focus: 'focus-75' },
  { src: light, focus: 'focus-75' },
];

export const photos: Photo[] = [
  { src: banner, alt: 'Court with the Paddle Alley banner' },
  { src: net, alt: 'Net and seating area' },
  { src: side, alt: 'Court from the side' },
  { src: light, alt: 'Court under the floodlights' },
  { src: sunset, alt: 'Court in the late afternoon light' },
];

export const facts: Fact[] = [
  { value: peso(HOURLY_RATE, false), label: 'per hour' },
  { value: `${hourShort(OPEN_HOUR).replace(' ', '')}–${hourShort(CLOSE_HOUR).replace(' ', '')}`, label: 'open daily' },
  { value: '7 days', label: 'a week' },
];

export const courtDetails: CourtDetail[] = [
  { icon: 'clock', label: 'Operating hours', value: `${clockLabel(OPEN_HOUR)} – ${clockLabel(CLOSE_HOUR)}` },
  { icon: 'grid', label: 'Standard rate', value: `${peso(HOURLY_RATE, false)} / hour` },
];

export const faqs: FaqEntry[] = [
  {
    q: 'Do I need an account to book?',
    a: 'No. Pick a date and time, add your name, and the court is yours.',
  },
  {
    q: 'What should I bring?',
    a: 'Your paddle and court shoes. Bring your own balls if you have a favorite.',
  },
  {
    q: 'Can I cancel or reschedule?',
    a: 'No Cancellations or Rescheduling allowed.',
  },
];
