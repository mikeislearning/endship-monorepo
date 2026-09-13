---
name: security-audit
description: "On-demand, read-only security posture audit of this monorepo. Enumerates the security model — RLS policies, CASL parity, edge function auth/authz, privileged client usage — plus PII exposure through logging and Sentry, and the dependency supply chain. Reports severity-triaged findings with exploit paths and ticket text. NOT a coding convention — do not load this skill while writing or reviewing code. Run it only when the user explicitly asks for a security audit (e.g. `/security-audit`)."
disable-model-invocation: true
---

# Security Audit

A periodic, whole-repo audit of the security model. It enumerates the things that must hold, checks each one, and reports what fails — ranked by severity, each with a concrete exploit path.

> [!IMPORTANT]
> **Read-only.** Never edit code, never open a branch, never run a migration, never touch a remote project. Outputs are a report and ticket text.
>
> **Static only.** Never start, query, reset, or connect to a database — local or remote. Everything comes from reading source: `schemas/*.sql`, `migrations/*.sql`, edge functions, `@libs/authorization`, telemetry setup, and dependency manifests. See [Limits](#limits) for what this cannot see, and state those limits in every report.

## What this is not

| Use instead | For |
| --- | --- |
| `/security-review` (built-in) | Reviewing the current branch's diff before a PR |
| Copilot PR review ([`code-review` §2–3](../../../.github/skills/code-review/SKILL.md)) | Catching violations as they're introduced |
| [`supabase-postgres-best-practices`](../supabase-postgres-best-practices/SKILL.md) references | Learning how RLS and privileges *should* work |

Those are all **change-scoped** or reference material. This skill exists for the other case: code that merged before a rule existed, and downstream projects that have drifted from the template over months. That's where auth bugs and telemetry leaks accumulate unseen.

## Scope

**In scope:**

1. **The application security model** — RLS, CASL↔RLS parity, edge function authentication and authorization, privileged client usage, request-identity trust, input validation, response leakage.
2. **PII in logging and telemetry** — what reaches Sentry (events, user context, breadcrumbs, session replay) and what reaches console/device logs in production builds.
3. **The dependency supply chain** — advisories, patches, and Deno import pinning.

**Out of scope** — do not audit or report on: secrets and environment variable configuration, GitHub Actions secret handling, storage bucket policies, or client-side auth token storage. If something in one of those areas is severe enough that you can't leave it out, add a single **Out of scope, noticed anyway** line at the end of the report — one line, no section.

## Before you audit: the false-positive guards

Read these first. A security report that cries wolf gets ignored, which makes the codebase less safe, not more.

**Never report as a leaked credential:**

- `VITE_*` and `EXPO_PUBLIC_*` variables, in any file, including committed `.env*` files. They are inlined into the client bundle **by design**.
- The Supabase anon / publishable key, anywhere, including committed `.env*`. It is a public identifier; RLS is what protects the data.
- The Sentry DSN. It is designed to be public in client builds.
- The local-development JWT secret and demo keys that ship with the Supabase CLI stack.

Do report the service-role key, database passwords, or third-party API secrets — but only where genuinely exposed (reachable from a client bundle, or committed where the surrounding files are not). A service-role key reachable from client code is **Critical**.

**Never report as a finding:**

- **RLS and CASL expressing the same rules.** This is deliberate defence in depth — RLS enforces at the database, CASL drives edge function checks and client-side conditional rendering. `@libs/authorization` is the intended single source of truth and the policies reflect it. Only their *divergence* is a finding.
- **Client-side gating via `<Can>` / `useHasPermission` / `hasPermission`.** UI-only by design. A finding exists only when a client-side gate is the *sole* guard with nothing server-side behind it.
- **Direct Supabase client calls from `data/api/`.** That is the prescribed architecture, and RLS is the boundary. Not an "unvalidated client-side query."
- **Sentry being enabled in production.** Error reporting is intended. The finding is only ever about *what data* it carries.
- Anything already documented as a deliberate decision in [`AGENTS.md`](../../../AGENTS.md) or the `*-conventions` skills. Those are the baseline, not the target.
- Generated files (`*.gen.ts`, `routeTree.gen.ts`, seed SQL) for style or structure. Their *content* still matters if a policy or type reveals a real gap.

## Process

### 1. Build the inventories

Enumerate before you judge. Most of this security model is a finite set of facts, so the audit should be a matrix check, not a hunt for vibes. Build these lists first, from source:

| Inventory | From |
| --- | --- |
| Tables, and whether each enables RLS | `apps/supabase/supabase/schemas/*.sql`, cross-checked against `migrations/*.sql` |
| Policies: table × operation × role × predicate | same |
| `security definer` functions and their `search_path` | same |
| Exposed schemas and API settings | `apps/supabase/supabase/config.toml` |
| CASL rules: role × action × subject × conditions | `libs/authorization/src/index.ts` |
| Edge function routes: function × method × path × middleware chain | `functions/*/index.ts`, `_shared/middleware/*`, `_shared/utils/hono.ts` |
| `createPrivilegedClient()` call sites | `functions/**` |
| Client data access points | `apps/*/src/data/api/*Api.ts` |
| Telemetry sinks: every call that sends data off-device | `apps/*/src/services/sentry.ts`, `apps/*/src/utils/logger.ts`, `functions/_shared/services/sentry.ts`, and every caller of them |
| Dependencies, patches, and Deno specifiers | `package.json` files, `pnpm-lock.yaml`, `patches/`, `functions/deno.json`, `deno.lock` |

Spawn sub-agents to build these in parallel — one for the SQL/RLS inventory, one for edge functions, one for CASL + client access, one for telemetry, one for supply chain. Have each return structured lists, not prose.

### 2. Check the invariants

Work through [`references/invariants.md`](references/invariants.md) against those inventories. It is the substance of this skill: each invariant says what must hold, how to check it statically, and what a violation means.

### 3. Verify every candidate before reporting it

**A finding needs a concrete path: an actor, what they do, and the outcome.** Write it out. For PII findings the actor may be legitimate — the path is *user opens screen → replay captures rendered names → data leaves for a third-party processor*. If you cannot construct a path, the finding is not confirmed — demote it to `Unverified` or drop it.

For each candidate, actively try to refute it:

- Is there another layer that still enforces? A missing CASL check with a correct policy behind it is defence-in-depth erosion (Medium), not data exposure (Critical). Say which layer saves it.
- Is the table actually reachable from a client? Check `config.toml` for exposed schemas. A table in an unexposed schema is reachable only through an edge function.
- Does the privileged client actually serve user input, or only run a background job with no user-controlled parameters?
- Is the "unvalidated" input actually constrained by a `validateRequest` middleware further up the chain?
- For telemetry: is the sink actually enabled in the environment in question, and is the field actually populated with real data rather than a type that merely permits it? Trace the enable/disable predicate at every send site, not just at `init`.
- Is the dependency vulnerability in a code path this repo reaches, or in a transitive dev-only tool that never runs in production?

Cite file and line for every claim. Read the file — never infer a policy, a middleware chain, or a payload shape from a filename.

### 4. Rank by severity

| Severity | Meaning |
| --- | --- |
| **Critical** | Unauthenticated or cross-user access to, or modification of, real data, reachable from a client. Service-role key reachable from a client bundle. Authentication bypass. |
| **High** | Authenticated privilege escalation between roles. A table holding user data with RLS disabled or a `USING (true)` policy. A privileged client serving a user-initiated request with no permission check. Trusting a user/admin id from the request body to decide whose data to touch. Bulk PII or special-category data (health, financial, precise location, government identifiers) leaving for a third-party processor by default. |
| **Medium** | Defence-in-depth erosion where another layer still enforces. Information disclosure — internal error details, stack traces, or unintended columns in a response. Identifying PII (email, phone, name) attached to telemetry beyond what triage needs. Missing input validation with no direct exploit. Directly reachable dependency vulnerability. |
| **Low** | Hardening. `security definer` without an explicit `search_path` where the current search path is safe. Unpinned dependency specifiers covered by a lockfile. Telemetry payloads typed loosely enough to carry PII where none currently does. Missing negative-path tests on an authorized route. |
| **Unverified** | Looks wrong, no path constructed. Listed separately at the end, explicitly flagged as needing human judgement. Do not pad this section. |

Severity for PII depends on the data, and the audit can't always tell what a column holds. Where the severity turns on that, state the assumption in the finding — *"High if `notes` holds clinical detail, Medium if it's operational"* — rather than guessing silently. In health, financial, or children's-data projects, escalate; MindSea projects frequently are one of those, so ask rather than assume it's ordinary CRUD data.

### 5. Write the report

One markdown file, never in the repo — session scratchpad directory if the harness provides one, otherwise `${TMPDIR:-/tmp}`, named `security-audit-$(date +%Y%m%d-%H%M%S).md`. Tell the user the absolute path.

````markdown
# Security Audit — <date>

**Method:** static source analysis, read-only. No database was queried.
**Inventoried:** <N> tables · <N> policies · <N> edge function routes · <N> CASL rules · <N> privileged call sites · <N> telemetry sinks
**Coverage:** <what was checked> · **Not checked:** <see Limits>

## Summary

| Severity | Count |
| --- | --- |
| Critical | 0 |
| High | 2 |
| … | |

<One paragraph: overall posture, and the single thing to fix first.>

---

## HIGH

### H1 — <Title: what is wrong, not what to do>

**Where:** `<file>:<line>`, reached from `<file>:<line>`
**Invariant:** <the invariant ID and statement from references/invariants.md>
**Severity rationale:** <why this tier, and what would move it>

<!-- Illustrative shape only. Do not carry the wording of an example into a real finding,
     and never report a finding without re-reading the cited lines in the current tree. -->


**Path.** <actor → action → outcome. For PII: whose data, which fields, which processor, under what conditions.>

**Evidence.** <the actual lines, quoted, plus what is absent and where you looked for it>

**Why it isn't caught elsewhere.** <which layer you checked and found not to save it>

**Remediation.** <what to change; if it needs a schema change, name the regeneration steps>

**Confidence.** Confirmed statically | Depends on <unknown> — <why>
````

Rules:

- **Order by severity, then by blast radius.** Never pad — a report with three real Highs beats one with thirty mixed items.
- **State what passed.** The list of invariants checked and clean is the most valuable part of the report on a healthy repo, and it makes the next audit cheap.
- **One finding per distinct root cause.** Ten tables missing the same policy shape is one finding with ten instances, not ten findings.
- **No generic advice.** Nothing that would be true of any repo. Every line ties to a file in this one.
- If a whole category came out clean, say so explicitly rather than omitting it.

Then in the conversation: the severity counts, the Critical and High titles in one line each, the report path, and your single recommended first fix. Nothing more — the report holds the detail.

### 6. Draft tickets

For every Critical and High finding, and any Medium the user asks for, emit ready-to-paste Trello/Jira text — one block per ticket:

```markdown
**Title:** fix: <imperative summary, conventional-commit style>

**Severity:** High
**Context**
The path in plain language. Link the report path.

**Remediation**
- <specific change, with file>

**Acceptance criteria**
- [ ] <the path no longer works, stated as an observable outcome>
- [ ] Test added: <`db:test` policy case, or a `fn:test` unauthenticated/unauthorized case>
- [ ] `pnpm check-all` passes
- [ ] <if schema changed: migration generated via `pnpm in:supabase db:gen-migration <NAME>`, types regenerated via `db:gen-types`, `data_model.dbml` updated>

**Regression risk:** <what could break — tightening a policy breaks things that were accidentally working; reducing telemetry payloads can blind existing dashboards or alerts>
```

Always name the regression risk. Titles use conventional commits (`fix:`, `chore:`) since commitlint enforces them.

## Limits

State these in every report — a reader who thinks the audit covered more than it did is worse off than one who knows the gaps.

- **The declared schema is not the deployed schema.** This audit reads `schemas/*.sql` and `migrations/*.sql`. A policy dropped by hand in the dashboard, or a migration that failed partway, is invisible here. Where the declared schema and the migration history disagree, that divergence is reported as a finding — but neither tells you what production actually has.
- **No runtime behaviour.** Nothing is executed, so a policy that is syntactically present but semantically wrong for real data may pass. Policy tests (`pnpm in:supabase db:test`) are how you close that.
- **Telemetry findings are payload-shape findings.** The audit reads what *can* be sent, not what a Sentry project has actually received. Confirming a leak means looking at real events in Sentry, which this skill does not do.
- **Dependency reachability is judged by reading, not by tracing.** A vulnerability marked unreachable is a considered opinion, not a proof.
- **Environment and secret configuration is out of scope** by design — see [Scope](#scope).

## When to reach for this

- **Periodically** — every few sprints, and before any external security review or client handoff.
- **After a burst of feature work** — when several features have landed fast and policies were written in a hurry.
- **When onboarding an existing project** — the first audit on a repo that's been running a while is usually the highest-yield one.
- **After a role or permissions change** — adding a role means every existing policy and CASL rule now has an unexamined case.
- **Before enabling or widening telemetry** — new screens change what session replay captures, and new tables change what an error payload can carry.

Not for: reviewing a diff (`/security-review`), or as a gate on every PR (that's Copilot review).
