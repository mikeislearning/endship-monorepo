// This script adds .ts extensions to imports in generated schema files for Deno compatibility
// It runs after every db reset or migration (via gen-schemas)
const fs = require("fs");
const path = require("path");

const srcDir = path.resolve(__dirname, "../src");

const filesToPatch = [
  {
    file: "dbSchemas.gen.ts",
    find: 'import { type Json } from "./dbTypes.gen";',
    replace: 'import { type Json } from "./dbTypes.gen.ts";',
  },
  {
    file: "dbSchemas.gen.d.ts",
    find: 'import * as generated from "./dbSchemas.gen";',
    replace: 'import * as generated from "./dbSchemas.gen.ts";',
  },
];

filesToPatch.forEach(({ file, find, replace }) => {
  try {
    const filePath = path.join(srcDir, file);
    let content = fs.readFileSync(filePath, "utf8");

    if (content.includes(find)) {
      content = content.replace(find, replace);
      fs.writeFileSync(filePath, content);
      console.log(`Patched ${file}: added .ts extension to import`);
    } else if (content.includes(replace)) {
      console.log(`${file}: already patched`);
    } else {
      console.warn(`${file}: import pattern not found`);
    }
  } catch (error) {
    console.error(`Error patching ${file}:`, error);
  }
});
