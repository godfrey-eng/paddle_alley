import { create } from 'zustand'
import { nowIso } from './admin-bookings'
import { confirmOnServer } from './utils/api'
import { getSettings } from './utils/pricing'
import { saveSettings } from './utils/settings'
import { hasAdminSession, signInAdmin, signOutAdmin } from './utils/auth'

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
  busy: false,
  login: async () => {
    const { user, pass } = get()
    if (!user.trim() || !pass) return set({ error: 'Enter your email and password.' })
    set({ busy: true, error: '' })
    const problem = await signInAdmin(user.trim(), pass)
    if (problem) return set({ busy: false, error: problem })
    set({ busy: false, page: 'booking', pass: '', error: '' })
  },
  logout: async () => {
    await signOutAdmin()
    set({ ...reset, page: 'login', user: '', pass: '', error: '' })
  },
  checkSession: async () => {
    if (await hasAdminSession()) set({ page: 'booking' })
  },
}))