import { create } from 'zustand'
import { rows } from './data'

const stamp = () =>
  new Date().toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
const reset = { q: '', status: 'All', date: 'All', pg: 0 }

export const useStore = create((set, get) => ({
  page: 'login',
  rows,
  ...reset,
  drawer: false,
  open: true,
  saved: false,
  user: '',
  pass: '',
  error: '',
  put: (patch) => set(patch),
  confirm: (id) =>
    set((st) => ({
      rows: [
        ...st.rows.filter((r) => r[8] !== id),
        ...st.rows
          .filter((r) => r[8] === id)
          .map((r) => [...r.slice(0, 7), 'Confirmed', id, stamp()]),
      ],
    })),
  filter: (patch) => set({ ...patch, pg: 0 }),
  go: (page) => set({ ...reset, page }),
  login: () => {
    const { user, pass } = get()
    set(
      user && pass
        ? { page: 'booking' }
        : { error: 'Enter your username and password.' },
    )
  },
  exportCsv: () => {
    const a = document.createElement('a')
    a.href = URL.createObjectURL(
      new Blob([
        get()
          .rows.map((r) => r.join(','))
          .join('\n'),
      ]),
    )
    a.download = 'history.csv'
    a.click()
  },
}))