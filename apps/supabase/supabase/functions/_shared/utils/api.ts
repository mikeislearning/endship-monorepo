import { ApiResponseParamsType, HTTPStatusCode } from "@libs/schemas";

export const ApiResponse = <T extends object>({
  body,
  responseSchema,
  statusCode = HTTPStatusCode.OK,
}: ApiResponseParamsType<T>) => {
  const responseBody = responseSchema ? responseSchema.parse(body) : body;

  return new Response(JSON.stringify(responseBody), {
    headers: { "Content-Type": "application/json" },
    status: statusCode,
  });
};
