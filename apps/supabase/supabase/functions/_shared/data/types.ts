import { SupabaseClient } from "supabase-js";

import { Database } from "@libs/schemas";

export type SupabaseClientType = SupabaseClient<Database>;
