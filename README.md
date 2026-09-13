<div align="center">
  <img src="https://github.com/user-attachments/assets/b9a370d6-6f2e-4b68-b8e9-fc93190e8336" width="600" />
  <p><br />This repository serves as a blueprint for creating Supabase monorepo projects by Ryo.</p>
</div>

## Directory

- **[@apps/native](apps/native)** - Expo universal app (mobile + web)
- **[@apps/web](apps/web)** - React web app for admins
- **[@apps/supabase](apps/supabase)** - Supabase migrations and edge functions
- **@libs/schemas** - Zod schemas and TS types for Supabase DB (auto-generated) and edge functions (manually defined)
- **@tooling/eslint** - ESLint config
- **@tooling/github** - Common Github actions
- **@tooling/prettier** - Prettier config
- **@tooling/typescript** - Typescript config

## Requirements

1. [Node.js 22](https://nodejs.org/)
2. [Deno 2.5.6](https://deno.com/)
3. [PNPM](https://pnpm.io/)
4. [Turbo](https://turbo.build/)
5. [Supabase CLI](https://supabase.com/docs/guides/local-development/cli/getting-started)
6. One of the following Docker Runtimes:
   1. [colima](https://github.com/abiosoft/colima) (Recommended)
   2. [Docker Desktop](https://docs.docker.com/get-docker) (If GUI preferred)
7. [React Native](https://reactnative.dev/docs/set-up-your-environment)
8. [dotenvx](https://dotenvx.com/docs/install)

> [!TIP]
> This project has been configured with [mise](https://mise.jdx.dev/) which can install the correct Node and Deno versions with a concise `mise install` command and auto select the correct versions when you `cd` into the directory.

## Template Usage

> [!CAUTION]
> Make sure to follow all these steps carefully as any missed steps could cause issues in local development, CI, and/or CD

1. Clone this repo and rename the folder to `<PROJECT_NAME>-monorepo`. Also rename the workspace-settings file and the project name in root package.json.
2. Using any email account, setup an org and a project for development environment on Supabase dashboard. Don't need to care about staging and development now as they will be configured afterwards.
3. Run `mise install` and `pnpm install`. Clear the value for `DOTENV_PUBLIC_KEY_DEVELOPMENT`.
4. Add environment specific values for `SB_PROJECT_ID`, `SB_URL` and `SB_PUBLISHABLE_KEY` to `.env.development`. (do not need to change the `.env.example` one).
5. Add `SB_DB_PASSWORD` for development env using [dotenvx encryption](https://dotenvx.com/docs/quickstart#add-encryption).
6. Add `SB_DB_CONNECTION_STRING` for development env using [dotenvx encryption](https://dotenvx.com/docs/quickstart#add-encryption). This should be the Transaction pooler IPv4 value from the connect button.
7. Upload `.env.keys` content to project 1Password as a secure note. Then run `pnpm run setup`
8. Link to the live project:
   ```shell
   pnpm in:supabase sb:login
   pnpm in:supabase sb:link
   ```
9. Run `pnpm initial-setup` to run setup scripts
10. Make sure setup scripts ran correctly by running `pnpm check-all` and fix any mistakes.
11. Remove the `initial-setup` script in workspace's root `package.json` and `setup` scripts in `apps/web/package.json`, `apps/native/package.json` and `apps/supabase/package.json`
12. Reset git history with `rm -rf .git && git init`
13. Add `SUPABASE_ACCESS_TOKEN` as a [Github Actions repository secret](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository). Generate this token from [Supabase Dashboard](https://supabase.com/dashboard/account/tokens) under Account >> Access Tokens.
14. Create a [Github Environment](https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-deployments/managing-environments-for-deployment) for development deployment environment and add the relevant dotenvx private key value using the `DOTENV_PRIVATE_KEY` key name as a [Github Actions secret](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-an-environment).
15. Delete this section from README.md
16. Commit the changes and publish your new repo

---

## Getting Started

1. Get `.env.keys` content from 1Password and add it to to monorepo root (only needed when setting up project on your machine for the first time).
2. Ensure Docker Runtime is started.
3. Run setup scripts
   ```shell
   pnpm run setup
   ```
4. Start the supabase stack:
   ```shell
   pnpm in:supabase sb:start
   ```
5. Start the app:
   ```shell
    pnpm dev
   ```

## Workflow

### Preview Links

In order to have preview environments for QA reviews on PRs you should follow these steps:

1. Set up previews on [Render](https://render.com/) account 
2. Connects repository to Render by pressing New Blueprint Instance. (Repo will only be available to be linked after a owner grants access). [Paul](https://github.com/PaulWareham2022) is also required to have access to the repo with a `MAINTAIN` role since it's his Github account that is connected to Render.
3. Make sure you create these [Repository Secrets](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions) into GitHub repo:

   3.1 `RENDER_API_KEY` (Under Render's General User Account Settings)

   3.2 `SUPABASE_ACCESS_TOKEN` (From Supabase Dashboard)

4. Open `ci.yaml` file and update the `env:` section `SUPABASE_PROJECT_ID`, `ADMIN_RENDER_APP_NAME` and `ADMIN_PREVIEW_URL` with right values.
5. Still in `ci.yaml` file, uncomment the `setup-preview` step.
6. Open `render.yaml` and make sure you update `fromGroup` from `envVars` section with the right name from Render's Environment Groups dashboard.

### Environment Variables

[dotenvx](https://github.com/dotenvx/dotenvx) is used to store environment variables in version control in a secure manner.

It works by encrypting certain secrets in the `.env.<ENVIRONMENT>` files so that they can be commited to Github, with the environment specific private keys being stored in a `.env.keys` file.

Values are usually only encrypted for server variables on deployed environments (like the `DB_CONNECTION_URL`). However, if you need to use any of the encrypted secrets in local development, you'll need to create an `.env.keys` file at the project root and add the applicable environment specific `DOTENV_PRIVATE_KEY_<ENVIRONMENT>` from 1Password to it.

For example, if you need to access the development secrets:

```

#/!!!!!!!!!!!!!!!!!!!.env.keys!!!!!!!!!!!!!!!!!!!!!!/
#/ DOTENV_KEYs. DO NOT commit to source control /
#/ [how it works](https://dotenv.org/env-keys) /
#/--------------------------------------------------/
DOTENV_PRIVATE_KEY_DEVELOPMENT="<DEVELOPMENT_KEY_FROM_1PASSWORD>"

```

#### Typed environment variables

For added type safety and optional parsing of boolean and number variables, we use `@t3-oss/env-core` to parse and validate the environment variables in `envVariables.ts` files of each workspace.
Always use the variables from the generated `envVariables` export of this file, not from `process.env`.

When making changes to the env variables be sure to also update the schema in the appropriate `envVariables.ts` file(s) of the consumers if necessary.

> [!IMPORTANT]
> The exception to this is the Supabase edge functions that requires `Deno.env.get("ENV_KEY")` to be used to load the variables.
> When adding environment variables to add it to the relevant envVariables zod schema. For example, in `native`, update `envToValidate` in `src/utils/envVariables.ts`

### Additional environments

Once required, you should follow these steps to set your staging and/or production environment

1. In your Supabase dashboard, create a project for each required environment
2. Change the environment specific values for `SB_PROJECT_ID`, `SB_URL` and `SB_PUBLISHABLE_KEY` to `.env.(staging|production)`
3. Add `SB_DB_PASSWORD` for each env (staging/production) using [dotenvx encryption](https://dotenvx.com/docs/quickstart#add-encryption).
4. Add `SB_DB_CONNECTION_STRING` for each env (staging/production) using [dotenvx encryption](https://dotenvx.com/docs/quickstart#add-encryption).
5. Create a [Github Environment](https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-deployments/managing-environments-for-deployment) for each deployment environment and add the relevant dotenvx private key value using the `DOTENV_PRIVATE_KEY` key name as a [Github Actions secret](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-an-environment).
6. Fix Snaplet:

```
pnpm dlx @snaplet/seed generate
```

### Supabase

#### Database

1. Create a new table by creating a `<TABLE_NAME>.sql` file in `supabase/schemas` file, or make changes to an existing table by making changes to the given schema file.

2. Generate a migration based on your changes by running:
   ```shell
   pnpm in:supabase db:gen-migration <NAME_OF_MIGRATION>
   ```
3. Review the generated migration file && if it's correct, apply the changes to the local environment:
   ```shell
   pnpm in:supabase db:migrate
   ```
4. If changes need to be made to the seed data based off the migration, update
   `apps/supabase/supabase/seed.sql`

> [!TIP]
> Isolate migrations to a single table at a time for easier rollbacks.

> [!NOTE]
> Generating migrations will stop the local supabase stack, and applying them will restart it. This is required for proper diffing.

### Edge Functions

1. Serve the edge functions to enable hot-reloading:
   ```shell
   pnpm in:supabase fn:serve
   ```
2. Create a new edge function using kebab-casing for the name:
   ```
   pnpm in:supabase fn:new <NAME_OF_FUNCTION>
   ```
3. Create a corresponding test for the edge function in
   `/apps/supabase/supabase/functions/tests/<NAME_OF_FUNCTION>-test.ts`
4. Ensure `.env.test` has `SB_URL` and `SB_PUBLISHABLE_KEY` with values from
   `pnpm sb:status`
5. Test the edge function:
   ```shell
   pnpm in:supabase fn:test
   ```
6. (Optional) If there are any edge functions that need to be served:
   ```shell
   pnpm in:supabase fn:serve
   ```

#### Generating Edge Function Tests

To generate comprehensive test files for new edge functions, use the `generate-tests` prompt with GitHub Copilot:

1. Reference the prompt file by starting an Agent message with `/generate-tests`
2. Specify the edge function to test (e.g., "the hello-world edge function")
3. Copilot will create a test file at `apps/supabase/supabase/functions/tests/{function-name}-test.ts` with:
   - Authenticated happy path tests
   - Unauthenticated access tests (for auth-protected functions)
   - Authorization tests (for functions using `hasRequiredPermissions`)
   - Database verification and cleanup (for mutation functions)

The prompt automatically handles:

- Correct test helpers (`createAuthenticatedTestClient`, `invokeEdgeFunction`, etc.)
- Type-safe invocation and assertions via `EdgeFunctionsEnum` mapped types
- Proper Deno test structure with `@std/assert`

Example:

```
/generate-tests for the create-appointment edge function
```

### Command Aliases

For the purpose of brevity, some commonly used Supabase CLI commands have been aliased (note they'll need to be run with the `pnpm in:supabase ` prefix):

1. Supabase (`sb:` prefix)
   - `sb:login` to login and generate an access token
   - `sb:link` to connect to a live project and set it as the remote
   - `sb:status` to output the status of a running stack
   - `sb:start` to start the stack
   - `sb:stop` to shutdown the stack

2. Database (`db:` prefix)
   - `db:pull` to pull any changes from the live project's database
   - `db:create-migration <MIGRATION_NAME>` to create a new migration file with
     a given name
   - `db:migrate` to apply any pending migrations to the local database
   - `db:gen-types` to generate Typescript types from the database schema
   - `db:reset` to reset the local database and reseed it using
     `supabase/seed.sql`
   - `db:lint` to lint the local database for schema errors

3. Edge Functions (`fn:` prefix)
   - `fn:new <FUNCTION_NAME>` to create a new edge function with a given name
   - `fn:serve` to serve the edge functions with hot-reloading
   - `fn:test` to run all tests for the edge functions

You can also use the Supabase CLI directly if desired. The documentation for it
can be found [here](https://supabase.com/docs/reference/cli).

### Coding Conventions

Coding conventions, architecture decisions, and best practices for this repo are documented in agent instruction files that are automatically loaded by AI coding assistants (GitHub Copilot, Claude Code, Cursor, etc.):

- [AGENTS.md](AGENTS.md) — general architecture, Supabase patterns, TypeScript and comment conventions
- [.agents/skills/react-conventions/SKILL.md](.agents/skills/react-conventions/SKILL.md) — React components, JSX, state management, data fetching, effects, and authorization for `@apps/web` and `@apps/native`
- [.agents/skills/supabase-conventions/SKILL.md](.agents/skills/supabase-conventions/SKILL.md) — edge function structure, SQL schemas, migrations, RLS policies, and Supabase client usage for `@apps/supabase` and `@libs/schemas`

These files are the source of truth for how to write code in this repo — consult them when in doubt about patterns or conventions.

#### On-demand skills

Some skills are **not** auto-loaded and are only run when you explicitly ask for them:

- [.agents/skills/security-audit/SKILL.md](.agents/skills/security-audit/SKILL.md) — a periodic, read-only security posture audit. Statically enumerates the security model (RLS policies, CASL↔RLS parity, edge function auth/authz, privileged client usage), PII reaching logs and Sentry, and the dependency supply chain, then reports severity-triaged findings with exploit paths and ticket text. Complements `/security-review`, which only covers the current diff. In Claude Code, run `/security-audit`.

### Tips & Best Practices

#### Monorepo

- It is recommended to use a standalone terminal (instead of the built-in terminal in VSCode) when running commands on the app as the Turborepo shell does not handle window resizing well and can cut off the logs.

- Packages should be added to the individual workspaces and not the root.

  To add a package to a workspace, run:

  ```shell
  pnpm --filter <WORKSPACE_NAME> add <PACKAGE_NAMES>
  ```

  Example:

  ```shell
  pnpm --filter @apps/web add dayjs

  # Can also use helper shorthand
  pnpm in:web add dayjs
  ```

- All CLI commands should be run from project root.

  To run a one-off workspace command from root:

  ```shell
  pnpm --filter <WORKSPACE_NAME> <COMMAND>
  ```

  Example:

  ```shell
  pnpm --filter @apps/web dev

  # Can also use helper shorthand
  pnpm in:web dev
  ```

#### Supabase

- Make all changes through code instead of the dashboard to enable better
  consistency across all environments.
- Have good test coverage for edge functions with the goal being to test
  behaviour and not implementation.
- Use the CD process to deploy changes to live projects instead of manually from
  the CLI.
- Use snake_case for table and columns names to follow Postgres conventions.
- Use kebab-case for edge function names because hyphens are the most
  URL-friendly.
- Use UUIDs for primary keys instead of a sequence to prevent information
  leakage.
- Use edge functions instead of database functions for complex database
  transactions and sagas for better observability and debugging
- Edge functions that call the database should be invoked at the same region as
  the database to reduce round trip latency

## ⚠️ Known Issues

### Windows

- **Filepath too long**: [Fix instructions](https://abp.io/docs/9.3/kb/windows-path-too-long-fix)
