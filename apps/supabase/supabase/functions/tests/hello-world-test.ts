import { assertEquals } from "@test/assert";

import { EdgeFunctionsEnum } from "@libs/schemas";

import {
  createAuthenticatedTestClient,
  invokeEdgeFunction,
} from "./_shared/helpers.ts";

Deno.test("Test hello world", async () => {
  const { client } = await createAuthenticatedTestClient();

  const { data: result, error } = await invokeEdgeFunction({
    client,
    func: EdgeFunctionsEnum.HelloWorld,
    opts: { body: { name: "world" } },
  });

  if (!result) {
    throw new Error("Invalid response: " + JSON.stringify(error));
  }

  assertEquals(result.message, "Hello world!");
});
