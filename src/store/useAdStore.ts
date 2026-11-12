import { create } from 'zustand';
import dayjs from 'dayjs';
import { isoDate } from '../utils/time';
import { priceOf } from '../utils/pricing';

export type Tab = 'reserve' | 'find';
export type Step = 1 | 2 | 3 | 4;

export interface Booking {
  reference: string;
  name: string;
  contact: string;
  date: string; // YYYY-MM-DD
  start?: number; // start hour, e.g. 9 or 13
  slot?: string | null; // legacy compatibility
  hours: number;
  total: number;
  wallet?: string;
}

export interface AdState {
  // Home / Carousel state
  heroIndex: number;
  bookingOpen: boolean;
  adminOpen: boolean;
  
  // Booking Flow state
  tab: Tab;
  step: Step;
  date: string;
  start?: number;
  hours: number;
  name: string;
  contact: string;
  wallet?: string;
  current?: Booking;
  found?: Booking | null;
  bookings: Booking[];

  // Actions
  goHero: (index: number, count: number) => void;
  nextHero: (count: number) => void;
  openBooking: () => void;
  closeBooking: () => void;
  openAdmin: () => void;
  closeAdmin: () => void;
  setTab: (tab: Tab) => void;
  update: (patch: Partial<AdState>) => void;
  reset: () => void;
  confirmBooking: (walletName: string) => void;
  findBooking: (reference: string, contact: string) => Booking | undefined;
}

const KEY = 'paddle-alley:bookings';
const loadBookings = (): Booking[] => {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]');
  } catch {
    return [];
  }
};

const PHONE = /^(09|\+639)\d{9}$/;
export const validContact = (contact: string) => PHONE.test(contact.replace(/\s/g, ''));

export const missingInfo = (s: Pick<AdState, 'date' | 'start' | 'name' | 'contact'>): string[] => [
  ...(s.date ? [] : ['date']),
  ...(s.start === undefined ? ['time'] : []),
  ...(s.name.trim() ? [] : ['full name']),
  ...(validContact(s.contact) ? [] : ['valid contact number']),
];

const normalizePhone = (phone: string) => phone.replace(/\D/g, '').replace(/^63/, '0');

export const useAdStore = create<AdState>()((set, get) => ({
  heroIndex: 0,
  bookingOpen: false,
  adminOpen: false,
  tab: 'reserve',
  step: 1,
  date: isoDate(0),
  hours: 1,
  name: '',
  contact: '',
  bookings: loadBookings(),

  goHero: (index, count) => set({ heroIndex: ((index % count) + count) % count }),
  nextHero: (count) => get().goHero(get().heroIndex + 1, count),

  openBooking: () => set({ bookingOpen: true }),
  closeBooking: () => set({ bookingOpen: false }),
  openAdmin: () => set({ adminOpen: true }),
  closeAdmin: () => set({ adminOpen: false }),
  setTab: (tab) => set({ tab, found: undefined }),

  update: (patch) => set((state) => ({ ...state, ...patch })),

  reset: () =>
    set({
      step: 1,
      date: isoDate(0),
      start: undefined,
      hours: 1,
      name: '',
      contact: '',
      wallet: undefined,
      current: undefined,
    }),

  confirmBooking: (walletName: string) => {
    const { date, start, hours, name, contact, bookings } = get();
    if (!date || start === undefined || missingInfo({ date, start, name, contact }).length) return;

    const booking: Booking = {
      reference: `PA-${dayjs(date).format('YYMMDD')}-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      contact,
      date,
      start,
      hours,
      total: priceOf(hours),
      wallet: walletName,
    };

    const next = [...bookings, booking];
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}

    set({ bookings: next, current: booking, step: 4 });
  },

  findBooking: (reference: string, contact: string): Booking | undefined => {
    const { bookings } = get();
    return bookings.find(
      (b) =>
        b.reference.toLowerCase() === reference.trim().toLowerCase() &&
        normalizePhone(b.contact) === normalizePhone(contact),
    );
  },
}));

// Selectors for optimized re-renders
export const selectHeroIndex = (s: AdState) => s.heroIndex;
export const selectNextHero = (s: AdState) => s.nextHero;
export const selectBookingOpen = (s: AdState) => s.bookingOpen;
export const selectBookingCount = (s: AdState) => s.bookings.length;
export const selectOpenBooking = (s: AdState) => s.openBooking;
export const selectCloseBooking = (s: AdState) => s.closeBooking;