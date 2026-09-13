---
name: expo-conventions
description: Expo and React Native conventions for @apps/native. Use when writing or reviewing Expo Router screens, native components, navigation, storage, theming, or platform-specific logic.
---

# Expo Conventions

> [!NOTE]
> This skill covers Expo/React Native–specific patterns for `@apps/native`. Shared React conventions (React Compiler, Effects, JSX, data layer, state management, i18n, authorization) are in `.agents/skills/react-conventions/SKILL.md` — load that skill too when working on native.

## Routing (Expo Router)

Routes are file-based under `src/app/`. Use **route groups** for layout nesting and **`_layout.tsx`** files for navigation structure:

```
src/app/
├── _layout.tsx          # Root layout (providers, splash screen)
├── +html.tsx            # Web root HTML configuration
├── +not-found.tsx       # 404 fallback
└── (authed)/            # Auth-protected route group
    └── (tabs)/          # Tab navigator
        └── _layout.tsx  # Tab bar configuration
```

**Provider nesting order** should follow this pattern (outermost → innermost):

```typescript
// ✅ Correct provider order in _layout.tsx
function RootLayout() {
  return (
    <ThemeProvider>
      <GestureHandlerRootView>
        <SafeAreaProvider>
          <KeyboardProvider>
            <QueryClientProvider client={queryClient}>
              <BottomSheetModalProvider>
                <Slot />
                <AnToaster />
                <PortalHost />
              </BottomSheetModalProvider>
            </QueryClientProvider>
          </KeyboardProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}

export default Sentry.wrap(RootLayout);
```

**Always export an `ErrorBoundary`** from the root layout for crash recovery:

```typescript
export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return <ErrorFallback error={error} resetError={retry} />;
}
```

**Rules**:

- Always wrap the root component with `Sentry.wrap()`
- Call `SplashScreen.preventAutoHideAsync()` at module scope, hide it after initialization completes
- Register the navigation container ref with Sentry's `navigationIntegration` in a `useEffect`
- Use `<Slot />` in root layout (not `<Stack />`), so child route groups control their own navigator

## Styling (NativeWind)

NativeWind 4 provides Tailwind CSS utility classes for React Native. All styling uses `className` props — avoid inline `style` objects unless interfacing with third-party libraries.

```typescript
// ✅ NativeWind class-based styling
<AnBox className="flex-1 items-center justify-center bg-background px-4">
  <AnText variant="lg" className="text-foreground" />
</AnBox>

// ❌ Avoid inline style objects
<View style={{ flex: 1, alignItems: "center", backgroundColor: "#fff" }}>
```

### Platform-Specific Styles

Use `Platform.select()` inside CVA variants or `cn()` calls for web-only interactions (hover, focus-visible) and native-only interactions (active):

```typescript
// ✅ Platform-aware variant
cn(
  "active:bg-primary/90 bg-primary shadow-sm",
  Platform.select({ web: "hover:bg-primary/90 focus-visible:ring-[3px]" }),
);

// ❌ Don't apply hover styles unconditionally — they don't exist on native
("bg-primary hover:bg-primary/90");
```

### Utility Function

Use `cn()` from `@/utils/tailwind` for conditional class merging:

```typescript
import { cn } from "@/utils/tailwind";

<AnBox className={cn("flex-1", { "px-4": hasHorizontalPadding, "pt-safe": hasTopPadding })} />
```

### Custom Fonts

Three font weights registered via `expo-font`. Use Tailwind font family utilities:

```typescript
// ✅ Use font utility classes
<AnText className="font-primary">Regular</AnText>
<AnText className="font-primary-medium">Medium</AnText>
<AnText className="font-primary-semibold">Bold</AnText>

// ❌ Don't use fontWeight style — use the correct font family class instead
<Text style={{ fontWeight: "bold" }}>
```

## Component Patterns (`An*` Prefix)

All base UI components use the `An` prefix. Components with multiple style variations use a companion `variants.tsx` file:

```
src/components/
├── AnButton/
│   ├── AnButton.tsx     # Component implementation
│   └── variants.tsx     # CVA variant definitions
├── AnText/
│   ├── AnText.tsx
│   └── variants.tsx
├── AnIcon.tsx           # Simple components are single files
└── AnBox.tsx
```

### Variant Pattern (CVA)

Use `class-variance-authority` for variant definitions. Include platform-specific styles via `Platform.select()` when behavior differs between web and native:

```typescript
// variants.tsx
export const buttonVariants = cva(
  cn(
    "group relative shrink-0 flex-row items-center justify-center gap-2 rounded-md",
    Platform.select({
      web: "outline-none transition-all focus-visible:ring-[3px] disabled:pointer-events-none",
    }),
  ),
  {
    variants: {
      variant: {
        default: cn(
          "active:bg-primary/90 bg-primary shadow-sm",
          Platform.select({ web: "hover:bg-primary/90" }),
        ),
        ghost: cn(
          "active:bg-accent",
          Platform.select({ web: "hover:bg-accent" }),
        ),
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3",
        lg: "h-10 px-6",
        icon: "size-9",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);
```

### Props Pattern

Compose `ComponentProps`, `ChildrenOrI18nType`, and `VariantProps`:

```typescript
export type AnButtonPropsType = ComponentProps<typeof AnTouchableOpacity> &
  ChildrenOrI18nType &
  VariantProps<typeof buttonVariants> & {
    textVariant?: TextVariantType;
    isLoading?: boolean;
    isDisabled?: boolean;
    IconComponent?: LucideIcon;
    iconProps?: ComponentProps<typeof AnIcon>;
    iconPosition?: "left" | "right";
  };
```

**Rules** (see also react-conventions "Adding New Components" for shared naming and typing rules):

- Prefer `isDisabled` / `isLoading` boolean props over `disabled` for consistency with project naming conventions
- Export variant types when other components need them: `export type ButtonVariantType = VariantProps<typeof buttonVariants>["variant"]`

### Core Components

**`AnBox`** — basic layout container (wraps `View`):

```typescript
<AnBox className="flex-1 items-center justify-center">
  <AnText i18nKey="native:home.welcome" />
</AnBox>
```

**`AnText`** — text component with built-in i18n via `<Trans>`:

```typescript
// ✅ Preferred — use i18nKey for user-facing text
<AnText variant="lg" i18nKey="native:home.title" />
<AnText variant="md" i18nKey="native:greeting" i18nOptions={{ name: user.firstName }} />

// ✅ Children for non-translatable text (numbers, codes)
<AnText variant="sm">{formattedDate}</AnText>
```

**`AnIcon`** — Lucide icon wrapper with NativeWind `className` support via `cssInterop`:

```typescript
import { ArrowRight as ArrowRightIcon } from "lucide-react-native";

// ✅ Always use "Icon" suffix on imports, pass via `as` prop
<AnIcon as={ArrowRightIcon} className="text-primary" size={16} />

// ❌ Don't render Lucide icons directly — they won't support className
<ArrowRightIcon color="red" size={16} />
```

## Platform Handling

Use the `usePlatformOS` hook for conditional rendering between web and native layouts:

```typescript
const { isWeb, isNative } = usePlatformOS();

// ✅ Platform-specific layout branching
if (isWeb) {
  return <div className="container mx-auto flex-1 px-4">{children}</div>;
}
return (
  <KeyboardAwareScrollView className="flex-1 px-4">
    {children}
  </KeyboardAwareScrollView>
);
```

**Rules**:

- Use `usePlatformOS` for **layout-level** differences (entire component trees)
- Use `Platform.select()` for **style-only** differences inside a single component
- Never conditionally import platform-specific modules at the top level — use `Platform.select` to assign hooks at module scope instead:

```typescript
// ✅ Correct pattern for platform-specific hooks
const usePlatformSpecificSetup = Platform.select({
  web: useLoadWebFonts,
  default: () => {},
});
```

## Theming

Colors are defined as hex values in a palette object (`src/theme/palette.ts`) and converted to RGB CSS variables via `nativewind`'s `vars()` for Tailwind consumption.

```typescript
// ✅ Use semantic color tokens in className
<AnBox className="bg-background border-border" />
<AnText className="text-foreground" />
<AnButton className="bg-primary" />

// ❌ Don't use raw color values
<View style={{ backgroundColor: "#0B1931" }} />
```

**Accessing resolved colors imperatively** (for third-party libraries that need color values):

```typescript
const { resolvedColors, resolvedTheme } = useAppTheme();

// Use for libraries that require explicit color values
<TabBar tintColor={resolvedColors.primary} />
```

**Rules**:

- Theme is stored in MMKV (persists across launches)
- The resolved theme follows system when the stored value is `"system"`; current app initialization sets a missing stored value to `"light"`
- `ThemeProvider` sets `colorScheme` on NativeWind for class-based dark mode
- Always prefer Tailwind color tokens (`bg-primary`, `text-muted-foreground`) over `resolvedColors` — only use the hook when a library requires a raw value

## Storage (MMKV)

Use `react-native-mmkv` for fast synchronous key-value storage. **Never use `getItem`/`setItem` directly** — use the `atomWithMMKV()` helper for reactive state management:

```typescript
// ✅ Reactive persisted state via Jotai atom
export const localeAtom = atomWithMMKV<LanguageType>("LANGUAGE_CODE", "en");

// In a component:
const [language, setLanguage] = useAtom(localeAtom);

// ❌ Never access storage directly in components
const value = storage.getString("LANGUAGE_CODE");
```

**Rules**:

- All storage keys must be defined in the `StorageKeyType` union in `src/utils/storage.ts`
- Storage uses the default MMKV instance unless a custom ID is explicitly configured in `storage.ts`
- The `getItem`/`setItem`/`removeItem` functions exist solely for the Jotai storage adapter — component code should never call them

## XState Store (Auth & Complex State)

Use `@xstate/store-react` for state with side effects and event-driven transitions. Export **selectors as hooks**, and add non-reactive getters only when a service layer needs direct store access:

```typescript
// stores/authStore.ts
const authStore = createStore({
  context: { isAuthenticated: undefined },
  on: {
    authenticated: (_context, event, enqueue) => {
      enqueue.effect(() => void setSentryUser(event));
      return { currentUserId: event.id, isAuthenticated: true };
    },
    unauthenticated: (_context, _event, enqueue) => {
      enqueue.effect(() => void setSentryUser(null));
      return { currentUserId: null, isAuthenticated: false };
    },
  },
});

// ✅ Selectors — reactive, use in components
export const useIsAuthenticated = () =>
  useSelector(authStore, state => state.context.isAuthenticated);

// ✅ Getters — non-reactive, use in services (e.g., oRPC headers)
export const getIdToken = () =>
  authStore.select(context => context.idToken).get();
```

> See react-conventions for general state management guidance (when to use XState vs Jotai vs TanStack Query).

## Sentry Integration

```typescript
// ✅ Initialization pattern (module-level in _layout.tsx)
initSentry();

// Inside RootLayout:
const ref = useNavigationContainerRef();
useEffect(() => {
  if (ref) navigationIntegration.registerNavigationContainer(ref);
}, [ref]);
```

**Rules**:

- Initialize Sentry before any rendering (module scope of root layout)
- Disabled in `__DEV__` — never sends events during local development
- Always use the `sendSentryError` helper from `@/services/sentry` for consistent error reporting with structured extras (code, details, hint)
- Wrap the root component with `Sentry.wrap()` for automatic performance tracking

## Environment Variables

Use `EXPO_PUBLIC_` prefix and validate with Zod at startup. The app crashes immediately if env vars are invalid — this is intentional to catch misconfiguration early:

```typescript
// src/utils/envVariables.ts
export const envVariablesSchema = z.object({
  EXPO_PUBLIC_ENVIRONMENT: z.enum([
    "local",
    "preview",
    "development",
    "staging",
    "production",
  ]),
  EXPO_PUBLIC_SENTRY_DSN: z.string().optional(),
  EXPO_PUBLIC_SUPABASE_URL: z.url(),
  EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string(),
});

export const envVariables = envVariablesSchema.parse(process.env);
```

**Rules**:

- Always import from `@/utils/envVariables` — never access `process.env` directly
- Metro loads env files via `@expo/env` using `EXPO_PUBLIC_ENVIRONMENT` to select the correct `.env.{environment}` file
- New env vars must be added to both the Zod schema and the appropriate `.env` files

## EAS Builds

Build profiles in `eas.json` extend a shared `base` profile. The `app.config.ts` dynamically sets app name and bundle identifier based on `APP_ENV`:

- `local`/`development` → `"Template Dev"` / `com.rnbp.template.dev`
- `staging` → `"Template Beta"` / `com.rnbp.template.staging`
- `production` → `"Template"` / `com.rnbp.template`

Non-production builds get an icon badge showing the environment and version via `app-icon-badge`.

**Rules**:

- Use `cross-env APP_ENV=<env> EXPO_NO_DOTENV=1` when running EAS build commands — this prevents local `.env` files from leaking into CI builds
- Version is sourced from `package.json` — EAS handles auto-increment for staging/production
- Always run `expo-doctor` (`pnpm in:native doctor`) before submitting builds to catch common issues

## Blocks (Screen-Level Components)

Blocks are domain-specific composite components built from `An*` primitives. They handle layout concerns like safe areas and keyboard avoidance:

**`ScreenLayout`** — Use for all screens. Supports three variants:

```typescript
// ✅ Form screen with keyboard avoidance
<ScreenLayout variant="FORM">
  <AnTextInput ... />
  <AnButton i18nKey="common:submit" />
</ScreenLayout>

// ✅ Scrollable content
<ScreenLayout variant="SCROLL">
  <ProfileCard />
</ScreenLayout>

// ✅ List screen (no internal scroll — the list handles it)
<ScreenLayout variant="LIST">
  <FlashList ... />
</ScreenLayout>
```

**Rules**:

- Always wrap screen content in `ScreenLayout` — it handles safe area insets, scroll behavior, and web container sizing
- Use `variant="FORM"` for any screen with inputs — it wraps content in `KeyboardAwareScrollView`
- `ScreenLayout` auto-detects platform and renders a simpler container on web

## Sandbox (Component Preview)

The sandbox tab previews components in isolation with error boundaries:

```typescript
// ✅ Wrap each preview in SandboxContainer
<SandboxContainer
  titleI18nKey="sandbox:button.title"
  descriptionI18nKey="sandbox:button.description"
>
  <AnButton variant="default" i18nKey="sandbox:button.label" />
</SandboxContainer>
```

**Rules**:

- Sandbox i18n namespace (`"sandbox"`) is loaded on demand
- Each `SandboxContainer` has its own error boundary so one broken component doesn't crash the entire sandbox screen
- Add a sandbox preview for every new `An*` component — organized by screen category (`ComponentsScreen`, `FormScreen`, `ThemeScreen`)

## Adding a New Screen

1. Create route file in the appropriate group: `src/app/(authed)/(tabs)/myScreen.tsx` or `src/app/(authed)/myScreen.tsx`
2. Wrap content in `<ScreenLayout variant="...">` with the correct variant
3. Register the tab in `src/domain/tabs.ts` if it belongs in the tab bar
4. Add screen title to `@libs/i18n` under the `native` namespace
5. Use `useAppTheme` only if the screen needs resolved color values for third-party components

## Key Commands

```bash
pnpm in:native dev           # Start Expo dev server (with cache clear)
pnpm in:native ios           # Run on iOS simulator
pnpm in:native android       # Run on Android emulator
pnpm in:native web           # Run on web
pnpm in:native prebuild      # Generate native projects
pnpm in:native typecheck     # Type check
pnpm in:native lint          # Lint
pnpm in:native doctor        # Run expo-doctor
```
