import dayjs from 'dayjs';
import { timeRange } from './utils/pricing';

// Column order used by the admin tables (see COL in components/AdminControl.jsx).
// Index 10 is hidden: the confirmation time in ISO form, used for sorting History.
const STAMP_FORMAT = 'MMM D, YYYY, h:mm A';
export const nowIso = () => new Date().toISOString();
const shownStamp = (iso) => dayjs(iso).format(STAMP_FORMAT);

// A confirmation saved on the booking server (set by confirmOnServer) also counts.
const serverStamp = (b) => (b.confirmedAt ? new Date(b.confirmedAt).toISOString() : '')

// Turns a booking from the public site into one admin table row.
// id = the booking reference, which is what Confirm uses.
function bookingToRow(booking, confirmed) {
  const id = booking.reference;
  const iso = confirmed[id] ?? serverStamp(booking)
  return [
    booking.reference,
    booking.name,
    booking.contact,
    dayjs(booking.date).format('MMM D'),
    booking.start === undefined ? '—' : timeRange(booking.start, booking.hours),
    booking.total,
    'Paid',
    iso ? 'Confirmed' : 'Confirm',
    id,
    iso ? shownStamp(iso) : '',
    iso,
  ];
}

// History: most recent confirmation first.
export const newestConfirmedFirst = (rows) =>
  [...rows].sort((a, b) => String(b[10] ?? '').localeCompare(String(a[10] ?? '')));

// Real bookings only, newest on top.
export const buildAdminRows = (bookings, confirmed) =>
  [...bookings].reverse().map((b) => bookingToRow(b, confirmed))