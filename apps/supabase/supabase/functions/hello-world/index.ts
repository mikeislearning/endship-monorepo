// Template function to demonstrate how to structure edge function + test
// Remove when actual functions are added
import {
  helloWorldRequestSchema,
  helloWorldResponseSchema,
} from "@libs/schemas";
import { requireAuthenticatedUser } from "@/middleware/authentication.ts";
import { validateRequest } from "@/middleware/validation.ts";
import { initSentry } from "@/services/sentry.ts";
import { ApiResponse } from "@/utils/api.ts";
import { setupHono } from "@/utils/hono.ts";

// Initialize Sentry
initSentry();

// Setup Hono
const app = setupHono();

app.use(requireAuthenticatedUser);

// Handler
app.post(
  "/hello-world",
  validateRequest("json", helloWorldRequestSchema),
  c => {
    const { name } = c.req.valid("json");

    return ApiResponse({
      body: { message: `Hello ${name}!` },
      responseSchema: helloWorldResponseSchema,
    });
  },
);

// Serve the handler
Deno.serve(app.fetch);
