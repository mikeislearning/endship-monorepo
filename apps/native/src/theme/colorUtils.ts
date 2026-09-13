import hexRgb from "hex-rgb";

/**
 * Converts a hex color to space-separated RGB values for use with Tailwind's <alpha-value> placeholder
 * Handles both regular hex colors (#ff0000) and hex colors with alpha (#ff000080)
 *
 * @param hexColor - Hex color string (with or without alpha)
 * @returns Space-separated RGB values (e.g., "255 0 0")
 */
export const hexToRgbString = (hexColor: string): string => {
  const { red, green, blue } = hexRgb(hexColor);

  return `${red} ${green} ${blue}`;
};
