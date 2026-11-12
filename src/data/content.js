import logo from '../assets/logo.jpg';
import sign from '../assets/sign.jpg';
import banner from '../assets/court-banner.jpg';
import wide from '../assets/court-wide.jpg';
import side from '../assets/court-side.jpg';
import net from '../assets/court-net.jpg';
import light from '../assets/court-light.jpg';
import sunset from '../assets/court-sunset.jpg';

export { logo, banner };

// `pos` is the focus point when a tall photo is cropped into the wide hero.
export const heroSlides = [
  { src: wide, pos: 'center' },
  { src: banner, pos: 'center 60%' },
  { src: side, pos: 'center' },
  { src: sign, pos: 'center 40%' },
  { src: sunset, pos: 'center 75%' },
  { src: light, pos: 'center 75%' },
];

export const photos = [
  { src: banner, alt: 'Court with the Paddle Alley banner' },
  { src: net, alt: 'Net and seating area' },
  { src: side, alt: 'Court from the side' },
  { src: light, alt: 'Court under the floodlights' },
  { src: sunset, alt: 'Court in the late afternoon light' },
];

export const facts = [
  { value: '₱200', label: 'per hour' },
  { value: '6AM–11PM', label: 'open daily' },
  { value: '7 days', label: 'a week' },
];

export const faqs = [
  { q: 'Do I need an account to book?', a: 'No. Pick a date and time, add your name, and the court is yours.' },
  { q: 'What should I bring?', a: 'Your paddle and court shoes. Bring your own balls if you have a favorite.' },
  { q: 'Can I cancel or reschedule?', a: 'No Cancellations or Rescheduling allowed.' },
];

