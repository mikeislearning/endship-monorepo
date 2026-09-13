import { zValidator } from "@hono/zod-validator";
import { ValidationTargets } from "hono";
import { z, ZodType } from "zod";

import { HTTPStatusCode } from "@libs/schemas";
import { EdgeFunctionError } from "@/utils/errors.ts";

export const validateRequest = <
  T extends ZodType,
  Target extends keyof ValidationTargets,
>(
  target: Target,
  schema: T,
) =>
  zValidator(target, schema, result => {
    if (!result.success) {
      {
        const errorMessage = z.prettifyError(result.error);

        throw new EdgeFunctionError({
          statusCode: HTTPStatusCode.BAD_REQUEST,
          message: errorMessage,
          details: result.error.issues,
        });
      }
    }
  });
