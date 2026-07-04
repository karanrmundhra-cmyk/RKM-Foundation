// lib/supabase-browser.ts — the donor-portal client (4D · M3). Uses the PUBLIC
// anon key (safe to ship: RLS grants authenticated users only their own rows;
// the anon role has no policies at all). Env vars override for other envs.
"use client";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://rnwifjrdhdhemrlmgjij.supabase.co";
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJud2lmanJkaGRoZW1ybG1namlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4NDM4MjAsImV4cCI6MjA5NjQxOTgyMH0.cSn10Njlt0Hp0su4sORDwW18XtCpFLp9SC8Qf3DihJo";

let _client: SupabaseClient | null = null;
export function supabaseBrowser(): SupabaseClient {
  if (!_client) _client = createClient(URL, ANON, { auth: { persistSession: true, autoRefreshToken: true } });
  return _client;
}
