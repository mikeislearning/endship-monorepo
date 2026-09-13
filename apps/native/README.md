## Project Layout

Within the `src` directory:

- **@types** - Type declarations to extend third party library types
- **app** - Routes for [Expo Router](https://docs.expo.dev/versions/latest/sdk/router/) that are composed of `interactors`, `blocks`, and `components`.
- **blocks** - Domain specific components composed of other `blocks` and `components`
- **components** - Generic base components that begin with two letter project prefix (to avoid clashing or confusing the names with library components).
- **contexts** - React context providers
- **data**
  - **api** - Network calls grouped by context in an object literal (e.g. AuthApi, AccountApi, etc)
  - **mutations** - [React Query mutation](https://tanstack.com/query/latest/docs/framework/react/guides/mutations) hooks grouped by context that invoke corresponding functions from the api.
  - **queries** - [React Query query](https://tanstack.com/query/latest/docs/framework/react/guides/queries) hooks grouped by context that invoke corresponding functions from the api. Query keys are defined and colocated with their corresponding queries.
- **domain** - Types and [zod](https://github.com/colinhacks/zod) validation schemas for domain models, along with constants.
- **hooks** - Custom hooks
- **i18n** - [i18next](https://www.i18next.com/) client
- **interactors** - Components that make network calls composed of `blocks` and `components`.
- **sandbox** - Space to test UI components and blocks in isolation.
- **services** - Config code for third party services like Sentry, Supabase, and Amplify.
- **stores** - [XState stores](https://stately.ai/docs/xstate-store) stores and [Jotai](https://jotai.org/) atoms.
- **utils** - Utility helpers
