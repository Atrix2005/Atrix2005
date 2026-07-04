import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// A single browser/client Supabase instance, created only when the public
// env vars are present. Everything in the app falls back to mock data when
// this is null, so the demo runs with zero configuration.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(url && anonKey)

let client: SupabaseClient | null = null

export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null
  if (!client) {
    client = createClient(url as string, anonKey as string, {
      auth: { persistSession: false },
    })
  }
  return client
}
