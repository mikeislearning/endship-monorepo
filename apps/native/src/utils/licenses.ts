import { z } from "zod";

import licensesJson from "@/data/licenses.json";

/**
 * Creates a filtered Zod schema that processes an array input by:
 * 1. Validating each item against the provided schema
 * 2. Filtering out any items that fail validation
 * 3. Including only successfully validated items in the result
 *
 * This is useful for handling potentially malformed data where we want to
 * process valid items and silently discard invalid ones rather than
 * failing the entire validation.
 *
 * @param s - The Zod schema to validate each item against
 * @returns A new Zod schema that filters and processes arrays based on the provided schema
 */
export const makeFilteredSchema = <S extends z.ZodTypeAny>(s: S) => {
  return z.preprocess(as => {
    const result: S[] = [];
    if (!Array.isArray(as)) {
      return result;
    }
    for (const a of as) {
      const parsed = s.safeParse(a);
      if (parsed.success) {
        result.push(parsed.data as S);
      }
    }
    return result;
  }, z.array(s));
};

export const licensesSchema = makeFilteredSchema(
  z.object({
    name: z.string(),
    repository: z.url(),
    licenses: z.string().refine(val => val !== "UNKNOWN"),
  }),
);

export const openSourceLicenses = licensesSchema.parse(
  Object.entries(licensesJson as object).map(([name, license]) => ({
    name,
    ...(license as object),
  })),
);
export type OpenSourceLicenseType = z.infer<typeof licensesSchema>;

/**
 * Extracts the username/organization name from a GitHub URL.
 *
 * This function parses various formats of GitHub URLs and extracts the
 * username or organization name from them. It handles URLs with or without
 * protocols, www prefix, and repository names.
 *
 * Examples:
 * - "https://github.com/facebook/react" -> "facebook"
 * - "github.com/vercel/next.js" -> "vercel"
 * - "@facebook" -> "facebook"
 *
 * @param url - The GitHub URL or username reference to parse
 * @returns The extracted username/organization name, or null if not found or URL is empty
 */
export const extractNameFromGithubUrl = (url: string) => {
  if (!url) {
    return null;
  }

  // Regex to extract username from various GitHub URL formats
  const reg =
    /((https?:\/\/)?(www\.)?github\.com\/)?(@|#!\/)?([A-Za-z0-9_-]+)(\/([-a-z0-9_-]+))?/i;
  const components = reg.exec(url);

  // Username is captured in the 5th group of the regex
  if (components && components.length > 5) {
    return components[5];
  }
  return null;
};

/**
 * Splits a package string into its name and version components.
 * Example: "@rn-primitives/slot@1.2.0" -> { name: "@rn-primitives/slot", version: "1.2.0" }
 *
 * @param packageString - The package string to split
 * @returns An object containing the package name and version
 */
export const splitPackageNameAndVersion = (
  packageString: string,
): { name: string; version: string } => {
  // Find the last occurrence of '@' which typically separates the name from version
  const lastAtIndex = packageString.lastIndexOf("@");

  // Handle case where there's no version or no '@' character
  if (lastAtIndex <= 0) {
    return {
      name: packageString,
      version: "",
    };
  }

  // Handle scoped packages (e.g., @rn-primitives/slot@1.2.0)
  // We need to check if the first character is '@' (indicating a scoped package)
  const isScoped = packageString.startsWith("@");

  if (isScoped && lastAtIndex === 0) {
    // No version specified for a scoped package
    return {
      name: packageString,
      version: "",
    };
  }

  // Extract the package name and version
  const name = packageString.substring(0, lastAtIndex);
  const version = packageString.substring(lastAtIndex + 1);

  return { name, version };
};
