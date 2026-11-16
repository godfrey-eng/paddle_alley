import dayjs from 'dayjs';

export const COURT = 'Paddle Alley ';
export const DATE_KEY = 'YYYY-MM-DD';

export interface CourtSettings {
  hourlyRate: number; // pesos per hour played
  openHour: number; // 0-23, 24-hour clock
  closeHour: number; // 1-24, the hour the court closes
}

// Used only if the saved settings cannot be loaded.
export const DEFAULT_SETTINGS: CourtSettings = { hourlyRate: 200, openHour: 6, closeHour: 23 };

// Live values. loadSettings() calls applySettings() before the app renders,
// so every page reads the same numbers. Edited from the admin Court page.
export let HOURLY_RATE = DEFAULT_SETTINGS.hourlyRate;
export let OPEN_HOUR = DEFAULT_SETTINGS.openHour;
export let CLOSE_HOUR = DEFAULT_SETTINGS.closeHour;

export function applySettings(s: CourtSettings): void {
  HOURLY_RATE = s.hourlyRate;
  OPEN_HOUR = s.openHour;
  CLOSE_HOUR = s.closeHour;
}

export const getSettings = (): CourtSettings => ({
  hourlyRate: HOURLY_RATE,
  openHour: OPEN_HOUR,
  closeHour: CLOSE_HOUR,
});

// "6 AM", "11 PM", "12 AM" for the short labels on the site.
export const hourShort = (h: number): string => `${h % 12 || 12} ${h % 24 < 12 ? 'AM' : 'PM'}`;

// "6:00 AM", "11:00 PM" for the full hours.
export const clockLabel = (h: number): string => `${h % 12 || 12}:00 ${h % 24 < 12 ? 'AM' : 'PM'}`;

export const priceOf = (hours: number) => HOURLY_RATE * hours;

export const peso = (n: number, cents = true) =>
  `₱${n.toLocaleString('en-PH', {
    minimumFractionDigits: cents ? 2 : 0,
    maximumFractionDigits: cents ? 2 : 0,
  })}`;

export const hourLabel = (h: number) =>
  dayjs().startOf('day').add(h * 60, 'minute').format('h:mm A');

export const timeRange = (start: number, hours: number) =>
  `${hourLabel(start)} – ${hourLabel(start + hours)}`;

export const durationLabel = (hours: number) => `${hours} ${hours === 1 ? 'hour' : 'hours'}`;