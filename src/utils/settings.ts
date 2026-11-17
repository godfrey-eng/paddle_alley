import { supabase } from '../utils/supabase';
import { DEFAULT_SETTINGS, applySettings } from './pricing';
import type { CourtSettings } from './pricing';

const ROW_ID = 'court';

// Returns a message for the first problem found, or null if the settings are fine.
export function validSettings(s: CourtSettings): string | null {
  if (!Number.isInteger(s.hourlyRate) || s.hourlyRate < 1) {
    return 'The hourly rate must be a whole number above 0.';
  }
  if (!Number.isInteger(s.openHour) || s.openHour < 0 || s.openHour > 23) {
    return 'The opening time must be between 12 AM and 11 PM.';
  }
  if (!Number.isInteger(s.closeHour) || s.closeHour <= s.openHour || s.closeHour > 24) {
    return 'The closing time must be after the opening time.';
  }
  return null;
}

// Loads the saved settings and applies them. Falls back to the defaults on any failure.
export async function loadSettings(): Promise<void> {
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('value')
      .eq('id', ROW_ID)
      .maybeSingle();
    if (error) throw error;

    const saved = data?.value as CourtSettings | undefined;
    if (saved && validSettings(saved) === null) {
      applySettings(saved);
      return;
    }
    if (saved) console.warn('Saved court settings are invalid; using defaults.');
  } catch (err) {
    console.warn('Could not load court settings; using defaults.', err);
  }
  applySettings(DEFAULT_SETTINGS);
}

// Saves the settings for everyone and applies them in this browser.
export async function saveSettings(s: CourtSettings): Promise<void> {
  const problem = validSettings(s);
  if (problem) throw new Error(problem);

  const { error } = await supabase
    .from('settings')
    .upsert({ id: ROW_ID, value: s, updated_at: new Date().toISOString() });
  if (error) throw error;

  applySettings(s);
}
