import { supabase } from '../utils/supabase';
import type { Booking } from '../store/useAdStore';

const KEEP_MS = 14 * 24 * 60 * 60 * 1000;

const fromDb = (r: any): Booking => ({
  reference: r.reference,
  name: r.name,
  contact: r.contact,
  date: r.date,
  start: r.start ?? undefined,
  hours: Number(r.hours),
  total: Number(r.total),
  wallet: r.wallet ?? undefined,
});

export const fetchBookings = async (): Promise<Booking[]> => {
  const since = new Date(Date.now() - KEEP_MS).toISOString();
  const { data, error } = await supabase.from('bookings').select('*').gte('created_at', since).order('created_at');
  if (error) throw error;
  return data.map(fromDb);
};

export const saveBooking = async (b: Booking) => {
  if (!supabase) return;
  const { reference, name, contact, date, start, hours, total, wallet } = b;
  const { error } = await supabase.from('bookings').upsert(
    { reference, name, contact, date, start, hours, total, wallet },
    { onConflict: 'reference', ignoreDuplicates: true },
  );
  if (error) console.error('Supabase save failed:', error.message, error.details);
};

export const confirmOnServer = async (reference: string | number) => {
  if (!supabase) return;
  const { error } = await supabase
    .from('bookings')
    .update({ confirmed_at: new Date().toISOString() })
    .eq('reference', String(reference));
  if (error) console.error('Supabase confirm failed:', error.message);
};