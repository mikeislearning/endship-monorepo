import barrelFiles from "eslint-plugin-barrel-files";
import { createFolderStructure } from "eslint-plugin-project-structure";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

// Custom rule to enforce Icon suffix for lucide-react-native imports
const lucideIconSuffixRule = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Enforce that all lucide-react-native imports end with 'Icon'",
      category: "Best Practices",
    },
    fixable: "code",
    schema: [],
    messages: {
      missingIconSuffix:
        "Icon component '{{name}}' from lucide-react-native should end with 'Icon'. Consider renaming to '{{name}}Icon'.",
    },
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        if (node.source.value === "lucide-react-native") {
          node.specifiers.forEach(specifier => {
            if (specifier.type === "ImportSpecifier") {
              const importedName = specifier.imported.name;
              const localName = specifier.local.name;

              // Check if the local name doesn't end with 'Icon'
              if (!localName.endsWith("Icon")) {
                context.report({
                  node: specifier,
                  messageId: "missingIconSuffix",
                  data: {
                    name: localName,
                  },
                });
              }
            }
          });
        }
      },
    };
  },
};

// Custom rule to disallow React.FC and FC for typing components
const noReactFcRule = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallow React.FC and FC for typing React components",
      category: "Best Practices",
    },
    schema: [],
    messages: {
      noReactFc:
        "Avoid using '{{name}}' to type React components. It implicitly includes 'children' in all props, hides the return type, and makes generics awkward. Prefer inline prop typing: `const MyComponent = ({ foo }: MyComponentPropsType) => ...`.",
    },
  },
  create(context) {
    const forbiddenNames = new Set([
      "FC",
      "VFC",
      "FunctionComponent",
      "VoidFunctionComponent",
    ]);

    const reportIfForbidden = (node, typeName) => {
      if (forbiddenNames.has(typeName)) {
        context.report({
          node,
          messageId: "noReactFc",
          data: { name: typeName },
        });
      }
    };

    return {
      // Catches: const Foo: FC = ... or const Foo: React.FC = ...
      TSTypeReference(node) {
        const { typeName } = node;
        if (typeName.type === "Identifier") {
          reportIfForbidden(node, typeName.name);
        } else if (
          typeName.type === "TSQualifiedName" &&
          typeName.left.name === "React"
        ) {
          reportIfForbidden(node, typeName.right.name);
        }
      },
    };
  },
};

export const folderStructureConfig = createFolderStructure({
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
    context: {
      name: "context",
      children: [
        { name: "{PascalCase}Provider.tsx" },
        { name: "{PascalCase}Context.tsx" },
      ],
    },

    data: {
      name: "data",
      children: [
        { name: "queries", children: [{ name: "{camelCase}Queries.ts" }] },
        { name: "mutations", children: [{ name: "{camelCase}Mutations.ts" }] },
        { name: "api", children: [{ name: "{camelCase}Api.ts" }] },
      ],
    },

    domain: {
      name: "domain",
      children: [{ name: "{camelCase}.ts" }, { name: "common.ts" }],
    },

    hooks: { name: "hooks", children: [{ name: "use{PascalCase}.tsx" }] },
  },
});

export default [
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "barrel-files": barrelFiles,
      "lucide-icon-suffix": {
        rules: {
          "enforce-icon-suffix": lucideIconSuffixRule,
        },
      },
      "no-react-fc": {
        rules: {
          "no-react-fc": noReactFcRule,
        },
      },
    },
    settings: {
      react: {
        version: "19",
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      // Avoid authoring barrel files with more than 2 exports to improve tsc performance
      "barrel-files/avoid-barrel-files": [
        "error",
        {
          amountOfExportsToConsiderModuleAsBarrel: 2,
        },
      ],

      // Enforce that all lucide-react-native imports end with 'Icon'
      "lucide-icon-suffix/enforce-icon-suffix": "error",

      // Disallow React.FC / FC / FunctionComponent for typing components
      "no-react-fc/no-react-fc": "error",

      // Warn when console statements are used in the codebase (should be done in logger)
      "no-console": "warn",

      // Enforces consistent use of JSX boolean values (e.g. `isDisabled` over `isDisabled={true}`)
      "react/jsx-boolean-value": ["warn", "never"],

      // Warns if unnecessary curly braces are present in JSX props or children (e.g. `<Component prop='foo' />` over `<Component prop={'foo'} />`)
      "react/jsx-curly-brace-presence": [
        "warn",
        { props: "never", children: "never" },
      ],

      // Enforce consistent naming for event handler props (e.g. <MyComponent onChange={handleChange} /> and <MyComponent onChange={props.onChange} />
      "react/jsx-handler-names": "warn",

      // Enforces PascalCase for user-defined JSX components (e.g. `<MyComponent />` over `<myComponent />`)
      "react/jsx-pascal-case": ["error", { ignore: [] }],

      // Enforces arrow function for component definition
      "react/function-component-definition": [
        1,
        { namedComponents: "arrow-function" },
      ],

      // Disables the requirement to have React in JSX scope
      "react/react-in-jsx-scope": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
    languageOptions: {
      globals: {
        React: "writable",
      },
    },
  },
];
