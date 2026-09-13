import { createClient } from "supabase-js";
import { HonoRequest } from "hono";

import { Database } from "@libs/schemas";

const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const supabaseKey = JSON.parse(Deno.env.get("SUPABASE_PUBLISHABLE_KEYS")!)[
  "default"
];
const supabaseSecretKey = JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS")!)[
  "default"
];

export const createStandardClient = (authHeader?: string | null) => {
  let options;

  if (authHeader) {
    options = { global: { headers: { Authorization: authHeader } } };
  }

  return createClient<Database>(supabaseUrl, supabaseKey, options);
};

export const getSupabaseClient = (request: HonoRequest) => {
  return createStandardClient(request.header("Authorization"));
};

export const createPrivilegedClient = () => {
  return createClient<Database>(supabaseUrl, supabaseSecretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });
};
