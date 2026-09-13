import fs from "node:fs";
import path from "node:path";
import * as p from "@clack/prompts";
import color from "picocolors";
import { replaceInFile } from "replace-in-file";

const ROOT = process.cwd();

const main = async () => {
  p.intro(
    `${color.bgGreen(color.black(" Setup New Mindsea Supabase Project "))}`,
  );

  const params = await p.group(
    {
      projectName: () =>
        p.text({
          message: "Supabase project name (used as local DB identifier)",
          placeholder: "my_project",
          validate(value) {
            if (!value.length) return "Project name is required!";
            if (!/^[a-z][a-z_]*[a-z]$/.test(value))
              return "Must be lowercase letters with underscore separators (e.g. my_project)";
          },
        }),
      appName: () =>
        p.text({
          message: "App display name",
          placeholder: "My App",
          validate(value) {
            if (!value.length) return "App name is required!";
          },
        }),
      bundleId: () =>
        p.text({
          message: "Base bundle identifier (iOS/Android)",
          placeholder: "com.company.appname",
          validate(value) {
            if (!value.length) return "Bundle identifier is required!";
            if (!/^[a-z][a-z0-9]*(\.[a-z][a-z0-9]*){2,}$/.test(value))
              return "Must be a valid reverse-DNS bundle ID (e.g. com.company.appname)";
          },
        }),
      prefix: () =>
        p.text({
          message:
            "Single-letter component prefix ('n' appended for native, 'w' for web)",
          placeholder: "A",
          validate(value) {
            if (!value.length) return "Prefix is required!";
            if (value.length !== 1 || !/[A-Za-z]/.test(value))
              return "Must be a single letter";
          },
        }),
    },
    {
      onCancel: () => {
        p.cancel("Setup cancelled.");
        process.exit(0);
      },
    },
  );

  const nativePrefix = params.prefix.toUpperCase() + "n";
  const webPrefix = params.prefix.toUpperCase() + "w";
  const appSlug = params.projectName.replace(/_/g, "-");

  const confirm = await p.confirm({
    message: `Confirm setup with:
  • Supabase project ID : ${color.cyan(params.projectName)}
  • Workspace file      : ${color.cyan(`${appSlug}.code-workspace`)}
  • Production app name : ${color.cyan(params.appName)}
  • Dev / staging names : ${color.cyan(`${params.appName} Dev`)} / ${color.cyan(`${params.appName} Beta`)}
  • Bundle identifier   : ${color.cyan(params.bundleId)}
  • App slug / scheme   : ${color.cyan(appSlug)}
  • Native prefix       : ${color.cyan(nativePrefix)}  |  Web prefix: ${color.cyan(webPrefix)}`,
  });

  if (!confirm) {
    p.cancel("Setup cancelled.");
    process.exit(0);
  }

  const spinner = p.spinner();

  spinner.start("Updating native app config...");
  await updateNativeAppConfig({
    appName: params.appName,
    bundleId: params.bundleId,
    slug: appSlug,
  });
  spinner.stop("Native app config updated");

  spinner.start(`Renaming native components  (An → ${nativePrefix})...`);
  await renameAppComponents({
    appDir: "apps/native",
    oldPrefix: "An",
    newPrefix: nativePrefix,
    eslintConfig: "eslint.config.mjs",
  });
  spinner.stop(`Native components renamed to ${nativePrefix}*`);

  spinner.start(`Renaming web components     (Aw → ${webPrefix})...`);
  await renameAppComponents({
    appDir: "apps/web",
    oldPrefix: "Aw",
    newPrefix: webPrefix,
    eslintConfig: "eslint.config.js",
  });
  spinner.stop(`Web components renamed to ${webPrefix}*`);

  spinner.start("Updating agent instructions and skills...");
  await renameDocsPrefixes({ nativePrefix, webPrefix });
  spinner.stop("Agent instructions and skills updated");

  spinner.start("Renaming workspace file and package name...");
  renameWorkspace({ slug: appSlug });
  spinner.stop("Workspace file and package name updated");

  spinner.start("Updating Supabase project config...");
  updateSupabaseConfig({ projectName: params.projectName });
  spinner.stop("Supabase config updated");

  spinner.start("Cleaning up...");
  await cleanup();
  spinner.stop("Cleanup complete");

  p.outro(
    `"${color.green(params.appName)}" is ready! Run ${color.cyan("pnpm dev")} to start development.`,
  );
};

// ---------------------------------------------------------------------------
// Supabase config
// ---------------------------------------------------------------------------

const updateSupabaseConfig = ({ projectName }: { projectName: string }) => {
  const configPath = path.join(ROOT, "apps/supabase/supabase/config.toml");
  const content = fs.readFileSync(configPath, "utf8");
  const updated = content.replace(
    /project_id = ".*"/,
    `project_id = "${projectName}"`,
  );
  fs.writeFileSync(configPath, updated, "utf8");
};

// ---------------------------------------------------------------------------
// Native app.config.js
// ---------------------------------------------------------------------------

const updateNativeAppConfig = async ({
  appName,
  bundleId,
  slug,
}: {
  appName: string;
  bundleId: string;
  slug: string;
}) => {
  // Order matters: replace the more-specific bundle IDs before the base one
  await replaceInFile({
    files: path.join(ROOT, "apps/native/app.config.ts"),
    from: [
      /"com\.mindsea\.template\.dev"/g,
      /"com\.mindsea\.template\.staging"/g,
      /"com\.mindsea\.template"/g,
      /"Template Dev"/g,
      /"Template Beta"/g,
      /name: "Template"/,
      /expo-template/g,
    ],
    to: [
      `"${bundleId}.dev"`,
      `"${bundleId}.staging"`,
      `"${bundleId}"`,
      `"${appName} Dev"`,
      `"${appName} Beta"`,
      `name: "${appName}"`,
      slug,
    ],
  });
};

// ---------------------------------------------------------------------------
// Component renaming (shared for native + web)
// ---------------------------------------------------------------------------

const renameFilesInDirectory = (
  dirPath: string,
  oldName: string,
  newName: string,
) => {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      renameFilesInDirectory(entryPath, oldName, newName);
    } else if (entry.name.startsWith(oldName)) {
      // Preserve the full suffix (.tsx, .native.tsx, .web.tsx, etc.)
      const suffix = entry.name.slice(oldName.length);
      fs.renameSync(entryPath, path.join(dirPath, newName + suffix));
    }
  }
};

const renameAppComponents = async ({
  appDir,
  oldPrefix,
  newPrefix,
  eslintConfig,
}: {
  appDir: string;
  oldPrefix: string;
  newPrefix: string;
  eslintConfig: string;
}) => {
  const appPath = path.join(ROOT, appDir);
  const componentsDir = path.join(appPath, "src/components");

  // Replace all content references to the old prefix in source files and
  // the ESLint config (covers both component imports and folder-structure
  // patterns like `Aw{PascalCase}` in the eslint config).
  await replaceInFile({
    files: [path.join(appPath, "src/**/*"), path.join(appPath, eslintConfig)],
    from: new RegExp(`\\b${oldPrefix}(?=[A-Z{])`, "g"),
    to: newPrefix,
    ignore: ["**/*.d.ts"],
  });

  // Rename component directories and files
  const entries = fs.readdirSync(componentsDir, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.name.startsWith(oldPrefix)) continue;

    const oldPath = path.join(componentsDir, entry.name);
    const newComponentName = newPrefix + entry.name.slice(oldPrefix.length);
    const newPath = path.join(componentsDir, newComponentName);

    fs.renameSync(oldPath, newPath);

    if (entry.isDirectory()) {
      renameFilesInDirectory(newPath, entry.name, newComponentName);
    }
  }
};

// ---------------------------------------------------------------------------
// Agent instructions + skills
// ---------------------------------------------------------------------------

/**
 * Rewrites component prefixes in the AI agent documentation so generated code
 * follows the project's own prefixes instead of the template's.
 *
 * Covers component references (`AnButton`), the folder-structure placeholders
 * (`AwComponentName`), standalone backticked mentions of the prefix itself
 * (`` `An` prefix ``), and the generic `Ab*` examples in AGENTS.md.
 */
const renameDocsPrefixes = async ({
  nativePrefix,
  webPrefix,
}: {
  nativePrefix: string;
  webPrefix: string;
}) => {
  await replaceInFile({
    files: [
      path.join(ROOT, "AGENTS.md"),
      path.join(ROOT, ".agents/skills/**/*.md"),
      path.join(ROOT, ".github/*.md"),
      path.join(ROOT, ".github/prompts/*.md"),
    ],
    from: [
      /\bAn(?=[A-Z{])/g,
      /`An`/g,
      /\bAw(?=[A-Z{])/g,
      /`Aw`/g,
      // Generic base-component examples in AGENTS.md (AbButton, AbInput)
      /\bAb(?=[A-Z])/g,
    ],
    to: [
      nativePrefix,
      `\`${nativePrefix}\``,
      webPrefix,
      `\`${webPrefix}\``,
      nativePrefix,
    ],
  });
};

// ---------------------------------------------------------------------------
// Workspace file + root package name
// ---------------------------------------------------------------------------

const renameWorkspace = ({ slug }: { slug: string }) => {
  // Rename supabase-monorepo-template.code-workspace → {slug}.code-workspace
  const oldWorkspace = path.join(
    ROOT,
    "supabase-monorepo-template.code-workspace",
  );
  const newWorkspace = path.join(ROOT, `${slug}.code-workspace`);
  fs.renameSync(oldWorkspace, newWorkspace);

  // Update the display name inside the workspace file
  const workspaceContent = fs.readFileSync(newWorkspace, "utf8");
  fs.writeFileSync(
    newWorkspace,
    workspaceContent.replace(
      /"name": "☯️ supabase-monorepo-template"/,
      `"name": "☯️ ${slug}"`,
    ),
    "utf8",
  );

  // Update root package.json name
  const pkgPath = path.join(ROOT, "package.json");
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8")) as Record<
    string,
    unknown
  >;
  pkg.name = slug;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n", "utf8");
};

// ---------------------------------------------------------------------------
// Cleanup
// ---------------------------------------------------------------------------

const cleanup = () =>
  fs.promises.rm(path.join(ROOT, "scripts/setup.ts"), { force: true });

main().catch(err => {
  p.log.error(String(err));
  process.exit(1);
});
