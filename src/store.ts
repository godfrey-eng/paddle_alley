import { useSyncExternalStore } from 'react';
import dayjs from 'dayjs';
import { priceOf } from './pricing';

/**
 * Tiny shared store (React's useSyncExternalStore), so the whole booking flow
 * works without useState. Confirmed bookings are kept in localStorage; swap
 * `bookings` / `confirmBooking` / `findBooking` for your API when ready.
 */
export type Tab = 'reserve' | 'find';
export type Step = 1 | 2 | 3 | 4;

export interface Booking {
  reference: string;
  name: string;
  contact: string;
  date: string; // YYYY-MM-DD
  start: number; // start hour, e.g. 9 or 13
  hours: number; // 0.5 | 1 | 2 | 3
  total: number;
  wallet: string;
}

interface State {
  tab: Tab;
  step: Step;
  date?: string;
  start?: number;
  hours: number;
  name: string;
  contact: string;
  wallet?: string; 
  current?: Booking; 
  found?: Booking | null; 
  bookings: Booking[];
}

const KEY = 'paddle-alley:bookings';
const load = (): Booking[] => {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]');
  } catch {
    return [];
  }
};

let state: State = { tab: 'reserve', step: 1, hours: 1, name: '', contact: '', bookings: load() };
const listeners = new Set<() => void>();

export const getState = () => state;
const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
export const useBooking = () => useSyncExternalStore(subscribe, getState, getState);

export const update = (patch: Partial<State>) => {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
};

export const setTab = (tab: Tab) => update({ tab, found: undefined });

export const reset = () =>
  update({ step: 1, date: undefined, start: undefined, hours: 1, name: '', contact: '', wallet: undefined, current: undefined });

export const confirmBooking = (wallet: string) => {
  const { date, start, hours, name, contact, bookings } = state;
  if (!date || start === undefined || missingInfo(state).length) return; // never confirm an incomplete booking
  const booking: Booking = {
    reference: `PA-${dayjs(date).format('YYMMDD')}-${Math.floor(1000 + Math.random() * 9000)}`,
    name,
    contact,
    date,
    start,
    hours,
    total: priceOf(hours),
    wallet,
  };
  const next = [...bookings, booking];
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
  
  }
  update({ bookings: next, current: booking, step: 4 });
};

const PHONE = /^(09|\+639)\d{9}$/;
export const validContact = (contact: string) => PHONE.test(contact.replace(/\s/g, ''));

export const missingInfo = (s: Pick<State, 'date' | 'start' | 'name' | 'contact'>): string[] => [
  ...(s.date ? [] : ['date']),
  ...(s.start === undefined ? ['time'] : []),
  ...(s.name.trim() ? [] : ['full name']),
  ...(validContact(s.contact) ? [] : ['valid contact number']),
];

const normalize = (phone: string) => phone.replace(/\D/g, '').replace(/^63/, '0');

export const findBooking = (reference: string, contact: string): Booking | undefined =>
  state.bookings.find(
    (b) =>
      b.reference.toLowerCase() === reference.trim().toLowerCase() &&
      normalize(b.contact) === normalize(contact),
  );