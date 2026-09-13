import { Context } from "hono";
import { createMiddleware } from "hono/factory";

import {
  abilities,
  ActionsType,
  DBTablesType,
  parseSubjectResource,
} from "@libs/authorization";
import { HTTPStatusCode } from "@libs/schemas";
import { RequestContextType } from "@/middleware/types.ts";
import { EdgeFunctionError } from "@/utils/errors.ts";

type PermissionsParamsType = {
  action: ActionsType;
  subject: DBTablesType;
  getSubjectResource?: (c: Context<RequestContextType>) => Promise<object>;
};

/**
 * Middleware that check permissions with abilities
 *
 * @param action The action being performed (create, read, update, delete)
 * @param subject The resource type being accessed
 * @param getSubjectResource Optional function to extract the specific resource from the request
 */
export const hasRequiredPermissions = ({
  action,
  subject,
  getSubjectResource,
}: PermissionsParamsType) =>
  createMiddleware<RequestContextType>(async (c, next) => {
    // Get user ID and role from the request context (set by auth middleware)
    const userId = c.get("userId");
    const userRole = c.get("userRole");

    // Create ability for the user
    const ability = abilities({
      userId,
      userRole,
    });

    // Get the subject resource if a function is provided
    const subjectResource = getSubjectResource
      ? await getSubjectResource(c)
      : undefined;

    // Check if the user has permission
    const parsedSubject = parseSubjectResource({ subject, subjectResource });

    if (!ability.can(action, parsedSubject)) {
      throw new EdgeFunctionError({
        statusCode: HTTPStatusCode.FORBIDDEN,
        message: "Access Denied: Insufficient Permissions",
        details: {
          action,
          subject,
          userRole,
        },
      });
    }

    await next();
  });

/**
 * Middleware that checks if the user is an admin
 */
export const requireAdmin = createMiddleware<RequestContextType>(
  async (c, next) => {
    const userRole = c.get("userRole");

    if (userRole !== "SUPER_ADMIN" && userRole !== "ADMIN") {
      throw new EdgeFunctionError({
        statusCode: HTTPStatusCode.FORBIDDEN,
        message: "Access Denied: Insufficient Permissions",
      });
    }

    await next();
  },
);
