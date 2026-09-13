/**
 * Check if the browser is considered legacy (for additional checks)
 * Minimum versions to support Tailwind v4 are:
 * - Chrome: 111+
 * - Firefox: 128+
 * - Safari: 16.4+
 * - Edge: 111+
 */
export const isLegacyBrowser = (): boolean => {
  const userAgent = navigator.userAgent;

  // Check for Internet Explorer
  if (userAgent.includes("MSIE") || userAgent.includes("Trident/")) {
    return true;
  }

  // Check for very old Chrome versions (< 111)
  const chromeRegex = /Chrome\/(\d+)/;
  const chromeMatch = chromeRegex.exec(userAgent);
  if (chromeMatch?.[1] && parseInt(chromeMatch[1], 10) < 111) {
    return true;
  }

  // Check for very old Firefox versions (< 128)
  const firefoxRegex = /Firefox\/(\d+)/;
  const firefoxMatch = firefoxRegex.exec(userAgent);
  if (firefoxMatch?.[1] && parseInt(firefoxMatch[1], 10) < 128) {
    return true;
  }

  // Check for very old Safari versions (< 16.4)
  const safariRegex = /Version\/(\d+)\.(\d+)/;
  const safariMatch = safariRegex.exec(userAgent);
  if (
    userAgent.includes("Safari") &&
    !userAgent.includes("Chrome") &&
    safariMatch?.[1]
  ) {
    const majorVersion = parseInt(safariMatch[1], 10);
    const minorVersion = parseInt(safariMatch[2] ?? "0", 10);
    if (majorVersion < 16 || (majorVersion === 16 && minorVersion < 4)) {
      return true;
    }
  }

  return false;
};
