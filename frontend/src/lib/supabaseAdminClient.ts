import { createClient } from "@supabase/supabase-js";

// Supabase credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create the client for server-side operations
export const supabaseAdmin = createClient(
  supabaseUrl!,
  supabaseServiceRoleKey!
);