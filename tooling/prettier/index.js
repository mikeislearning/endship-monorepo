/** @typedef {import("prettier").Config} PrettierConfig */
/** @typedef {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig */

/** @type { PrettierConfig | SortImportsConfig } */
const config = {
  arrowParens: "avoid",
  bracketSameLine: true,
  bracketSpacing: true,
  tabWidth: 2,
  trailingComma: "all",
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  tailwindFunctions: ["cn", "cva", "clsx", "twMerge", "tw"],
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(supabase|@supabase)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@(apps|libs|tooling)/(.*)$",
    "^@/(.*)$",
    "",
    "^[../]",
    "^[./]",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.8.2",
  tailwindStylesheet: "../../apps/web/src/index.css",
  overrides: [
    {
      files: ["**/*.json"],
      options: {
        plugins: ["prettier-plugin-sort-json"],
        jsonRecursiveSort: true,
      },
    },
  ],
};

export default config;
