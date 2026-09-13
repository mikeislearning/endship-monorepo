import { z } from "zod";

import { i18n } from "./i18nUtils.ts";

const HTTPStatusSuccessCodes = {
  OK: 200 as const,
  CREATED: 201 as const,
  NO_CONTENT: 204 as const,
};

const HTTPStatusErrorCodes = {
  BAD_REQUEST: 400 as const,
  UNAUTHORIZED: 401 as const,
  FORBIDDEN: 403 as const,
  NOT_FOUND: 404 as const,
  INTERNAL_SERVER_ERROR: 500 as const,
};

export const HTTPStatusCode = {
  ...HTTPStatusSuccessCodes,
  ...HTTPStatusErrorCodes,
};

export type HTTPStatusErrorCodeType =
  (typeof HTTPStatusErrorCodes)[keyof typeof HTTPStatusErrorCodes];

export type HttpStatusCodeType =
  (typeof HTTPStatusCode)[keyof typeof HTTPStatusCode];

export type ApiResponseBodyType = {
  message: string;
  [key: string]: unknown;
};

export type ApiResponseParamsType<T> = {
  body: ApiResponseBodyType;
} & (
  | {
      statusCode: HttpStatusCodeType;
      responseSchema?: never;
    }
  | {
      responseSchema: z.ZodType<T>;
      statusCode?: never;
    }
);

// Common
export const requiredStringSchema = z
  .string({
    error: i18n.t("common:validation.requiredField"),
  })
  .trim()
  .min(1, i18n.t("common:validation.requiredField"));

// Function request and reponses
export const healthCheckResponseSchema = z.object({
  message: z.literal("ok"),
});
export type HealthCheckResponseType = z.infer<typeof healthCheckResponseSchema>;

export const helloWorldRequestSchema = z.object({
  name: requiredStringSchema,
});
export type HelloWorldRequestType = z.infer<typeof helloWorldRequestSchema>;

export const helloWorldResponseSchema = z.object({
  message: z.string(),
});
export type HelloWorldResponseType = z.infer<typeof helloWorldResponseSchema>;

// Edge functions
export enum EdgeFunctionsEnum {
  HealthCheck = "health-check",
  HelloWorld = "hello-world",
}

export type EdgeFunctionOptionsType = {
  [EdgeFunctionsEnum.HealthCheck]: never;
  [EdgeFunctionsEnum.HelloWorld]: {
    body: HelloWorldRequestType;
  };
};

export type EdgeFunctionReturnType = {
  [EdgeFunctionsEnum.HealthCheck]: HealthCheckResponseType;
  [EdgeFunctionsEnum.HelloWorld]: HelloWorldResponseType;
};
