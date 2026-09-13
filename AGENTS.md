# Agent Instructions for Template

This document provides instructions for AI coding agents to generate consistent, high-quality code that follows the project's conventions and best practices.

## Architecture Overview

This is a TypeScript monorepo using a **layered architecture** with Supabase as the backend:

- **@libs/schemas**: Auto-generated Zod schemas and TypeScript types from Supabase DB + manually defined edge function schemas
- **@libs/authorization**: CASL-based permission rules
- **@libs/i18n**: Internationalization resources for all apps
- **@apps/supabase**: Supabase migrations, edge functions (Deno/Hono), and database schemas
- **@apps/web**: React/Vite web app with TanStack Router
- **@apps/native**: Expo universal app (iOS/Android/web)
- **@tooling/\***: Shared ESLint, Prettier, TypeScript configs

## Key Patterns

### Supabase-First Development

- Define database schemas in `@apps/supabase/supabase/schemas/*.sql` files
- Auto-generate TypeScript types and Zod schemas via `pnpm db:gen-types`
- **RLS must be enabled on all tables** - security is enforced at the database level
- **Direct Supabase client calls are the default** for all CRUD operations from frontend apps
- Edge functions are reserved for complex sagas or operations with side effects (emails, webhooks, multi-step transactions)
- Edge function schemas defined in `@libs/schemas/src/appSchemas.ts`

#### When to Use Edge Functions vs Direct Client Calls

| Use Direct Supabase Client      | Use Edge Functions                                       |
| ------------------------------- | -------------------------------------------------------- |
| Simple CRUD operations          | Multi-step transactions requiring rollback               |
| Queries with RLS-protected data | Operations with external side effects (emails, webhooks) |
| Real-time subscriptions         | Complex business logic spanning multiple tables          |
| File uploads to Storage         | Operations requiring service role (bypassing RLS)        |
| Authentication flows            | Scheduled jobs or background processing                  |

For edge function structure, RLS patterns, migration workflow, and client usage details, see [`.agents/skills/supabase-conventions/SKILL.md`](.agents/skills/supabase-conventions/SKILL.md).

### Authorization Layer

- **CASL-based permissions** defined in `@libs/authorization/src/index.ts`
- Role-based access control with actions: `create`, `read`, `list`, `update`, `delete`
- Permissions checked in edge functions and RLS policies

### Environment Variables

- Use `@t3-oss/env-core` for type-safe env vars in web apps
- Use Zod schema validation for Expo apps
- Define schemas in `src/utils/envVariables.ts` files
- Always import from `envVariables` export, never `process.env` directly
- Web apps use `VITE_` prefix for client-side variables
- Expo apps use `EXPO_PUBLIC_` prefix for client-side variables
- Edge functions use `Deno.env.get()` for Supabase-injected variables

### Naming Conventions

- **Type aliases**: PascalCase + "Type" suffix (e.g., `UserInsertType`)
- **Interfaces**: PascalCase + "I" prefix (e.g., `IApiResponse`)
- **Enums**: PascalCase + "Enum" suffix (e.g., `StatusEnum`)
- **Boolean variables**: camelCase with prefixes `is|should|has|can|will` (e.g., `isEnabled`, `hasPermission`)
- **Database tables**: snake_case with plural names (e.g., `clients`, `appointments`)
- **Edge functions**: kebab-case folder names (e.g., `hello-world`, `health-check`)
- **React components**: PascalCase, use 2-letter project prefix for base components (e.g., `AbButton`, `AbInput`)
- **Lucide icons**: Import with "Icon" suffix (e.g., `import { User as UserIcon } from "lucide-react-native"`)

### Internationalization (i18n)

- Use `@libs/i18n` for all user-facing copy across the monorepo
- **Namespace format**: `{app}:{section}.{key}` (e.g., `native:user.title`, `web:dashboard.subtitle`)
- **App-specific copy**: Store in respective app namespaces (`native.json`, `web.json`, `supabase.json`)
- **Shared copy**: Common text used across apps goes in `common.json`
- **Component demos**: Sandbox-only copy for component testing goes in `sandbox.json`
- Always use i18n keys instead of hardcoded strings in components

## File Organization

### Import Path Mapping

Use absolute imports with `@/` prefix:

```typescript
import { AbButton } from "@/components/AbButton";
import { UserType } from "@/domain/users";
import { useAuthStore } from "@/stores/authStore";
```

### File Structure Conventions

- **App Schemas**: `libs/schemas/src/appSchemas.ts`
- **Authorization**: `libs/authorization/src/index.ts`
- **Environment**: Each app has `src/utils/envVariables.ts`
- **Supabase** (edge functions, schemas, migrations): see [`.agents/skills/supabase-conventions/SKILL.md`](.agents/skills/supabase-conventions/SKILL.md)

## Essential Commands

```bash
# Workspace shortcuts
pnpm in:web <cmd>               # Run command in web workspace
pnpm in:supabase <cmd>          # Run command in supabase workspace

# Development
pnpm dev                        # Start all apps in development mode
pnpm check-all                  # Run format, lint, and typecheck
```

For Supabase CLI commands (local stack, migrations, type generation, edge functions), see [`.agents/skills/supabase-conventions/SKILL.md`](.agents/skills/supabase-conventions/SKILL.md).

## Critical Integration Points

- **Edge Functions**: Import shared utilities from `@/` paths
- **Supabase Client**: Use `createStandardClient()` for user-initiated requests (enforcing RLS), and `createPrivilegedClient()` only for edge function side effects that require full database access (bypassing RLS).
- **Authorization**: Import rules from `@libs/authorization`, apply in edge functions and RLS
- **Frontend**: Use Supabase client from `@/services/supabase` for all data operations
- **Type Safety**: Auto-generated types from `@libs/schemas` ensure DB ↔ frontend type safety

## Code Standards

### TypeScript Conventions

- Prefer `type` over `interface` for better IDE support
- Use explicit type coercion: `Boolean(value)` instead of `!!value`
- Handle promises properly or use `void` for fire-and-forget: `void someAsyncFunction()`
- Limit functions to max 2 parameters - use object destructuring for more: `({ param1, param2 }) => {}`
- Prefer arrow functions: `const myFunction = () => {}` over `function myFunction() {}`

### React Conventions

React-specific conventions — components, JSX, state management, data fetching, effects, and authorization — are documented in [`.agents/skills/react-conventions/SKILL.md`](.agents/skills/react-conventions/SKILL.md). This skill is automatically loaded by AI coding assistants when working on `@apps/web` or `@apps/native`.

### Supabase/Deno Standards

Edge function conventions — routing, request validation, response typing, RLS, and client usage — are documented in [`.agents/skills/supabase-conventions/SKILL.md`](.agents/skills/supabase-conventions/SKILL.md). This skill is automatically loaded by AI coding assistants when working on `@apps/supabase` or `@libs/schemas`.

### On-Demand Skills

These skills are **not** coding conventions — do **not** load or apply them while writing code. Load one only when the task it names is the task at hand.

- [`.github/skills/code-review/SKILL.md`](.github/skills/code-review/SKILL.md) — the rule set and severity ladder for **reviewing a diff or PR**: layer boundaries, RLS and edge function authorization, CASL parity, DRY/simplicity, React/Expo conventions, naming. Also lists the known false positives not to flag. Used automatically by GitHub Copilot code review on pull requests. Load it when reviewing a change — not when authoring one; the conventions above and the workspace skills are the source for writing code.
- [`.agents/skills/security-audit/SKILL.md`](.agents/skills/security-audit/SKILL.md) — periodic, read-only, static security posture audit (RLS, CASL↔RLS parity, edge function authz, PII in telemetry, supply chain). Whole-repo, not change-scoped. Run it only when the user explicitly asks. In Claude Code: `/security-audit`.

## Comment Conventions

### General Principles

Comments should explain **why** something is done, not **what** is being done. The code itself should be readable enough to convey the "what". Avoid restating what is obvious from the code.

```typescript
// ❌ Bad — describes what the code does (already obvious)
// Set isLoading to true
setIsLoading(true);

// ❌ Bad — restates the condition
// If the client has no email, return early
if (!client.email) return;

// ✅ Good — explains the business reason
// Clients without email cannot receive appointment confirmations
if (!client.email) return;

// ✅ Good — explains a non-obvious constraint
// ! 200 is the current limit set by the API
// TODO: Try see if we can increase this limit on production
export const CLIENTS_BATCH_SIZE = 200;
```

### When to Add Comments

- **Edge cases**: Explain why a particular edge case is handled a specific way
- **Complex logic**: Add context for non-trivial algorithms, data transformations, or `useEffect` dependencies
- **Business rules**: Document domain-specific rules that aren't self-evident from code
- **Workarounds**: Explain why a workaround exists and link to related issues if applicable
- **Non-obvious decisions**: Clarify why one approach was chosen over another

```typescript
// ✅ Good — explains complex useEffect purpose
useEffect(() => {
  // Reset form when switching between appointment and personal time tabs
  // to prevent stale data from the previous tab leaking into the submission
  form.reset(getDefaultValues(selectedTab));
}, [selectedTab]);

// ✅ Good — explains edge case
// ? Using union to allow empty string as valid input
export const optionalEmailSchema = z.union([
  z.literal(""),
  z.email().trim().optional(),
]);
```

### JSDoc for Utility Functions

All exported utility functions should use JSDoc syntax for better IDE integration (hover tooltips, autocomplete docs). Include a brief description and, where helpful, clarify parameters or return values:

```typescript
/**
 * Formats a phone number as national or international format.
 *
 * If the value starts with '+', attempts international format.
 * Otherwise, formats as national using the provided country code (defaults to 'CA').
 * Returns the original value if formatting isn't possible or would shorten the input.
 */
export const formatPhoneNumber = (
  value?: string | null,
  country: CountryCode = "CA",
): string => { ... };

/**
 * Get the alphabet section letter for a client based on their last name.
 * Returns "#" for clients with no last name or last names starting with non-alpha characters.
 */
export const getClientSectionLetter = (
  lastName: string | null | undefined,
): AlphabetSectionType => { ... };
```

### Comment Style Markers

- `// TODO:` — planned improvements or known limitations
- `// !` — important warnings or constraints (e.g., API limits)
- `// ?` — explanations for potentially confusing design choices
- `// Mapping generated from...` — origin of hardcoded values
