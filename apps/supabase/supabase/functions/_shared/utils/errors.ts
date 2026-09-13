import { HTTPStatusErrorCodeType } from "@libs/schemas";

export type EdgeFunctionErrorType = {
  statusCode: HTTPStatusErrorCodeType;
  message: string;
  // deno-lint-ignore no-explicit-any
  details?: any;
};

export class EdgeFunctionError extends Error {
  statusCode: HTTPStatusErrorCodeType;
  details?: Record<string, unknown>;

  constructor({ statusCode, message, details }: EdgeFunctionErrorType) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, EdgeFunctionError);
    }

    this.statusCode = statusCode;
    this.details = details;
  }
}
