import type { SiteStatus } from '../types';
import { CLOSE_HOUR, OPEN_HOUR, hourShort } from './pricing';

// Live "open now" status (Philippine time).
export function getStatus(now: Date = new Date()): SiteStatus {
  const hour =
    Number(
      new Intl.DateTimeFormat('en-GB', {
        hour: 'numeric',
        hour12: false,
        timeZone: 'Asia/Manila',
      }).format(now),
    ) % 24;

  return hour >= OPEN_HOUR && hour < CLOSE_HOUR
    ? { open: true, text: `Open now · until ${hourShort(CLOSE_HOUR)}` }
    : { open: false, text: `Closed now · opens ${hourShort(OPEN_HOUR)}` };
}

const pad = (n: number): string => String(n).padStart(2, '0');

// YYYY-MM-DD for today (+offset days), in local time.
export function isoDate(offset = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
