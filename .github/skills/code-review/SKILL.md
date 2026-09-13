---
name: code-review
description: "Reviews an existing diff or pull request in this Supabase/React/Expo monorepo against its architecture, security, and convention rules — layer boundaries, RLS and edge function authorization, CASL parity, DRY/simplicity, React and Expo conventions, i18n, naming — with a severity ladder and the known false positives not to flag. Load this ONLY when the task is reviewing a change. Do NOT load it while authoring code: for writing, follow AGENTS.md and the workspace skills under .agents/skills/ instead."
---

# Code Review — supabase-monorepo-template

Review pull requests against the rules below. Flag violations as review comments, ordered by severity. Prefer a small number of high-signal comments over many trivial ones. When you cite a rule, point to the relevant convention so the author can self-correct.

> [!IMPORTANT]
> **Review-only.** This skill is a checklist for judging code that already exists. It is not the source of truth for writing code — when authoring or refactoring, follow [`AGENTS.md`](../../../AGENTS.md) and the workspace skills under [`.agents/skills/`](../../../.agents/skills/) (`supabase-conventions`, `react-conventions`, `expo-conventions`). If the task at hand is not a review, stop reading here.

This is a TypeScript monorepo with a **layered architecture** and strict separation of concerns: `@apps/supabase` (Postgres schemas, migrations, RLS, Deno/Hono edge functions), `@apps/web` (React/Vite + TanStack Router), `@apps/native` (Expo, iOS/Android/web), and shared libraries (`@libs/schemas`, `@libs/authorization`, `@libs/i18n`). The authoritative conventions live in `AGENTS.md` and the skills under `.agents/skills/` — this skill is what to enforce in review.

## Severity ladder

| Severity | Examples |
| --- | --- |
| **Critical** | Service-role key, DB password, or JWT signing secret committed in plaintext or reachable from a client bundle. |
| **High** | New table with no RLS, or a policy broad enough to expose other users' data (`USING (true)`); a policy reading `user_metadata` for authorization; a privileged client serving a user request with no permission check; a new mutating or record-scoped edge function route with no permission check; a handler trusting a user/admin id from the request body. |
| **Medium** | Layer violations (Supabase called outside `data/api` / `_shared/data`, business logic in a route file); missing generated migration or stale generated types; unvalidated request body; missing unauthorized-case test; duplicated logic or a hand-rolled replacement for an existing helper or dependency. |
| **Low** | Naming, comment style, i18n key placement, inline styles, barrel-file size. |

## Review protocol

1. Read the diff in the context of the layer it belongs to — the same code can be correct in `data/api/` and a violation in a component.
2. Check the highest-priority sections first: §1 architecture, §2 Supabase/RLS, §3 authorization, §4 DRY. §5–6 are secondary.
3. Verify before flagging. Confirm the helper you're pointing the author to actually exists, and check the false-positive list below.
4. When unsure whether something violates a convention, ask a clarifying question in the review rather than asserting a hard rule.

## Do not flag

- **Generated files** — `*.gen.ts`, `dbTypes.gen.ts`, `dbSchemas.gen.ts`, `routeTree.gen.ts`, migrations, seed SQL, lockfiles — for style issues.
- **Sandbox-only code** for style issues.
- **Client-bundled env vars are not secrets.** `EXPO_PUBLIC_*`, `VITE_*`, and the Supabase anon/publishable key (including in committed `.env*` files) are inlined into the client bundle by design and are protected by RLS. Never report them as leaked credentials. Only the service-role key, DB passwords, JWT signing secrets, and third-party API secrets are.
- **RLS and CASL expressing the same rule** — that duplication is deliberate defense in depth, not a DRY violation.

---

## 1. Architecture & layering (highest priority)

Each layer imports only from layers below it — never sideways or upward. Flag any violation.

**Backend layering:** `supabase/schemas/*.sql` (tables + RLS) → generated types in `@libs/schemas` → `_shared/data/*.ts` helpers → edge function handlers.

**Client layering:** route (`app/`, `routes/`) → interactor → block → component, with the data flow `@libs/schemas` → `data/api` → `data/queries` / `data/mutations` → interactor.

- **`data/api/` is the only place that touches Supabase from the client.** Flag any `supabaseClient.from(...)`, `.rpc(...)`, or `invokeEdgeFunction` call in a component, block, interactor, hook, store, or query/mutation file. Those calls belong in `data/api/{domain}Api.ts` and must import from `@/services/supabase` — never instantiate a client directly.
- **`_shared/data/` is the only place that touches Supabase inside edge functions.** Flag raw `.from(...)` / `.rpc(...)` in a function body (`{function-name}/index.ts`), in middleware, or in a test under `tests/`. Data helpers accept `supabaseClient` as a parameter so the caller picks the client, and throw `EdgeFunctionError` on failure. If a test needs table access no production helper provides, add a **test helper** to `_shared/data/*.ts` with a JSDoc note starting `Test helper:` — not an ad-hoc query in the test file.
- **`data/api` is the place for client-side API error handling.** Supabase `error` results are reported with `sendSentryError` there; query/mutation hooks (`data/queries`, `data/mutations`) should not duplicate that with their own `try/catch`. Flag an api function that discards the returned `error` entirely.
- **Cache invalidation belongs in mutation `onSuccess`**, using the shared `*QueryKeys` factory from the sibling queries file. Flag hardcoded query-key string arrays.
- **Components vs blocks:** `components/` is for **primitive, domain-agnostic UI only**, prefixed `Aw*` (web) / `An*` (native). Anything domain-specific belongs in `blocks/` or `interactors/`. Flag a new domain-aware component placed under `components/`, or a primitive that imports from `data/`, `domain/`, or `stores/`.
- **Route files are thin shells.** A file under `apps/native/src/app/` or `apps/web/src/routes/` must render a single interactor (`*Screen` on native, `*Page` on web) and contain no business logic, state, mutations, or arbitrary JSX. The only permitted logic is reading route params/search params to forward as props. Pure redirects and sandbox routes are exempt. Flag any `useState`, `useMutation`, data fetching, or layout JSX in a route file.
- **`utils/` is pure.** No React, no Supabase or network access, no side effects, and no imports from `data/` or `stores/`. All exported utils need JSDoc.
- **`domain/` holds client-only, entity-specific code:** form/validation Zod schemas, UI state shapes, search-param schemas. Types that already exist in `@libs/schemas` (`Database["public"]["Tables"]["users"]["Row"]`, the generated `dbSchemas.gen.ts` Zod schemas, edge function request/response types) must be imported, never re-declared. Follow the `PascalCase + "Type"` suffix for exported types.
- **Env vars:** never read `process.env` directly — import from the workspace's `envVariables` export (`src/utils/envVariables.ts`), built with `@t3-oss/env-core` (web) or a Zod schema (native). New variables must be added to that schema and to `.env.example`. Inside edge functions, use `Deno.env.get()`.

## 2. Supabase: database, RLS & edge functions

- **RLS is the security boundary, not the app layer.** Every table in an exposed schema needs `ALTER TABLE <table> ENABLE ROW LEVEL SECURITY;` plus explicit policies for each operation the app performs. A new table with no RLS, or an overly broad policy (`USING (true)` on user data), is a **high-severity** finding.
  - Use `auth.uid()` for the current user; read role claims from `auth.jwt() -> 'app_metadata'` only — **never `user_metadata`**, which is user-editable and unsafe for authorization. Flag any policy that reads `user_metadata`.
  - An `UPDATE` policy also requires a `SELECT` policy, or updates silently affect 0 rows. Flag `UPDATE`/`DELETE` policies with no matching read policy.
  - Deny by default; allow explicitly.
- **Schema-first workflow.** Tables live in `apps/supabase/supabase/schemas/{n}.{table}.sql` (numbered for load order), with the table, its RLS enablement, and all its policies in one file. Flag:
  - a migration hand-written or hand-edited instead of generated from the schema diff (`pnpm in:supabase db:gen-migration <NAME>`)
  - a schema change whose PR is missing the generated migration
  - a schema change that doesn't regenerate types (`pnpm in:supabase db:gen-types` → `dbTypes.gen.ts`, `dbSchemas.gen.ts`), or that hand-edits those generated files
  - a schema or migration change that leaves `data_model.dbml` at the repo root stale (tables, columns, indexes, `ref:` foreign keys)
- **Edge functions are for side effects and sagas, not CRUD.** Direct Supabase client calls are the default. Flag a new edge function that only performs a single RLS-protected read or write — that belongs in `data/api/`. Conversely, flag a client-side call that needs multi-step rollback, an external side effect (email, webhook), or service-role access — that belongs in an edge function.
- **Edge function structure.** Route via `setupHono()`; validate every request body with `validateRequest("json", schema)` and a Zod schema; return `ApiResponse({ body, responseSchema })`; throw `EdgeFunctionError` with an `HTTPStatusCode` rather than returning ad-hoc error shapes. Flag a handler that reads `c.req.json()` unvalidated, returns a bare `Response`, or does DB work inline instead of through `_shared/data/`.
- **Register new functions in the typed layer.** Request/response schemas go in `@libs/schemas/src/appSchemas.ts`, and the function must be added to `EdgeFunctionsEnum`, `EdgeFunctionOptionsType`, and `EdgeFunctionReturnType`. Flag a new function missing any of these — clients lose type safety silently. Folder names are kebab-case and the Hono route path matches the folder name.
- **`createPrivilegedClient()` bypasses RLS.** Use `createStandardClient(c)` for anything user-initiated. Flag a privileged client used to serve a user's read/write request, and treat privileged access with no explicit permission check as **high severity**. Privileged use should be limited to side effects that genuinely require full DB access (audit logs, cross-user jobs), ideally with a comment saying why.
- **Never trust the client's own identity claims.** Flag a handler or policy that takes a user/admin id from the request body to decide whose data to read or write when it should use `c.get("userId")` / `auth.uid()`.
- **Data safety.** Flag `select("*")` on tables with sensitive columns where an explicit column list is needed, unbounded list queries with no `.range()` / pagination, and user input interpolated into raw SQL instead of parameterized query-builder calls or a defined RPC.
- **Tests.** New or changed edge functions need `apps/supabase/supabase/functions/tests/{function-name}-test.ts` covering the happy path and, for authenticated routes, an unauthenticated case asserting rejection. Reuse `tests/_shared/helpers.ts` (`createAuthenticatedTestClient`, `invokeEdgeFunction`, …) instead of rolling new setup. Flag an authenticated route with no unauthorized test. RLS policy changes should come with a `pnpm in:supabase db:test` case where practical.

## 3. Authorization

All permission rules live in `@libs/authorization` (`getUserRules`) and are evaluated identically in edge functions and clients. Roles: `SUPER_ADMIN`, `ADMIN`, `USER`. Actions: `create`, `read`, `list`, `update`, `delete`. Subjects are DB table names (`DBTablesType`), optionally with record-level conditions (e.g. `{ id: userId }`).

- **CASL is defense in depth — RLS is the real enforcement.** A permission check in an edge function does not remove the need for a policy on the table, and a privileged client that skips RLS makes the CASL check the _only_ guard. Flag either half missing.
- **Never define rules outside `@libs/authorization`.** Flag inline role checks (`if (userRole === "ADMIN")`, `admin.is_super_admin`) used to gate access instead of a CASL ability, and flag new subjects or roles introduced anywhere else.
- **Every mutating or record-scoped edge function route must be authorized.** Use `hasRequiredPermissions({ action, subject })` from `@/middleware/authorization.ts`, applied after `requireAuthenticatedUser`. Flag a new route with no permission check at all — this is a high-severity finding.
- **Pass `getSubjectResource` for record-level checks.** When rules depend on ownership or attributes (`{ id: userId }`), a check without the fetched row silently passes. Flag record-scoped routes that omit it.
- **Authorize after authentication, and fail loudly.** `userId` / `userRole` must be populated by the auth middleware first; denial throws `EdgeFunctionError` with `HTTPStatusCode.FORBIDDEN` rather than silently returning empty data.
- **Client-side authorization is UI-only.** `<Can>`, `useHasPermission`, and `hasPermission` hide or disable elements; RLS and edge function middleware always enforce the real check. Flag a client-side gate introduced _instead of_ a server-side one. In components, use `<Can>` for conditional rendering, `useHasPermission` for imperative checks, and `hasPermission` (from `@/utils/authorization`) outside the React tree — never call `@libs/authorization` directly in components.

## 4. DRY, simplicity & not reinventing the wheel (high priority)

Actively look for code that is more complicated than it needs to be. This is a primary review goal, not a nicety:

- **Duplication.** Flag copy-pasted logic, repeated literals/config, or near-identical functions across files. Point to the existing helper, hook, data function, or constant that should be reused, or suggest extracting one.
- **Reinventing existing utilities.** Before accepting new helper code, check whether it duplicates something already in the repo (`utils/`, `domain/`, `_shared/`, `@libs/*`) or a dependency already in `package.json`. Preferred tools — reach for these instead of writing the logic by hand:
  - **Dates/times → `dayjs`**, via the workspace `utils/date` helpers. Don't manipulate `Date` directly or hand-write date math/formatting.
  - **Forms/validation → `react-hook-form` + `zod`**, with schemas in `domain/` composed from the generated schemas in `@libs/schemas`.
  - **DB types and validation → generated output** (`dbTypes.gen.ts`, `dbSchemas.gen.ts`), not hand-written Zod objects or re-declared row types.
  - **Database access → the Supabase query builder** inside `data/api/` or `_shared/data/` — not raw SQL strings.
  - **Server state → TanStack Query** hooks (`data/queries`, `data/mutations`) — don't hand-roll fetch-and-cache logic.
  - **Permissions → CASL** via `@libs/authorization` — don't hand-roll role comparisons.
  - **Global client state → Jotai atoms** (`stores/atoms.ts`) for simple values, **XState stores** for complex flows — don't reimplement a state machine as a tangle of `useState` + Effects.
  - **Conditional classes → `cn()` / `class-variance-authority`** for component variants.
- **Self-rolled logic that a reputable, industry-standard library already solves.** Even when nothing in-repo or in `package.json` covers it, flag hand-rolled implementations of well-solved problems (e.g. retry/backoff, idle timers, gesture handling, pagination cursors, date parsing) and suggest the established library instead of custom code.
- **Over-engineering.** Flag abstractions, generic wrappers, config objects, or layers of indirection introduced for a single call site. Prefer the simplest thing that works; suggest inlining when an abstraction earns nothing.
- **Bloat / doing too much.** Flag functions, components, and handlers that have grown to handle many unrelated concerns. An edge function may legitimately orchestrate several steps, but a long inline handler should read as a sequence of well-named helper calls — suggest extracting the steps into helpers (`_shared/services/`, `_shared/utils/`, or a local module) and keeping the handler as the orchestrator. On the client, suggest splitting along the layer boundaries above: entity-specific logic into `domain/`, generic pure helpers into `utils/`.
- **Dead and redundant code.** Flag unused exports, commented-out blocks, and state that is never read.
- When a third-party library already in the dependency tree would replace a chunk of custom code, say so explicitly and name the library.

## 5. React, web & Expo conventions

- **React Compiler is on** in both apps — do **not** add `React.memo`, `useMemo`, or `useCallback` for performance. Flag manual memoization unless accompanied by a comment explaining a concrete measured case the compiler can't handle.
- **Avoid unnecessary `useEffect`.** Flag effects that: derive state that could be computed during render; run user-event logic that belongs in an event handler; reset state on a prop change (use a `key` instead); or chain effects to trigger one another. Effects are only for syncing with external systems (browser/native APIs, realtime subscriptions) and analytics-on-display.
- **i18n:** all user-facing copy goes through `@libs/i18n`, keyed `{scope}:{section}.{key}` (`native:`, `web:`, `supabase:`, `common:`, `sandbox:`). Prefer the `i18nKey` / `i18nOptions` props on text components (`AwText`, `AnText`, …) over the translation hook; use the hook only for non-renderable strings (placeholders, `aria-label` / `accessibilityLabel`, alerts). Flag hardcoded user-facing strings and keys not added to the English source files in `@libs/i18n` first.
- **Styling:** use Tailwind / NativeWind `className` with theme tokens, and `cn()` for conditional classes. Flag inline `style` objects (except where a third-party lib requires them) and raw hex colors where a token exists.
- **Components:** `Aw` prefix for web (`src/components/AwComponentName/`), `An` for native; export from the component index; follow the `ComponentPropsType` naming pattern and use `ChildrenOrI18nType` for text content. Keep barrel files to a maximum of two exports.
- **Native storage:** never call MMKV `getItem` / `setItem` directly in components — use `atomWithMMKV()` atoms in `src/stores/atoms.ts`, and reserve them for lightweight settings that must survive restarts (locale, theme). Durable records belong in Postgres via the data layer, not in MMKV.
- **Expo:** respect the provider nesting order in `src/app/_layout.tsx` and keep the root `ErrorBoundary` export intact.

## 6. Naming & general conventions

- **Comments explain _why_, not _what_.** Flag comments that merely restate the code. Markers: `// TODO:`, `// !` (warning/constraint), `// ?` (non-obvious choice). All exported utility functions need JSDoc.
- Type aliases: `PascalCase` + `Type` suffix (`UserInsertType`). Interfaces: `I` prefix. Enums: `Enum` suffix. `data/api` objects: `PascalCase` + `Api`. Query hooks: `use…Query`; mutation hooks: `use…Mutation`; key factories: `PascalCase` + `QueryKeys`.
- Database tables are snake_case and plural (`admins`, `users`); columns are snake_case in SQL **and in TypeScript** — the generated `Database` type preserves SQL casing, so don't introduce camelCase mapping layers. Edge function folders are kebab-case (`hello-world`).
- String-literal union values and Postgres enum values are SCREAMING_CASE (e.g. `"SUPER_ADMIN" | "ADMIN" | "USER"`).
- Boolean variables use camelCase with `is|should|has|can|will` prefixes.
- Prefer `type` over `interface`; explicit coercion (`Boolean(value)`, not `!!value`); max two function parameters — use an options object beyond that; arrow functions over `function` declarations; handle promises or mark them `void` for fire-and-forget.
