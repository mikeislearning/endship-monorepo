---
description: Read-only security posture audit — RLS, CASL parity, edge function authz, PII in telemetry, supply chain — with severity-triaged findings and ticket text
argument-hint: "[optional: a section, table, function, or concern to focus on]"
---

Run a security audit of this monorepo.

Read [`.agents/skills/security-audit/SKILL.md`](../../.agents/skills/security-audit/SKILL.md) and follow it exactly, including its reference file:

- `.agents/skills/security-audit/references/invariants.md` — the invariant checklist

$ARGUMENTS

If nothing was specified above, audit every section of the invariants file. If a section, table, function, or concern was named, scope the audit to it and say in the report which invariants you skipped.

Non-negotiable constraints from the skill:

- **Read-only.** Do not edit any file, create a branch, or apply a fix — even an obvious one.
- **Static only.** Do not start, reset, query, or connect to any database, local or remote. Do not run `supabase` commands other than reading files. `pnpm audit` is permitted since it is read-only.
- **Verify before reporting.** Every finding needs a concrete path (actor → action → outcome) and cited lines you actually read. Apply the false-positive guards — in particular, `VITE_*` / `EXPO_PUBLIC_*` variables and the Supabase anon key are public by design, and RLS/CASL expressing the same rules is deliberate.
- **State what passed**, and state the limits of a static audit, in the report.
