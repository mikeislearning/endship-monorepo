/* eslint-disable no-console */
import { z } from "zod";

export const envVariablesSchema = z.object({
  EXPO_PUBLIC_ENVIRONMENT: z.enum([
    "local",
    "preview",
    "development",
    "staging",
    "production",
  ]),
  EXPO_PUBLIC_SENTRY_DSN: z.string().optional(),
  EXPO_PUBLIC_SUPABASE_URL: z.url(),
  EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string(),
});

const envToValidate = {
  EXPO_PUBLIC_ENVIRONMENT: process.env.EXPO_PUBLIC_ENVIRONMENT,
  EXPO_PUBLIC_SENTRY_DSN: process.env.EXPO_PUBLIC_SENTRY_DSN,
  EXPO_PUBLIC_SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL,
  EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
    process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
};

const parsed = envVariablesSchema.safeParse(envToValidate);

if (parsed.success === false) {
  console.error(
    "❌ Invalid environment variables:",
    parsed.error.issues,
    `\n❌ Ensure all required environment variables are set correctly in your .env.<ENVIRONMENT> file with the correct format.`,
  );

  throw new Error(
    "Invalid environment variables, Check terminal for more details ",
  );
}

export const envVariables = parsed.data;
