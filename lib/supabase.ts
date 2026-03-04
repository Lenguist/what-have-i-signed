import { createClient } from "@supabase/supabase-js";

// Fallback placeholders allow the build to succeed without env vars set locally.
// Real values must be set in .env.local (dev) or Vercel environment (production).
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "placeholder-anon-key";
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? "placeholder-service-key";

// Client for browser / client components
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client for server-side API routes (uses service role key)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Verify a JWT from the extension and return the user
export async function getUserFromToken(token: string) {
  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data.user) return null;
  return data.user;
}
