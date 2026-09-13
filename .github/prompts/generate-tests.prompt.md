---
agent: agent
---

# Generate Edge Function Tests

Generate comprehensive test files for Supabase edge functions following the established patterns in this monorepo.

## Context Required

Before generating tests, I need:

1. **Edge function path**: Path to the function's `index.ts` (e.g., `apps/supabase/supabase/functions/hello-world/index.ts`)
   - The folder name is the function name in kebab-case (e.g., `hello-world`)
   - This must match the corresponding `EdgeFunctionsEnum` value
2. **HTTP method**: `GET`, `POST`, `PUT`, `DELETE` — determines how to invoke the function
3. **Request/Response schemas**: The Zod schemas defined in `@libs/schemas` (in `libs/schemas/src/appSchemas.ts`)

## Key Infrastructure

### Test Helpers (`tests/_shared/helpers.ts`)

- **`createTestClient(options?)`** — Unauthenticated Supabase client using `SB_URL` + `SB_PUBLISHABLE_KEY`
- **`createPrivilegedTestClient()`** — Service-role client using `SB_SECRET_KEY` (bypasses RLS)
- **`createAuthenticatedTestClient(email?)`** — Signs in as `test.user@mindsea.com` / `password123`, returns `{ client, user }` with Bearer token set
- **`invokeEdgeFunction({ client, func, opts, method })`** — Type-safe function invocation using `EdgeFunctionsEnum`, `EdgeFunctionOptionsType`, `EdgeFunctionReturnType`. Parses error response JSON on failure.
- **`cleanUpResources({ client, resources })`** — Cleanup helper for deleting test records by table + id or composite key

### Type-Safe Invocation

`invokeEdgeFunction` is fully typed via mapped types in `@libs/schemas`:

- `EdgeFunctionsEnum` — Enum of all function names (e.g., `HelloWorld = "hello-world"`)
- `EdgeFunctionOptionsType` — Maps each function to its invoke options (body, headers, etc.)
- `EdgeFunctionReturnType` — Maps each function to its response type

### Environment

Tests run via `deno test` with `--env=../../../../.env.test` which provides:

- `SB_URL` — Local Supabase API URL
- `SB_PUBLISHABLE_KEY` — Publishable API key
- `SB_SECRET_KEY` — Secret API key (service role)

### Assertions

Tests use `@std/assert` (imported as `@test/assert`):

- `assertEquals(actual, expected)` — Strict equality
- `assertExists(value)` — Value is not null/undefined
- `assertRejects(fn)` — Async function throws

## File to Generate

Create one test file per edge function:

**Location**: `apps/supabase/supabase/functions/tests/{function-name}-test.ts`

### Authenticated Function Test Template

For functions using `requireAuthenticatedUser` middleware:

````typescript
import { assertEquals } from "@test/assert";

import { EdgeFunctionsEnum } from "@libs/schemas";

import {
  createAuthenticatedTestClient,
  invokeEdgeFunction,
} from "./_shared/helpers.ts";

Deno.test("{functionName} should {expected behavior}", async () => {
  const { client } = await createAuthenticatedTestClient();

  const { data: result, error } = await invokeEdgeFunction({
    client,
    func: EdgeFunctionsEnum.{FunctionEnum},
    opts: { body: { /* request params from schema */ } },
  });

  if (!result) {
    throw new Error("Invalid response: " + JSON.stringify(error));
  }

  assertEquals(result.{field}, {expectedValue});
});

### Mutation Function Test Template

For functions that create, update, or delete database records:

```typescript
import { assertEquals, assertExists } from "@test/assert";

import { EdgeFunctionsEnum } from "@libs/schemas";

import {
  cleanUpResources,
  createAuthenticatedTestClient,
  createPrivilegedTestClient,
  invokeEdgeFunction,
} from "./_shared/helpers.ts";

Deno.test("{functionName} should create a {entity}", async () => {
  const { client } = await createAuthenticatedTestClient();

  const { data: result, error } = await invokeEdgeFunction({
    client,
    func: EdgeFunctionsEnum.{FunctionEnum},
    opts: {
      body: {
        /* request params from schema */
      },
    },
  });

  if (!result) {
    throw new Error("Invalid response: " + JSON.stringify(error));
  }

  assertExists(result.id);
  assertEquals(result.{field}, {expectedValue});

  // Verify database state using privileged client (bypasses RLS)
  const adminClient = createPrivilegedTestClient();
  const { data: dbRecord } = await adminClient
    .from("{table_name}")
    .select("*")
    .eq("id", result.id)
    .single();

  assertExists(dbRecord);
  assertEquals(dbRecord.{field}, {expectedValue});

  // Cleanup
  await cleanUpResources({
    client: adminClient,
    resources: [{ table: "{table_name}", id: result.id }],
  });
});
```

## Test Patterns by Function Type

| Function Type      | Auth Client                         | HTTP Method     | Verify DB State                         | Cleanup                       |
| ------------------ | ----------------------------------- | --------------- | --------------------------------------- | ----------------------------- |
| Read (query)       | `createAuthenticatedTestClient()`   | `GET` or `POST` | No                                      | No                            |
| Create (mutation)  | `createAuthenticatedTestClient()`   | `POST`          | Yes, via `createPrivilegedTestClient()` | Yes, via `cleanUpResources()` |
| Update (mutation)  | `createAuthenticatedTestClient()`   | `POST`          | Yes, via `createPrivilegedTestClient()` | Restore original if needed    |
| Delete (mutation)  | `createAuthenticatedTestClient()`   | `POST`          | Yes, confirm record removed             | No (already deleted)          |
| Public (no auth)   | `createTestClient()`                | `GET`           | No                                      | No                            |
| Trigger (internal) | N/A — use `x-trigger-secret` header | `POST`          | Depends                                 | Depends                       |

## Best Practices

### Test Data Setup

- Use seed data (from `supabase/seeds/`) for read-only tests where possible
- For mutation tests, create test data via `createPrivilegedTestClient()` direct DB inserts — **NOT** by calling other edge functions
- Always clean up created records after mutation tests using `cleanUpResources()`
- Use realistic but clearly fake test data

### Test Naming

- Format: `"{function-name} should {expected behavior}"`
- Examples:
  - `"hello-world should return a greeting with the provided name"`
  - `"create-client should create a new client record"`

### Schemas

When adding a new edge function, ensure `libs/schemas/src/appSchemas.ts` has:

1. The function name added to `EdgeFunctionsEnum`
2. Request and response Zod schemas defined and exported
3. The function mapped in both `EdgeFunctionOptionsType` and `EdgeFunctionReturnType`

### Running Tests

```bash
# Run all edge function tests
pnpm in:supabase fn:test

# Prerequisite: local Supabase must be running
pnpm in:supabase sb:start
```

## Checklist

Before completing, ensure:

- [ ] Test file created at `apps/supabase/supabase/functions/tests/{function-name}-test.ts`
- [ ] Happy path tests cover all function behaviors
- [ ] Mutation tests verify database state and clean up created records
- [ ] Correct `EdgeFunctionsEnum` value used in `invokeEdgeFunction`
- [ ] Request body matches the function's Zod request schema
- [ ] Response assertions match the function's Zod response schema
- [ ] Test names follow established pattern

## Example Usage

**User request**:

```
/generate-tests for the hello-world edge function
```

**Expected output**:

`apps/supabase/supabase/functions/tests/hello-world-test.ts` with:

- Happy path test verifying the greeting response

**User request**:

```
/generate-tests for the create-appointment edge function
```

**Expected output**:

`apps/supabase/supabase/functions/tests/create-appointment-test.ts` with:

- Happy path test creating an appointment, verifying DB state, and cleaning up
````
