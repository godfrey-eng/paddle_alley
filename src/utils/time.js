// Live "open now" status (Philippine time) and date helpers.
export function getStatus(now = new Date()) {
  const hour = Number(new Intl.DateTimeFormat('en-GB', {
    hour: 'numeric', hour12: false, timeZone: 'Asia/Manila',
  }).format(now)) % 24;
  return hour >= 6 && hour < 22
    ? { open: true, text: 'Open now · until 11 PM' }
    : { open: false, text: 'Closed now · opens 6 AM' };
}

// YYYY-MM-DD for today (+offset days), in local time.
export function isoDate(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}
