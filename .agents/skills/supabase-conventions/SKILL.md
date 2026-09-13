---
name: supabase-conventions
description: Project-specific Supabase conventions for petticoat-monorepo. Use when writing or reviewing edge functions, SQL schemas, migrations, RLS policies, or Supabase client usage in @apps/supabase, @apps/web, or @apps/native.
applyTo: "apps/supabase/**,libs/schemas/**"
---

# Supabase Conventions

Project-specific patterns for using Supabase in this monorepo. For general Supabase platform knowledge, security rules, and CLI reference, also refer to the `supabase` skill.

## Edge Function Structure

Edge functions use Hono for routing, request validation middleware, and typed responses via `ApiResponse()`.

```typescript
import { validateRequest } from "@/middleware/validation.ts";
import { requestSchema, responseSchema } from "@/schemas/appSchemas.ts";
import { ApiResponse } from "@/utils/api.ts";
import { setupHono } from "@/utils/hono.ts";

const app = setupHono();

app.post("/function-name", validateRequest("json", requestSchema), c => {
  const data = c.req.valid("json");
  // Business logic here
  return ApiResponse({
    body: { message: "Success" },
    responseSchema: responseSchema,
  });
});

Deno.serve(app.fetch);
```

**Rules**:

- Use Hono for all routing via `setupHono()`
- Validate all request bodies with `validateRequest()` middleware and a Zod schema
- Return typed responses using `ApiResponse()` with a `responseSchema`
- Use `createStandardClient()` for user-initiated DB operations (RLS enforced)
- Use `createPrivilegedClient()` only when bypassing RLS is required (service role)
- Keep edge functions focused — one primary responsibility per function
- Import shared utilities from `@/` paths (e.g., `@/utils/`, `@/middleware/`, `@/services/`)

## Adding a New Edge Function

1. Create folder: `apps/supabase/supabase/functions/{function-name}/index.ts`
2. Define request/response Zod schemas in `@libs/schemas/src/appSchemas.ts`
3. Add the function to `EdgeFunctionsEnum`, `EdgeFunctionOptionsType`, and `EdgeFunctionReturnType` in `appSchemas.ts`
4. Implement the function using the structure above
5. Run `pnpm in:supabase db:gen-types` to regenerate types if the schema changed

## Database Layer

### Schema Files

SQL schemas live in `@apps/supabase/supabase/schemas/` and are numbered for load order:

```
supabase/schemas/
  0.common.sql       ← shared enums, extensions
  1.users.sql        ← users table + RLS
  2.admins.sql       ← admins table + RLS
  ...
```

Every schema file should define the table, enable RLS, and include all policies in one place.

### Migrations

Never hand-write migration filenames. Always generate them from the schema diff:

```bash
pnpm in:supabase db:gen-migration <NAME>   # generate from diff between schemas/ and current DB
pnpm in:supabase db:migrate                # apply migrations locally
pnpm in:supabase db:reset                  # reset local DB and re-apply all migrations
```

Migrations are stored in `supabase/migrations/{timestamp}_{name}.sql`.

### Type Generation

After any schema change, regenerate TypeScript types and Zod schemas:

```bash
pnpm in:supabase db:gen-types
```

This updates:

- `@libs/schemas/src/dbTypes.gen.ts` — the `Database` type used to type `supabaseClient`
- `@libs/schemas/src/dbSchemas.gen.ts` — Zod schemas for each table's `Row`, `Insert`, and `Update` shapes

### Seeds

Seeds are configured with Snaplet in `@apps/supabase/supabase/seeds/`.

### Testing

Use `deno test` for edge function tests:

```bash
pnpm in:supabase fn:test     # run edge function tests
pnpm in:supabase db:test     # run database tests
```

## RLS Policies

RLS is the primary security boundary — it must be enabled on every table in an exposed schema.

```sql
-- Always enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- SELECT: users can only read their own row
CREATE POLICY "Users can read own row"
  ON users FOR SELECT
  USING (auth.uid() = id);

-- INSERT: users can only insert their own row
CREATE POLICY "Users can insert own row"
  ON users FOR INSERT
  WITH CHECK (auth.uid() = id);

-- UPDATE: users can only update their own row (requires SELECT policy too)
CREATE POLICY "Users can update own row"
  ON users FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);
```

**Rules**:

- Enable RLS on every table: `ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;`
- Define policies for each operation type (SELECT, INSERT, UPDATE, DELETE) that the app uses
- Use `auth.uid()` to reference the authenticated user
- Use `auth.jwt()` to access JWT claims for role-based policies — use `app_metadata` claims only, never `user_metadata` (user-editable, unsafe for authorization)
- Prefer restrictive policies — deny by default, allow explicitly
- An UPDATE policy also requires a SELECT policy; without it, updates silently return 0 rows

## Supabase Client Usage

### Frontend Apps

Frontend apps import `supabaseClient` and `invokeEdgeFunction` from `@/services/supabase` — never instantiate the client directly.

```typescript
import { invokeEdgeFunction, supabaseClient } from "@/services/supabase";
import { EdgeFunctionsEnum } from "@libs/schemas";

// Direct DB query — row type is auto-inferred from the generated `Database` type
const { data, error } = await supabaseClient
  .from("users")
  .select("*")
  .eq("id", userId)
  .single();

// Edge function call — typed via EdgeFunctionOptionsType / EdgeFunctionReturnType
const { data, error } = await invokeEdgeFunction({
  func: EdgeFunctionsEnum.HelloWorld,
  opts: { body: { name: "Alice" } },
});
```

### Inside Edge Functions

Use the appropriate client depending on the operation:

```typescript
import { createPrivilegedClient, createStandardClient } from "@/services/supabase.ts";

// RLS-enforced — use for user-initiated reads/writes
const supabase = createStandardClient(c);
const { data } = await supabase.from("users").select("*").eq("id", userId);

// Service role — bypasses RLS; only use for side effects requiring full DB access
const privileged = createPrivilegedClient();
await privileged.from("audit_log").insert({ ... });
```

## Data Access Layer

**All raw `supabaseClient.from(...)` / `.rpc(...)` calls must live in `_shared/data/*.ts`.** Edge function bodies (`{function-name}/index.ts`), middleware, and edge-function **tests** (`tests/*-test.ts`) must never touch tables or RPCs directly — they consume typed helpers from `_shared/data/` instead.

This mirrors the frontend rule (`data/api/` is the only place for raw Supabase calls) and keeps error handling, error-type wrapping (`EdgeFunctionError`), and table/column knowledge in one place per domain.

```typescript
// ❌ Bad — raw .from() inside an edge function body
app.post("/foo", async c => {
  const supabase = createStandardClient(c);
  const { data } = await supabase.from("users").select("*").eq("id", userId);
  // ...
});

// ❌ Bad — raw .from() inside a test file
Deno.test("foo", async () => {
  const admin = createPrivilegedTestClient();
  await admin.from("notifications").update({ status: "FAILED" }).eq("status", "PENDING");
});

// ✅ Good — edge function delegates to a data helper
import { getUserById } from "@/data/user.ts";

app.post("/foo", async c => {
  const supabase = createStandardClient(c);
  const user = await getUserById({ supabaseClient: supabase, id: userId });
  // ...
});

// ✅ Good — test delegates to a data helper (add a "test helper" if none exists)
import { markAllPendingNotificationsFailed } from "@/data/notifications.ts";

Deno.test("foo", async () => {
  const admin = createPrivilegedTestClient();
  await markAllPendingNotificationsFailed({ supabaseClient: admin });
});
```

**Rules**:

- Every `.from(...)` / `.rpc(...)` call on a `SupabaseClientType` lives in `_shared/data/{domain}.ts`. No exceptions in `index.ts`, middleware, or tests.
- Data helpers accept `supabaseClient` as a parameter so callers pick the client (`createStandardClient(c)`, `createPrivilegedClient()`, or a test client) — helpers never construct clients themselves.
- Data helpers throw `EdgeFunctionError` (or a plain `Error` for test-only helpers) on failure so the callsite doesn't hand-roll error shape.
- If a test needs table access that no production helper provides (e.g. seeding a specific queue state, bulk cleanup, overwriting a column not touched in production paths), add a **test helper** to the appropriate `_shared/data/*.ts` file with a JSDoc note starting with `Test helper:`. Do not add ad-hoc `.from(...)` calls to the test file.

## File Structure

```
apps/supabase/supabase/
  functions/
    {function-name}/index.ts     ← edge function entry point
    _shared/
      middleware/                ← validation, auth middleware
      services/supabase.ts       ← createStandardClient, createPrivilegedClient
      utils/api.ts               ← ApiResponse helper
      utils/hono.ts              ← setupHono helper
  schemas/
    {n}.{table}.sql              ← table definition + RLS (numbered for ordering)
  migrations/
    {timestamp}_{name}.sql       ← generated migrations (never hand-written)
  seeds/                         ← Snaplet seed configuration

libs/schemas/src/
  dbTypes.gen.ts                 ← auto-generated Database type (from db:gen-types)
  dbSchemas.gen.ts               ← auto-generated Zod schemas (from db:gen-types)
  appSchemas.ts                  ← edge function request/response schemas + EdgeFunctionsEnum
```

## Commands

```bash
# Local stack
pnpm in:supabase sb:start       # start local Supabase
pnpm in:supabase sb:stop        # stop local Supabase
pnpm in:supabase sb:link        # link to remote project

# Database
pnpm in:supabase db:gen-migration <NAME>  # generate migration from schema diff
pnpm in:supabase db:migrate               # apply migrations locally
pnpm in:supabase db:reset                 # reset and re-apply all migrations
pnpm in:supabase db:gen-types             # regenerate TypeScript types + Zod schemas
pnpm in:supabase db:test                  # run database tests

# Edge functions
pnpm in:supabase fn:serve       # serve functions locally
pnpm in:supabase fn:test        # run edge function tests
```
