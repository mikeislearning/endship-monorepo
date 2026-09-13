//! This function should not removed since it's required
//! to run the CI tests consistently.

import { healthCheckResponseSchema } from "@libs/schemas";
import { initSentry } from "@/services/sentry.ts";
import { ApiResponse } from "@/utils/api.ts";
import { setupHono } from "@/utils/hono.ts";

// Initialize Sentry
initSentry();

// Setup Hono
const app = setupHono();

// Handler
app.get("/health-check", () => {
  return ApiResponse({
    body: { message: "ok" },
    responseSchema: healthCheckResponseSchema,
  });
});

// Serve the handler
Deno.serve(app.fetch);
