## Project Layout

Within the `supabase` directory:

- **functions**
  - **\_shared** - Shared helpers, utilities and services
  - **tests** - Unit tests for each function
  - **health-check** -- Required edge function for CD.
  - All other folders will be individual edge functions
- **migrations** - Generated database migrations off schemas
- **schemas** - Declarative databases schemas in SQL
- **seeds** - Seed scripts that are executed in lexographical order, hence being prefixed with a number.

## Postgres → Edge Function invocation (`public.invoke_edge_function`)

Some triggers and cron jobs need to hand work off to an edge function
(notifications, system chat messages, reminders, etc.). They do this via
`public.invoke_edge_function(name text, payload jsonb)`, defined in
`schemas/0.common.sql`. It uses `pg_net` to POST to `/functions/v1/{name}`
with two headers:

- `Authorization: Bearer <sb_publishable_key>` — satisfies the Edge Runtime's
  API-key gate. Publishable keys carry no elevated privileges, so nothing
  bad happens if this header ever leaks.
- `x-function-secret: <sb_secret_key>` — the real app-level auth, verified
  by `requireFunctionSecret` middleware. Only pg_net → edge function
  traffic ever carries this header.

The helper looks up three values in Supabase Vault:

| Vault secret name    | Value                                                        |
| -------------------- | ------------------------------------------------------------ |
| `sb_url`             | Project base URL (e.g. `https://<ref>.supabase.co` in cloud) |
| `sb_publishable_key` | Publishable (anon) API key (`sb_publishable_…`)              |
| `sb_secret_key`      | Secret (service*role) API key (`sb_secret*…`)                |

### Local development

`[db.vault]` in `supabase/config.toml` resolves each entry from an env var
(via `env(VAULT_SB_URL)` etc.), and the local supabase scripts run under
`dotenvx run -f ../../.env.development.local`, so nothing to do beyond
keeping `.env.development.local` in sync with `.env.example` (which ships
the local Docker defaults).

### Deployed projects (staging / production)

The encrypted `.env.<environment>` file must contain `VAULT_SB_URL`,
`VAULT_SB_PUBLISHABLE_KEY`, and `VAULT_SB_SECRET_KEY` for that project.
The deploy workflow decrypts the file and puts every `VAULT_*` variable
into `$GITHUB_ENV`, so the Supabase CLI resolves `[db.vault]` correctly
when it pushes migrations. Supabase Branching (when enabled) reads
`config.toml` server-side and resolves the same references from the
branch's stored secrets.

Only `VAULT_SB_SECRET_KEY` needs to be set manually — `VAULT_SB_URL` and
`VAULT_SB_PUBLISHABLE_KEY` are derived from the base `BASE_SUPABASE_URL` and
`BASE_SUPABASE_PUBLISHABLE_KEY` values that are already required by the
client-side apps (web and native), so they will already be present in any
deployed environment's encrypted env file. Use `dotenvx set` to add the
one missing value:

- `VAULT_SB_SECRET_KEY` — the project's secret API key (service_role).

If any variable is missing at deploy time it resolves to an empty string
and `invoke_edge_function` raises `missing vault secrets sb_url,
sb_publishable_key and/or sb_secret_key` — surface this in Postgres logs
when debugging trigger fan-out.
