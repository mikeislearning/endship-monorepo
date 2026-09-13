import { assertEquals } from "@test/assert";

import { EdgeFunctionsEnum } from "@libs/schemas";

import { createTestClient, invokeEdgeFunction } from "./_shared/helpers.ts";

Deno.test("Test health check", async () => {
  const client = createTestClient();

  const { data: result, error } = await invokeEdgeFunction({
    client,
    func: EdgeFunctionsEnum.HealthCheck,
    method: "GET",
  });

  if (!result) {
    throw new Error("Invalid response: " + error);
  }

  assertEquals(result.message, "ok");
});
