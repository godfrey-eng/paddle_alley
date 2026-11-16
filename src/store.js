import { create } from 'zustand'
import { nowIso } from './admin-bookings'
import { confirmOnServer } from './utils/api'
import { getSettings } from './utils/pricing'
import { saveSettings } from './utils/settings'

// Staff confirmations: reference -> stamp. Saved in this browser.
const CONFIRMED_KEY = 'paddle-alley:confirmed'
const loadConfirmed = () => {
  try {
    return JSON.parse(localStorage.getItem(CONFIRMED_KEY) ?? '{}')
  } catch {
    return {}
  }
}
const reset = { q: '', status: 'All', date: 'All', pg: 0 }

export const useStore = create((set, get) => ({
  page: 'login',
  confirmed: loadConfirmed(),
  ...reset,
  drawer: false,
  open: true,
  saved: false,
  user: '',
  pass: '',
  error: '',
  courtDraft: null, // the court settings being edited on the Court page
  courtError: '',
  courtSaving: false,
  put: (patch) => set(patch),
  initCourtDraft: () => set({ courtDraft: getSettings(), courtError: '', saved: false }),
  setCourtField: (key, value) =>
    set((st) => ({ courtDraft: { ...st.courtDraft, [key]: Number(value) }, saved: false })),
  saveCourt: async () => {
    set({ courtSaving: true, courtError: '' })
    try {
      await saveSettings(get().courtDraft)
      set({ saved: true, courtSaving: false })
    } catch (err) {
      set({ courtError: err.message || 'Could not save. Please try again.', courtSaving: false })
    }
  },
  confirm: (id) => {
    const confirmed = { ...get().confirmed, [String(id)]: nowIso() }
    try {
      localStorage.setItem(CONFIRMED_KEY, JSON.stringify(confirmed))
    } catch {}
    set({ confirmed })
    confirmOnServer(id)
  },
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
}))