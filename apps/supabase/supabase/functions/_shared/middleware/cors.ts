import { createMiddleware } from "hono/factory";

import { HTTPStatusCode } from "@libs/schemas";

export const enableBrowserCors = createMiddleware(async (c, next) => {
  c.res.headers.set("Access-Control-Allow-Origin", "*");
  c.res.headers.set(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS",
  );
  c.res.headers.set(
    "Access-Control-Allow-Headers",
    "authorization, x-client-info, apikey, content-type",
  );

  if (c.req.method === "OPTIONS") {
    return c.body(null, HTTPStatusCode.NO_CONTENT);
  }

  await next();
});
