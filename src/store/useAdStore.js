import { create } from 'zustand';
import { isoDate } from '../utils/time';

// Shared state: hero slideshow + the booking flow used by every Reserve / Book button.
export const useAdStore = create((set, get) => ({
  heroIndex: 0,
  bookingOpen: false,
  date: isoDate(0),
  slot: null,
  name: '',
  bookings: [],

  goHero: (i, n) => set({ heroIndex: ((i % n) + n) % n }),

  openBooking: () => set({ bookingOpen: true }),
  closeBooking: () => set({ bookingOpen: false }),
  setDate: (date) => set({ date, slot: null }),
  setSlot: (slot) => set({ slot }),
  setName: (name) => set({ name }),

  confirmBooking: () => {
    const { date, slot, name, bookings } = get();
    set({
      bookings: [...bookings, { date, slot, name }],
      bookingOpen: false, date: isoDate(0), slot: null, name: '',
    });
  },
}));
