import enCommon from "./en/common.json" with { type: "json" };
import enNative from "./en/native.json" with { type: "json" };
import enSandbox from "./en/sandbox.json" with { type: "json" };
import enSupabase from "./en/supabase.json" with { type: "json" };
import enWeb from "./en/web.json" with { type: "json" };

export const webI18nResources = {
  en: {
    common: enCommon,
    web: enWeb,
    sandbox: enSandbox,
  },
} as const;

export const nativeI18nResources = {
  en: {
    common: enCommon,
    native: enNative,
    sandbox: enSandbox,
  },
} as const;

export const supabaseI18nResources = {
  en: {
    common: enCommon,
    supabase: enSupabase,
  },
} as const;

// Helper type to extract keys from a JSON object with proper nesting
type ExtractKeysType<T, Prefix extends string = ""> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? T[K] extends readonly unknown[]
            ? `${Prefix}${K}`
            : ExtractKeysType<T[K], `${Prefix}${K}.`>
          : `${Prefix}${K}`
        : never;
    }[keyof T]
  : never;

export type WebI18nKeyType =
  | `web:${ExtractKeysType<typeof enWeb>}`
  | `common:${ExtractKeysType<typeof enCommon>}`
  | `sandbox:${ExtractKeysType<typeof enSandbox>}`;

export type NativeI18nKeyType =
  | `native:${ExtractKeysType<typeof enNative>}`
  | `common:${ExtractKeysType<typeof enCommon>}`
  | `sandbox:${ExtractKeysType<typeof enSandbox>}`;

export type SupabaseI18nKeyType =
  | `supabase:${ExtractKeysType<typeof enSupabase>}`
  | `common:${ExtractKeysType<typeof enCommon>}`;

export type LanguageType = "en";
