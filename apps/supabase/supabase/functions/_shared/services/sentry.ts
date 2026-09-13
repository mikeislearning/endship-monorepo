import * as Sentry from "sentry";

const env = Deno.env.get("SB_ENVIRONMENT");
const sentryDsn = Deno.env.get("SB_SENTRY_DSN");

const initSentry = () => {
  Sentry.init({
    dsn: sentryDsn,
    defaultIntegrations: false,
    environment: env,
    enabled: env !== "local" && env !== "test",
  });

  // Set region and execution_id as custom tags
  Sentry.setTag("region", Deno.env.get("SUPABASE_REGION"));
  Sentry.setTag("execution_id", Deno.env.get("SUPABASE_EXECUTION_ID"));
};

export const logError = (error: Error) => {
  if (env === "local") {
    console.error(error.message);
    return;
  }

  Sentry.captureException(error);
};

export { initSentry, Sentry };
