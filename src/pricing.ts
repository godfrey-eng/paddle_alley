import dayjs from 'dayjs';

export const COURT = 'Paddle Alley ';
export const HOURLY_RATE = 200; // pesos per hour played
export const OPEN_HOUR = 6; // 6 AM (24-hour clock)
export const CLOSE_HOUR = 23; // 11 PM (24-hour clock)
export const DATE_KEY = 'YYYY-MM-DD';

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