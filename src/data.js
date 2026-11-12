const names = [
  'Mika Santos',
  'Carlo Reyes',
  'Bea Lim',
  'Nico Cruz',
  'Ana Dela Cruz',
  'Paolo Garcia',
  'Isabel Tan',
  'Miguel Ramos',
  'Sofia Mendoza',
  'Luis Bautista',
  'Chloe Navarro',
  'Rafael Aquino',
  'Trisha Villanueva',
  'Jose Castillo',
  'Dani Flores',
  'Ken Torres',
  'Hannah Lopez',
  'Marco Diaz',
  'Lia Fernandez',
  'Enzo Rivera',
  'Gia Morales',
  'Theo Soriano',
  'Pia Domingo',
  'Andre Salazar',
]
// [date, start hour, hours]; one court, so no two bookings may overlap
const slots = [
  ['Aug 23', 6, 1],
  ['Aug 23', 8, 1],
  ['Aug 23', 9, 2],
  ['Aug 23', 12, 1],
  ['Aug 23', 14, 2],
  ['Aug 23', 16, 1],
  ['Aug 23', 18, 1],
  ['Aug 23', 20, 1],
  ['Aug 24', 6, 1],
  ['Aug 24', 7, 2],
  ['Aug 24', 10, 1],
  ['Aug 24', 12, 1],
  ['Aug 24', 13, 1],
  ['Aug 24', 16, 2],
  ['Aug 24', 19, 1],
  ['Aug 24', 21, 1],
  ['Aug 25', 6, 1],
  ['Aug 25', 8, 1],
  ['Aug 25', 10, 2],
  ['Aug 25', 13, 1],
  ['Aug 25', 15, 1],
  ['Aug 25', 17, 2],
  ['Aug 25', 20, 1],
  ['Aug 25', 21, 1],
]
const hr = (h) => `${h % 12 || 12}:00`
const ap = (h) => (h < 12 ? 'AM' : 'PM')
const range = (s, e) =>
  ap(s) === ap(e)
    ? `${hr(s)}–${hr(e)} ${ap(e)}`
    : `${hr(s)} ${ap(s)}–${hr(e)} ${ap(e)}`
const clash = (a, b) =>
  a[0] === b[0] && a[1] < b[1] + b[2] && b[1] < a[1] + a[2]
const free = slots.filter((x, i) => !slots.slice(0, i).some((y) => clash(x, y)))

export const rows = free.map(([date, s, h], i) => {
  const ref = `PA-${date === 'Aug 23' ? '0823' : date === 'Aug 24' ? '0824' : '0825'}-${String(s).padStart(2, '0')}00`
  const phone = `0917 ${String(100 + i * 37).padStart(3, '0')} ${String(1000 + i * 811).slice(-4)}`
  const done = i % 2 === 0
  const at = done
    ? `Aug ${Number(date.slice(4)) - 2}, 2026, 10:${10 + i} AM`
    : ''
  return [
    ref,
    names[i],
    phone,
    date,
    range(s, s + h),
    100 * h,
    'Paid',
    done ? 'Confirmed' : 'Confirm',
    i,
    at,
  ]
})