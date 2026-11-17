import { supabase } from '../utils/supabase';

// The only account allowed to use the admin. Must match the email in the SQL policies.
export const ADMIN_EMAIL = 'admin@gmail.com';

const friendly = (message: string): string => {
  if (/invalid login credentials/i.test(message)) return 'Wrong email or password.';
  if (/email not confirmed/i.test(message)) return 'This account has not been confirmed yet.';
  return 'Could not sign in. Please try again.';
};

// Returns an error message, or null when the sign-in worked.
export async function signInAdmin(email: string, password: string): Promise<string | null> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return friendly(error.message);
  if (data.user?.email !== ADMIN_EMAIL) {
    await supabase.auth.signOut();
    return 'This account is not allowed to use the admin.';
  }
  return null;
}

export async function signOutAdmin(): Promise<void> {
  await supabase.auth.signOut();
}

// True when a saved session belongs to the admin (used when the page reloads).
export async function hasAdminSession(): Promise<boolean> {
  const { data } = await supabase.auth.getSession();
  return data.session?.user?.email === ADMIN_EMAIL;
}
