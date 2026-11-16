// Admin table + court settings. Values match the customer site (utils/pricing.ts).
export const COL = { ref: 0, total: 5, payment: 6, status: 7, id: 8, stamp: 9 }
export const HEADS = ['Reference', 'Customer', 'Contact', 'Date', 'Schedule', 'Total', 'Payment', 'Reservation']
export const COURT_FACTS = [
  ['Standard rental rate', '₱100 per hour'],
  ['Booking durations', '1 hr, 2 hrs, 3 hrs or more'],
  ['Operating hours', '6:00 AM – 11:00 PM'],
  ['Maintenance', 'Sundays · 10:00–11:00 PM'],
]
export const PAGINATION = {
  pageSize: 4,
  showSizeChanger: false,
  hideOnSinglePage: true,
  showTotal: (total, [from, to]) => `Showing ${from}–${to} of ${total}`,
}
