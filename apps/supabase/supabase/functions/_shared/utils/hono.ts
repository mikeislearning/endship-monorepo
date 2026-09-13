import { Hono } from "hono";

import { HTTPStatusCode, HTTPStatusErrorCodeType } from "@libs/schemas";
import { enableBrowserCors } from "@/middleware/cors.ts";
import { ApiResponse } from "@/utils/api.ts";

type ErrorResponse = Error & {
  statusCode?: HTTPStatusErrorCodeType;
};

export const setupHono = () => {
  const app = new Hono();

  // CORS support for browsers
  app.use(enableBrowserCors);

  // Error handling
  app.onError((err: ErrorResponse, _c) => {
    const { statusCode, message } = err;

    return ApiResponse({
      body: { message: message },
      statusCode: statusCode ?? HTTPStatusCode.INTERNAL_SERVER_ERROR,
    });
  });

  return app;
};
