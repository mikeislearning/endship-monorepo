# Security Invariants

The checklist. Each invariant states what must hold, how to confirm it **from source only**, and what a violation means. Work through every section against the inventories built in step 1 of `SKILL.md`, and report which invariants came out clean — that list is the point of the audit on a healthy repo.

Severities here are defaults. Adjust them using the actual reachability and data sensitivity, and say in the finding why you moved one.

---

## A. Row Level Security

RLS is the enforcement boundary. Every finding in this section is about the database, not the app.

### A1 — Every table in an exposed schema enables RLS

**Check:** for each `CREATE TABLE` in `schemas/*.sql`, find `ALTER TABLE <table> ENABLE ROW LEVEL SECURITY;` in the same file. Then confirm the schema is actually exposed: read `config.toml` for `[api] schemas` and `extra_search_path`.
**Violation:** **Critical** if the table holds user data in an exposed schema — the anon key reads the whole table. **Medium** if the schema is not exposed and the table is only reached through an edge function using a standard client (RLS still matters as defence in depth).
**Not a finding:** tables in internal schemas that the API does not expose *and* which no client can reach, where the file says so.

### A2 — Every operation the application performs has a policy

**Check:** build a matrix of table × {SELECT, INSERT, UPDATE, DELETE}. Fill it from the policies in `schemas/*.sql`. Then fill a second matrix from actual usage — every `.from(<table>)` call in `apps/*/src/data/api/*Api.ts` and in `functions/_shared/data/*.ts`. Any cell used by the app with no policy behind it fails.
**Violation:** **High** — the operation silently affects zero rows or returns nothing, so this often shows up as a bug before it shows up as a breach. Report it as a correctness *and* security finding.

### A3 — `UPDATE` and `DELETE` policies have a matching `SELECT` policy

**Check:** for every `FOR UPDATE` or `FOR DELETE` policy, confirm a `FOR SELECT` (or `FOR ALL`) policy exists for the same role on the same table.
**Violation:** **Medium** — without a read policy the row is invisible, so the update matches nothing. Silent data loss, not exposure.

### A4 — No policy reads `user_metadata`

**Check:** grep `schemas/` and `migrations/` for `user_metadata`. Authorization claims must come from `auth.jwt() -> 'app_metadata'` or a table lookup.
**Violation:** **Critical** — `user_metadata` is writable by the user via `supabase.auth.updateUser()`, so a policy reading it lets any user grant themselves whatever role it encodes. Write the exploit path explicitly; this one is always worth spelling out.

### A5 — No `USING (true)` on user data, and no unintended `TO public`

**Check:** read every policy predicate. Flag `USING (true)`, `USING (auth.role() = 'authenticated')` on per-user data, and policies with no `TO` clause or `TO public` where `TO authenticated` was meant.
**Violation:** **High** — any authenticated user reads every row. Distinguish genuinely public reference data (a lookup table of provinces) from user data; the former is fine and should be stated as such rather than flagged.

### A6 — `security definer` functions set an explicit `search_path`

**Check:** for every `CREATE FUNCTION … SECURITY DEFINER`, look for `SET search_path = ''` (or an explicit schema list) in the function definition.
**Violation:** **Low** by default, **High** if the function is callable via `rpc()` from a client and performs privileged work — an attacker who can create objects in a writable schema can shadow an unqualified reference inside the function body. Check whether the function is exposed as an RPC before deciding.

### A7 — `security definer` functions validate their own inputs

**Check:** for each such function, confirm it doesn't accept a user id or role as a parameter and act on it without checking `auth.uid()`.
**Violation:** **Critical** — a `SECURITY DEFINER` function that takes "whose data" as an argument is an RLS bypass with a public front door.

### A8 — The declared schema and the migration history agree

**Check:** the schema-first workflow means `schemas/*.sql` is the source and `migrations/` is generated from its diff. Reconstruct the policy set from the migrations and compare it to the declared schemas. Look especially for policies present in one and absent in the other, and for hand-edited migrations.
**Violation:** **Medium**, escalating to **High** when the divergence is a missing policy — because the migrations are what got applied, the declared file may be describing protection that does not exist. This check is the static substitute for querying `pg_policies`; say so in the report.

### A9 — Policies have tests

**Check:** list which tables have cases under `supabase/tests/` exercised by `pnpm in:supabase db:test`.
**Violation:** **Low** — not a vulnerability, but it's what makes every other invariant in this section stay true. Report as one consolidated finding naming the untested tables, not one per table.

---

## B. CASL ↔ RLS parity

`@libs/authorization` is the single source of truth; the policies are written to reflect it. **The duplication is deliberate — never report it.** Report only divergence, and the absence of anything that would make divergence visible.

### B1 — Every CASL rule has a mirroring policy, and vice versa

**Check:** build the CASL matrix from `getUserRules` in `libs/authorization/src/index.ts` — role × action × subject × conditions. Build the policy matrix from section A. Compare cell by cell. CASL actions map to SQL operations (`read`/`list` → `SELECT`, `create` → `INSERT`, `update` → `UPDATE`, `delete` → `DELETE`).
**Violation:** direction matters.
- **CASL allows, RLS forbids** → **Medium**: the UI offers an action the database refuses. A bug and a support burden, not a breach.
- **RLS allows, CASL forbids** → **High**: the database is more permissive than the intended source of truth. Anything reaching the table outside a CASL-checked path gets access nobody designed for.
- **Conditions disagree** (CASL says `{ id: userId }`, the policy has no ownership predicate, or vice versa) → **High** in the RLS-looser direction.

### B2 — Nothing decides access outside CASL

**Check:** grep both apps and `functions/` for role comparisons used as gates — `userRole === "ADMIN"`, `=== "SUPER_ADMIN"`, `is_super_admin`, or any branch on a role string that guards data access rather than presentation.
**Violation:** **High** when it guards server-side access (it will drift from both CASL and RLS, and no parity check covers it), **Low** when it only picks a label or an icon.

### B3 — Divergence is detectable

**Check:** is there any mechanism — a test, a documented mapping, a generated artefact — that would fail if a policy stopped matching its CASL rule?
**Violation:** **Low** as a finding, but say it plainly: with no mechanism, B1 holds only as long as someone re-runs this audit. This is the highest-leverage recommendation in the section.

---

## C. Edge function authentication & authorization

### C1 — Every route that touches user data authenticates

**Check:** for each `functions/*/index.ts`, list every route (`app.get`, `app.post`, …) and the middleware applied to it — both route-level and `app.use`. Confirm `requireAuthenticatedUser` from `_shared/middleware/authentication.ts` is in the chain. Remember `setupHono()` adds only CORS and the error handler, so it provides no auth.
**Violation:** **Critical** for a route that reads or writes user data with no authentication.
**Not a finding:** deliberately public routes (`health-check`, webhooks with their own signature verification). For a webhook, check that the signature verification exists — if it doesn't, that's **Critical**.

### C2 — Every mutating or record-scoped route authorizes

**Check:** for each route from C1, confirm `hasRequiredPermissions({ action, subject })` from `_shared/middleware/authorization.ts` appears **after** `requireAuthenticatedUser`, and that the `action`/`subject` match what the handler actually does. A handler that writes with `action: "read"` is a real gap.
**Violation:** **High** — no permission check at all on a mutating route. **Medium** if the action/subject are merely mismatched but still restrictive.

### C3 — Record-scoped routes pass `getSubjectResource`

**Check:** for each CASL rule carrying conditions (e.g. `{ id: userId }`), find the routes whose subject it is, and confirm those routes pass `getSubjectResource` to `hasRequiredPermissions`.
**Violation:** **High** — a conditional rule evaluated with no resource silently passes, so the ownership check does nothing. This is the quietest failure mode in the whole middleware layer.

### C4 — Middleware order is correct

**Check:** in each chain, `requireAuthenticatedUser` precedes `hasRequiredPermissions`, which precedes the handler reading `c.get("userId")` / `c.get("userRole")`.
**Violation:** **High** — an authorization check running before authentication evaluates against an empty context.

### C5 — Every authenticated route has a negative test

**Check:** for each authenticated route, find a case in `functions/tests/{function-name}-test.ts` asserting rejection without a token, and — where roles differ — asserting rejection for an under-privileged role.
**Violation:** **Low** to **Medium**. Consolidate into one finding listing the routes.

---

## D. Privileged client usage

`createPrivilegedClient()` bypasses RLS entirely. Every call site is a place where the database boundary is switched off, so each needs its own justification.

### D1 — No privileged client serves a user-initiated request

**Check:** for each call site in `functions/**`, trace whether the handler is reached by a user request and whether user-supplied values reach the query.
**Violation:** **High**, rising to **Critical** if user input selects which rows are touched — that is arbitrary cross-user read or write with RLS off.
**Not a finding:** background jobs, audit-log writes, and cross-user operations that genuinely need full access.

### D2 — Every privileged operation has an explicit permission check

**Check:** with RLS off, CASL is the only guard. Confirm the route has `hasRequiredPermissions` and that the handler constrains rows by `c.get("userId")` rather than by a value from the body.
**Violation:** **High** — privileged access with no permission check.

### D3 — Every privileged call site says why

**Check:** look for a comment explaining why full database access is required.
**Violation:** **Low** — but it's what keeps D1 and D2 reviewable, and its absence is often where a privileged client was used to work around a missing policy. When you find one, check for that missing policy.

---

## E. Request identity trust

### E1 — Identity never comes from the request body

**Check:** for every handler, find where "whose data" is determined. It must be `c.get("userId")` (edge functions) or `auth.uid()` (SQL). Grep request schemas in `libs/schemas/src/appSchemas.ts` for `userId`, `adminId`, `user_id`, `role` fields, then check how the handler uses each one.
**Violation:** **High** — any authenticated user reads or writes another user's data by changing one field. **Critical** if the field also selects a role or privilege level.
**Not a finding:** an id in the body identifying *what* is being acted on, where a policy or an ownership check still constrains it to the caller. Verify that constraint exists rather than assuming.

### E2 — Role never comes from the client

**Check:** confirm role comes from `app_metadata` via the auth middleware, never from the body, a header, or `user_metadata`.
**Violation:** **Critical** — self-assigned privilege escalation.

---

## F. Input validation & injection

### F1 — Every request body is validated

**Check:** every route with a body uses `validateRequest("json", schema)` with a Zod schema from `appSchemas.ts`. Flag any handler calling `c.req.json()` directly.
**Violation:** **Medium** by default; **High** where the unvalidated value reaches a query filter or a privileged operation.

### F2 — No user input interpolated into SQL

**Check:** grep `functions/**` and `apps/*/src/data/api/` for template literals or concatenation inside `.rpc()` arguments, `.filter()`, `.or()`, and any raw SQL. The `.or()` and `.filter()` builders take raw PostgREST expressions and are the realistic injection vector here — a comma or parenthesis in user input changes the query's meaning.
**Violation:** **High** for `.or()` / `.filter()` with unsanitized input; **Critical** for raw SQL in a `security definer` function assembled from user input.

### F3 — Query results are bounded

**Check:** list queries with no `.range()` / `.limit()`.
**Violation:** **Low** — a denial-of-service and cost concern rather than an access one. Report as one consolidated finding.

---

## G. Response & error leakage

### G1 — Error responses don't carry internals

**Check:** read `_shared/utils/hono.ts`. The `app.onError` handler destructures `statusCode` off the error and spreads the remainder into the response body — so every property of every thrown error reaches the client. Trace what actually gets thrown: `EdgeFunctionError` instances, Supabase `PostgrestError` objects (which carry `details` and `hint` describing schema internals), and raw `Error`s from third-party libraries.
**Violation:** **Medium** — schema structure, constraint names, and internal messages disclosed to any caller. **High** if any thrown error can carry another user's data (e.g. a Postgres unique-violation detail quoting the conflicting row).

### G2 — Responses return only intended columns

**Check:** find `select("*")` and `select()` with no argument on tables holding sensitive columns. Compare each response schema in `appSchemas.ts` against what the query returns — `ApiResponse({ responseSchema })` validates the shape, so check whether it actually strips extra fields or merely permits them.
**Violation:** **Medium**, **High** where the extra columns are special-category data.

### G3 — Auth failures don't distinguish causes

**Check:** confirm authentication failures return a uniform response rather than differentiating "no such user" from "wrong password", and that authorization failures throw `EdgeFunctionError` with `FORBIDDEN` rather than returning empty data that reads as success.
**Violation:** **Low** for user enumeration; **Medium** for a silent empty success on denial, which hides authorization bugs from tests.

---

## H. PII in logging and telemetry

Telemetry sends data to a third-party processor. The invariant throughout is **minimum necessary for triage**. Read every sink and every caller of it; a payload's type permitting PII is a weaker finding than a call site actually passing it, so distinguish the two.

### H1 — User context carries only an identifier

**Check:** read `setSentryUser` in `apps/web/src/services/sentry.ts` and its native equivalent, and every caller. Note what is passed: a Supabase `User` object carries `email`, `phone`, `user_metadata`, `app_metadata`, and `identities`, and `Sentry.setUser()` attaches all of it to **every subsequent event**, not just to one error.
**Violation:** **Medium** for email/phone/name attached to all events; **High** if `user_metadata` or `app_metadata` can hold special-category data. Remediation is to pass a narrowed object (`{ id }`), not to stop identifying users.

### H2 — Session replay does not record rendered personal data

**Check:** read the `replayIntegration` config. `maskAllInputs: true` covers what users type; **`maskAllText: false` means all rendered text is captured** — names, emails, and any personal detail displayed on screen. Then check `replaysSessionSampleRate` (replays captured with no error at all) and `replaysOnErrorSampleRate`. Cross-reference the screens that display personal data.
**Violation:** **High** where the app renders special-category data (health, financial, children's data, government identifiers) — a share of ordinary sessions is recorded as video-like data and sent to a processor. **Medium** for ordinary identifying data. Remediation is `maskAllText: true` plus explicit unmasking, or `block`/`mask` selectors on the affected components — say which.
**Note:** this one is easy to miss because nothing in the code looks like a leak. Check it every audit.

### H3 — Error payloads don't carry row data

**Check:** read `sendSentryError` — it forwards an arbitrary `error` into `extra`. Then read its callers, particularly in `apps/*/src/data/api/*Api.ts`, where the value is a Supabase error whose `details` and `hint` can quote row contents. Also check `addSentryBreadcrumb`'s `data` parameter and every caller, and `logError`/`captureException` in `functions/_shared/services/sentry.ts`.
**Violation:** **Medium**, **High** where a quoted row can contain another user's data or special-category fields. A loosely typed `Record<string, unknown>` payload with no current PII call site is **Low**.

### H4 — Telemetry gating is consistent across every send path

**Check:** compare the enable/disable predicate at `init` with the predicate at each send site. In `functions/_shared/services/sentry.ts`, `initSentry` disables on `env !== "local"` while `logError` branches on `env === "LOCAL"` — different casing of the same value. Verify every such comparison against what `SB_ENVIRONMENT` / `VITE_ENVIRONMENT` / `EXPO_PUBLIC_ENVIRONMENT` are actually set to in `.env.*`, and check the same for the web and native loggers' `isDevEnvironment` gate.
**Violation:** **Medium** where an inconsistency causes sending in an environment meant to be silent (test or local data reaching a shared Sentry project), **Low** where the mismatch is inert because another layer disables the sink. Report the inconsistency either way — it is a latent leak the moment the other layer changes.

### H5 — Production builds don't log personal data to the console

**Check:** read `apps/*/src/utils/logger.ts` and confirm each method's dev-only gate. Then grep both apps for direct `console.log`/`warn`/`error` calls outside the logger, and check what they pass. On native, console output reaches device logs and crash reporters in release builds; on web it reaches anyone with devtools and any extension on the page.
**Violation:** **Medium** for personal data logged unconditionally, **Low** for ungated logging of non-personal values. `appLogger` methods correctly gated on `isDevEnvironment` are not findings — verify the gate rather than assuming it.

### H6 — PII doesn't reach telemetry through error messages

**Check:** grep for thrown errors and Sentry messages built by interpolation — `` `Failed to update user ${email}` `` and similar. The message string is the event title and is retained even when payloads are scrubbed.
**Violation:** **Medium**. Include the grep pattern you used so the check is reproducible next audit.

### H7 — Server-side logs don't carry request bodies

**Check:** in `functions/**`, look for logging of validated request bodies, full Supabase responses, or JWT contents. Edge function logs are retained by the platform.
**Violation:** **Medium**, **High** for tokens or special-category fields. A logged JWT is **High** regardless of the data, since it is a live credential.

---

## I. Dependency supply chain

### I1 — Known advisories are triaged, not just counted

**Check:** run `pnpm audit --json` (read-only, no install). For each advisory, determine whether the package is a production dependency of a shipped app, a dev/build tool, or transitive-only, and whether the vulnerable function is reachable from this repo's code.
**Violation:** **Medium** for a reachable production advisory; **Low** for build-time only. Report the triage, not the raw count — an untriaged audit output is noise, and reporting "47 vulnerabilities" without reachability is the fastest way to get the whole report ignored.

### I2 — Patches are understood and still needed

**Check:** read each file in `patches/` (currently `react-native-css-interop.patch`, `react-native-date-picker.patch`). Confirm the patch does what its name implies, that it isn't disabling a security check or validation, and compare the patched version against the version currently resolved in `pnpm-lock.yaml`.
**Violation:** **Medium** if a patch weakens a check or silences an error; **Low** if it's stale (patching a version no longer installed) — stale patches fail open silently. Patches are unreviewed third-party code executing at install time, so read them in full, not just their headers.

### I3 — Deno specifiers resolve reproducibly

**Check:** read `functions/deno.json`. Most imports are exactly pinned (`npm:hono@4.12.23`), but range specifiers exist — `jsr:@supabase/supabase-js@2`, `jsr:@std/assert@1` — which resolve to whatever the range allows. Confirm `deno.lock` is present, committed, and covers every specifier, since that's what makes the ranges reproducible.
**Violation:** **Low** where the lockfile covers it; **Medium** if `deno.lock` is missing, stale, or gitignored, since edge function deploys would then pull unreviewed code. Also flag any `http(s)://` import — an unpinned URL import is **High**.

### I4 — No unexpected install-time execution

**Check:** look for `postinstall`/`preinstall` scripts in the workspace `package.json` files, and check `.npmrc` for settings that affect script execution or registry resolution.
**Violation:** **Medium** for an unexplained lifecycle script pulling remote content; not a finding for ordinary local build steps (`husky`, `patch-package`, workspace prepare hooks).

### I5 — Dependencies are actually used

**Check:** production dependencies with no import anywhere in the workspace.
**Violation:** **Low** — pure attack-surface reduction. One consolidated finding.
