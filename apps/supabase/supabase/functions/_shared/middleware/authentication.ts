import { createMiddleware } from "hono/factory";

import { UserRoleType } from "@libs/authorization";
import { HTTPStatusCode } from "@libs/schemas";
import { getAuthUser } from "@/data/auth.ts";
import { RequestContextType } from "@/middleware/types.ts";
import { getSupabaseClient } from "@/services/supabase.ts";
import { EdgeFunctionError } from "@/utils/errors.ts";

const supabaseSecretKey = JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS")!)[
  "default"
];

/**
 * Middleware that checks if a valid authorization token is present from an
 * authenticated user. If an authenticated user is found,
 * the userId is attached to the request context.
 */
export const requireAuthenticatedUser = createMiddleware<RequestContextType>(
  async (c, next) => {
    const authorizationHeader = c.req.header("Authorization");
    const token = authorizationHeader?.replace(/^Bearer\s+/i, "");

    if (!token) {
      throw new EdgeFunctionError({
        statusCode: HTTPStatusCode.UNAUTHORIZED,
        message: "Missing authentication token",
      });
    }

    const supabaseClient = getSupabaseClient(c.req);
    const authUser = await getAuthUser(supabaseClient);

    c.set("userId", authUser.id);
    c.set("userRole", authUser.app_metadata.role as UserRoleType);

    await next();
  },
);

/**
 * Middleware that checks for a secret key in the request header to allow internal
 * calls from pg_net.
 */
export const requireFunctionSecret = createMiddleware<RequestContextType>(
  async (c, next) => {
    const functionSecret = c.req.header("x-function-secret") ?? "";

    if (!functionSecret || functionSecret !== supabaseSecretKey) {
      throw new EdgeFunctionError({
        statusCode: HTTPStatusCode.UNAUTHORIZED,
        message: "Access Denied: Invalid Function Secret",
      });
    }

    await next();
  },
);
