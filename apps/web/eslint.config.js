import {
  createFolderStructure,
  projectStructureParser,
  projectStructurePlugin,
} from "eslint-plugin-project-structure";

import baseConfig from "@tooling/eslint-config/base";
import reactConfig from "@tooling/eslint-config/react";

const folderStructureConfig = createFolderStructure({
  structureRoot: "src",
  structure: [
    // src/components/...
    { ruleId: "components" },
    // src/context/...
    { ruleId: "context" },
    // src/data/...
    { ruleId: "data" },
    // src/domain/...
    { ruleId: "domain" },
    // src/hooks/...
    { ruleId: "hooks" },
  ],
  rules: {
    components: {
      name: "components",
      children: [
        { name: "Aw{PascalCase}.tsx" },
        {
          name: "Aw{PascalCase}",
          children: [
            { name: "Aw{PascalCase}.tsx" },
            { name: "Base{PascalCase}.tsx" },
          ],
        },
      ],
    },

    context: {
      name: "context",
      children: [{ name: "{PascalCase}Provider.tsx" }],
    },

    data: {
      name: "data",
      children: [
        {
          name: "queries",
          children: [{ name: "{camelCase}Queries.ts" }],
        },
        {
          name: "mutations",
          children: [{ name: "{camelCase}Mutations.ts" }],
        },
        { name: "api", children: [{ name: "{camelCase}Api.ts" }] },
      ],
    },

    domain: {
      name: "domain",
      children: [{ name: "{camelCase}s.ts" }, { name: "common.ts" }],
    },

    hooks: {
      name: "hooks",
      children: [{ name: "use{PascalCase}.tsx" }],
    },
  },
});

export default [
  { ignores: ["dist", "src/@types/*", "vite.config.ts"] },
  {
    files: ["src/components/**/*.tsx"],
    ignores: ["projectStructure.cache.json"],
    languageOptions: { parser: projectStructureParser },
    plugins: {
      "project-structure": projectStructurePlugin,
    },
    rules: {
      // Enforces all components begin with 2 letter project prefix to prevent naming conflicts
      "project-structure/folder-structure": ["error", folderStructureConfig],
    },
  },
  ...baseConfig,
  ...reactConfig,
  {
    files: ["src/routes/**/*.tsx", "src/utils/router.ts"],
    rules: {
      "@typescript-eslint/only-throw-error": "off",
      "react-refresh/only-export-components": "off",
    },
  },
];
