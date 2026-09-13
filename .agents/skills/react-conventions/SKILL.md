---
name: react-conventions
description: React coding conventions for @apps/web and @apps/native. Use when writing or reviewing React components, hooks, JSX, state management, or UI logic in either app.
---

# React Conventions

## React Compiler

The React Compiler is enabled in both `@apps/web` and `@apps/native`. It automatically applies memoization at build time, so **manual memoization should be avoided** unless the compiler cannot handle a specific case.

- Do **not** wrap components in `React.memo()` — the compiler handles this automatically
- Do **not** use `useMemo()` or `useCallback()` for performance optimization — the compiler infers these
- Only reach for manual memoization when you have a concrete, measured performance problem that the compiler cannot address (e.g., expensive computations depending on external mutable references)
- If you must use manual memoization, add a comment explaining why the compiler is insufficient in that case

```typescript
// ❌ Unnecessary — React Compiler handles this
const MyComponent = React.memo(({ value }: { value: string }) => {
  const formatted = useMemo(() => formatValue(value), [value]);
  const handleClick = useCallback(() => doSomething(value), [value]);
  return <div onClick={handleClick}>{formatted}</div>;
});

// ✅ Let the compiler do its job
const MyComponent = ({ value }: { value: string }) => {
  const formatted = formatValue(value);
  const handleClick = () => doSomething(value);
  return <div onClick={handleClick}>{formatted}</div>;
};
```

## Avoiding Unnecessary Effects

`useEffect` is an escape hatch for synchronizing with **external systems** (DOM APIs, third-party widgets, network). It should not be used for logic that can be expressed within the React model. See [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect).

**Derive state during rendering** — If a value can be computed from existing props or state, calculate it inline instead of storing it in state and syncing it with an Effect:

```typescript
// ❌ Avoid: redundant state kept in sync via an Effect
const [fullName, setFullName] = useState("");
useEffect(() => {
  setFullName(firstName + " " + lastName);
}, [firstName, lastName]);

// ✅ Calculate during render
const fullName = firstName + " " + lastName;
```

**Put user-event logic in event handlers, not Effects** — Code triggered by a user action (click, submit) belongs in the event handler, not in an Effect that watches a state change resulting from that action:

```typescript
// ❌ Avoid: event-specific side effect inside an Effect
const [submitted, setSubmitted] = useState(false);
useEffect(() => {
  if (submitted) {
    submitMutation.mutate(data);
  }
}, [submitted]);

// ✅ Trigger the mutation directly in the handler
function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  submitMutation.mutate(data);
}
```

**Reset state with a `key`, not an Effect** — When a prop change should reset all state of a component, pass the prop as `key` rather than calling `setState` inside an Effect:

```typescript
// ❌ Avoid: resetting state on prop change in an Effect
useEffect(() => { setComment(""); }, [userId]);

// ✅ Key tells React to mount a fresh instance
<Profile key={userId} userId={userId} />
```

**Avoid chaining Effects** — Chains of Effects that update state solely to trigger the next Effect cause multiple re-renders and fragile code. Compute derived values during rendering or consolidate updates inside the event handler instead.

**When Effects are appropriate:**

- Synchronizing with an external system (WebSocket, third-party library, browser API)
- Analytics events that fire when the component is displayed
- Subscriptions that need `useSyncExternalStore` as an alternative

## JSX Standards

- Use arrow functions for component definitions
- JSX boolean props without explicit `true`: `<Component disabled />` not `<Component disabled={true} />`
- Avoid unnecessary curly braces: `<Component title="text" />` not `<Component title={"text"} />`
- PascalCase for component names, camelCase for props
- Limit barrel files to max 2 exports for performance

## Adding New Components

1. Use `Aw` prefix for web components (e.g., `src/components/AwComponentName/`) and `An` prefix for native components (e.g., `src/components/AnComponentName/`)
2. Create a variants file if the component has multiple styles
3. Export from the component index for clean imports
4. Follow the `ComponentPropsType` naming pattern
5. Use `ChildrenOrI18nType` for components that accept text content

## Frontend Architecture

- **Component Hierarchy**: `routes/app` → `interactors` → `blocks` → `components`
- **Directory Structure**:
  - `components/` - Base UI components with project prefix (`Aw*`, `An*`)
  - `blocks/` - Domain-specific composite components
  - `interactors/` - Components that make network calls
  - `data/api/` - Raw Supabase client calls and edge function invocations, one file per domain
  - `data/queries/` - TanStack Query hooks + query key factories, one file per domain
  - `data/mutations/` - TanStack Query mutation hooks, one file per domain
  - `domain/` - App-specific Zod schemas and TypeScript types (forms, UI state, search params)
  - `utils/` - Pure helper functions (formatting, dates, etc.)
  - `stores/` - XState stores and Jotai atoms
  - `sandbox/` - Component testing in isolation

## Data Layer

The data layer is split into four responsibilities. Each has a single job and imports only from layers below it.

```
@libs/schemas                       ← DB types (Database) + edge function schemas/types
       ↓
data/api/{domain}Api.ts             ← supabaseClient queries and invokeEdgeFunction calls, error reporting via Sentry
       ↓
data/queries/{domain}Queries.ts     ← useQuery hooks + query key factories
data/mutations/{domain}Mutations.ts ← useMutation hooks + cache invalidation
       ↓
interactors / route components      ← consume hooks, never call supabaseClient directly
```

The Supabase client is typed with the auto-generated `Database` type from `@libs/schemas`, giving full type-safety for `.from()` calls — row shapes, insert/update payloads, and relationships are all inferred automatically. Edge function calls go through the `invokeEdgeFunction` helper, which is typed against `EdgeFunctionOptionsType` and `EdgeFunctionReturnType` from `@libs/schemas`.

Within a domain, not every layer is always needed. If a domain only fetches data, there is no mutations file. If a domain only submits data without needing to cache or read it, there is no queries file. Only create the files that are needed.

### `data/api/` — Raw API Calls

One file per domain (e.g., `usersApi.ts`). Each function calls `supabaseClient` directly for standard CRUD operations, or `invokeEdgeFunction` for complex transactions or operations with side effects. Handle errors with Sentry and return data. Components and hooks never call `supabaseClient` or `invokeEdgeFunction` directly.

```typescript
// data/api/usersApi.ts
import { EdgeFunctionsEnum } from "@libs/schemas";
import { sendSentryError } from "@/services/sentry";
import { invokeEdgeFunction, supabaseClient } from "@/services/supabase";

export const UsersApi = {
  // Direct Supabase client call — row type is auto-inferred from the generated `Database` type
  getUser: async (userId?: string | null) => {
    if (!userId) return null;

    const { data, error } = await supabaseClient
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      sendSentryError({ message: "Error getting user", error });
    }

    return data;
  },

  // Edge function call — typed against EdgeFunctionOptionsType / EdgeFunctionReturnType
  inviteUser: async (body: { email: string; name: string }) => {
    const { data, error } = await invokeEdgeFunction({
      func: EdgeFunctionsEnum.InviteUser,
      opts: { body },
    });

    if (error) {
      sendSentryError({ message: "Error inviting user", error });
    }

    return data;
  },
};
```

**Rules**:

- Use `supabaseClient` for standard CRUD — row types (`Row`, `Insert`, `Update`) are auto-inferred from the `Database` type; never manually redeclare them
- Use `invokeEdgeFunction` for operations with side effects (emails, webhooks), multi-step transactions, or anything requiring service role access
- All error handling goes here; query/mutation hooks should not contain `try/catch`
- Name the export as a plain object using PascalCase + `Api` suffix (e.g., `AdminsApi`, `UsersApi`)
- Import `supabaseClient` and `invokeEdgeFunction` from `@/services/supabase`

### Type Safety with `@libs/schemas`

The full API surface is type-safe end-to-end through generated schemas in `@libs/schemas`:

- **`Database`** — auto-generated from the Supabase DB schema. Used to type `supabaseClient`, so `.from("users").select("*")` returns `Database["public"]["Tables"]["users"]["Row"]` automatically. Regenerate with `pnpm db:gen-types`.
- **`EdgeFunctionsEnum`** — enum of all edge function names (e.g., `EdgeFunctionsEnum.HelloWorld = "hello-world"`)
- **`EdgeFunctionOptionsType`** — maps each enum key to its typed request body (Zod-validated in the edge function)
- **`EdgeFunctionReturnType`** — maps each enum key to its typed response shape
- **`dbSchemas.gen.ts`** — auto-generated Zod schemas for each table's `Row`, `Insert`, and `Update` shapes, useful for form validation

```typescript
// @libs/schemas — what's available
import {
  Database,                    // full DB type — passed to createClient<Database>()
  EdgeFunctionsEnum,           // "health-check" | "hello-world" | ...
  EdgeFunctionOptionsType,     // { [EdgeFunctionsEnum.HelloWorld]: { body: HelloWorldRequestType } }
  EdgeFunctionReturnType,      // { [EdgeFunctionsEnum.HelloWorld]: HelloWorldResponseType }
  helloWorldRequestSchema,     // Zod schema for request validation
  HelloWorldRequestType,       // inferred from helloWorldRequestSchema
} from "@libs/schemas";
```

To add a new edge function to the type-safe layer, define its request/response Zod schemas and inferred types in `@libs/schemas/src/appSchemas.ts`, then register it in `EdgeFunctionsEnum`, `EdgeFunctionOptionsType`, and `EdgeFunctionReturnType`.

### `data/queries/` — TanStack Query Hooks

One file per domain (e.g., `usersQueries.ts`). Each file exports a query key factory and `useQuery` hooks. Keep query keys colocated with the hooks that use them so cache invalidation always references the same keys.

```typescript
// data/queries/usersQueries.ts
import { useQuery } from "@tanstack/react-query";

import { UsersApi } from "../api/usersApi";

export const UsersQueryKeys = {
  all: ["users"] as const,
  details: (id: string) => [...UsersQueryKeys.all, "details", id] as const,
};

export const useGetUserQuery = (userId?: string | null) =>
  useQuery({
    queryKey: UsersQueryKeys.details(userId ?? ""),
    queryFn: () => UsersApi.getUser(userId),
    enabled: Boolean(userId),
  });
```

**Rules**:

- Query key factories use PascalCase + `QueryKeys` suffix (e.g., `UsersQueryKeys`, `AdminQueryKeys`)
- Hook names use `use` + entity + action + `Query` suffix (e.g., `useGetUserQuery`, `useGetCurrentAdminQuery`)
- Always use `as const` on query key tuples for precise type inference

### `data/mutations/` — TanStack Query Mutation Hooks

One file per domain (e.g., `usersMutations.ts`). Each `useMutation` hook handles cache invalidation via `onSuccess`. Import query keys from the sibling queries file — never hardcode key strings.

```typescript
// data/mutations/usersMutations.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { UsersApi } from "../api/usersApi";
import { UsersQueryKeys } from "../queries/usersQueries";

export const useInviteUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: { email: string; name: string }) =>
      UsersApi.inviteUser(body),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: UsersQueryKeys.all });
    },
  });
};
```

**Rules**:

- Hook names use `use` + action + entity + `Mutation` suffix (e.g., `useInviteUserMutation`, `useSignOutMutation`)
- Cache invalidation always goes in `onSuccess` using the shared query key factory
- Use `void` for fire-and-forget invalidations

### `domain/` — Schemas and Types

App-specific Zod schemas and TypeScript types that go beyond the auto-generated DB types. The primary use case is form validation schemas and UI-specific shapes.

```typescript
// domain/auth.ts
import { z } from "zod";

export const authSearchParamsSchema = z.object({
  redirect: z.string().optional().catch(undefined),
});
export type AuthSearchParamsType = z.infer<typeof authSearchParamsSchema>;
```

```typescript
// domain/common.ts — reusable Zod primitives for forms
export const requiredStringSchema = z
  .string({ error: t("common:validation.requiredField") })
  .trim()
  .min(1, t("common:validation.requiredField"));
```

**Rules**:

- DB row types (e.g., `Database["public"]["Tables"]["users"]["Row"]`) come from `@libs/schemas` — import them from there, do not redefine them
- `domain/` is for types that only exist on the client: form schemas, UI state shapes, search param schemas
- Follow the `PascalCase + "Type"` suffix convention for all exported types

### `utils/` — Pure Helper Functions

Stateless, framework-agnostic utility functions. No React, no API calls, no side effects.

```typescript
// utils/date.ts
export const formatDateToIso = (date: DateType) => dayjs(date).toISOString();
```

**Rules**:

- One concern per file (`date.ts`, `tailwind.ts`, `router.ts`, etc.)
- All exported functions must have JSDoc comments (see Comment Conventions in AGENTS.md)
- Never import from `data/`, `stores/`, or any React-specific module

## Authorization

**Declarative: `<Can>` component** — use in JSX to conditionally render UI based on permissions:

```tsx
import { subject } from "@casl/ability";
import { Can } from "@casl/react";

// When passing `this` with subject(), omit `a` / `an` — the subject type is encoded in the object.
// Use subject() for record-level conditions (e.g., checking ownership via { id: admin.id })
<Can
  I="update"
  this={subject("admins", { id: admin.id })}>
  <AwButton onPress={handleEdit} i18nKey="common:edit" />
</Can>

// Renders only if the current user can create admins (no subject resource needed)
<Can I="create" an="admins">
  <AwButton onPress={handleAdd} i18nKey="web:admins.addCta" />
</Can>

// Render prop — use when you need to keep an element in the tree but disable it based on permission
<Can I="update" this={subject("admins", { id: admin.id })}>
  {({ isAllowed }) => (
    <AwButton onPress={handleEdit} disabled={!isAllowed} i18nKey="common:edit" />
  )}
</Can>
```

**Imperative: `useHasPermission` hook** — use inside event handlers, or any logic that needs a boolean:

```typescript
import { useHasPermission } from "@/hooks/useHasPermission";

const canEdit = useHasPermission({
  action: "update",
  subject: "admins",
  subjectResource: { id: targetAdmin.id },
});
```

**Outside React: `hasPermission` utility** — use in route loaders, server utilities, or any code that runs outside the React tree (must supply `userId` and `userRole` manually):

```typescript
import { hasPermission } from "@/utils/authorization";

const canEdit = hasPermission({
  userId: currentAdmin.id,
  userRole: currentAdmin.isSuperAdmin ? "SUPER_ADMIN" : "ADMIN",
  action: "update",
  subject: "admins",
  subjectResource: { id: targetAdmin.id },
});
```

**Rules**:

- Client-side authorization is **UI-only** — it hides or disables elements, but the server always enforces the real permission check
- Use `<Can>` for conditional rendering; use `useHasPermission` inside components for imperative checks (event handlers, guards); use `hasPermission` outside the React tree
- Never call `@libs/authorization` directly in components — use the `Can` component from `@casl/react`, the `useHasPermission` hook, or the `hasPermission` helper from `@/utils/authorization`
- The `AuthorizationContextProvider` must wrap the app before any `<Can>` or `useHasPermission` usage — it is initialized with null permissions and updated once the current user is fetched

## State Management

- **Jotai atoms** for simple global state — stored in `src/stores/atoms.ts` using `atomWithMMKV()` (in native) and `atom()` (in web) helper
- **XState stores** for complex state with actions — stored in `src/stores/` with pattern `nameStore` (see `authStore.ts`)
- **TanStack Query** for server state — mutations in `src/data/mutations/`, queries in `src/data/queries/`
- **React Hook Form + Zod** for form state — schemas in `src/domain/` and composed from generated DB schemas in `@libs/schemas`

## Internationalization (i18n)

> [!NOTE]
> The i18n overview (library, file structure, key rules) is in `AGENTS.md`. This section covers component-level usage.

**Prefer `i18nKey` / `i18nOptions` props over the translation hook.** Text components (`AwText`, `AnText`, `AnLink`, etc.) accept these props directly — use them instead of reaching for `useTranslation` or `useTranslate`:

```tsx
// ✅ Preferred — no hook needed
<AwText i18nKey="web:dashboard.title" />
<AnText i18nKey="native:user.greeting" i18nOptions={{ name: user.firstName }} />

// ❌ Avoid — unnecessary hook when a text component suffices
const { t } = useTranslation();
<AwText>{t("web:dashboard.title")}</AwText>
```

Use the translation hook only when you need the translated string outside of a text component — for example, in a `placeholder`, `aria-label`, `alert()`, or other non-renderable context:

```tsx
// ✅ Acceptable — no text component available for this prop
const { t } = useTranslation();
<input placeholder={t("web:form.emailPlaceholder")} />;
```

Always add new keys to `@libs/i18n` before use — see `AGENTS.md` for namespace format and file structure.
