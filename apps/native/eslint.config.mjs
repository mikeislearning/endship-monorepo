import expoConfig from "eslint-config-expo/flat/default.js";
import {
  projectStructureParser,
  projectStructurePlugin,
} from "eslint-plugin-project-structure";

import baseConfig from "@tooling/eslint-config/base";
import reactConfig, {
  folderStructureConfig,
} from "@tooling/eslint-config/react";

export default [
  { ignores: ["dist", "src/@types/*", "index.js"] },
  {
    files: ["src/**/*.tsx"],
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
  ...expoConfig,
  ...baseConfig,
  ...reactConfig,
  {
    // Disable certain rules for expo router files
    files: ["src/app/**/*.tsx"],
    rules: {
      // Disable the requirement for named exports
      "import/no-default-export": "off",
      // Disable the requirement for arrow functions
      "prefer-arrow-callback": "off",
      // Disable the requirement for arrow function components
      "react/function-component-definition": "off",
      // Disable the requirement for only exporting components in React component files
      "react-refresh/only-export-components": "off",
    },
  },
  // Override expo's resolver: it drops the TypeScript resolver in flat/default.js,
  // which means `@/*` path aliases (tsconfig `paths`) and `moduleSuffixes` file
  // variants (.native.tsx, .web.tsx, …) are not resolved by import/no-unresolved.
  {
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
          // Compound extensions matching tsconfig `moduleSuffixes`
          extensions: [
            ".native.tsx",
            ".native.ts",
            ".web.tsx",
            ".web.ts",
            ".ios.tsx",
            ".ios.ts",
            ".android.tsx",
            ".android.ts",
            ".tsx",
            ".ts",
            ".d.ts",
            ".jsx",
            ".js",
            ".json",
          ],
        },
      },
    },
  },
];
