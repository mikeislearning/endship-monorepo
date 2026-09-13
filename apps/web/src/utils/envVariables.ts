import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const envVariables = createEnv({
  clientPrefix: "VITE_",
  client: {
    VITE_SUPABASE_URL: z.url(),
    VITE_SUPABASE_PUBLISHABLE_KEY: z.string(),
    VITE_SENTRY_DSN: z.url().optional(),
    VITE_ENVIRONMENT: z.union([
      z.literal("local"),
      z.literal("preview"),
      z.literal("development"),
      z.literal("staging"),
      z.literal("production"),
    ]),
  },
  runtimeEnv: import.meta.env,
  emptyStringAsUndefined: true,
});
