import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { BrowserUpgradeWarning } from "@/blocks/BrowserUpgradeWarning";
import { ThemeProvider } from "@/context/ThemeProvider";
import { initSentry } from "@/services/sentry";
import { isLegacyBrowser } from "@/utils/browserSupport";

import { App } from "./App";
import { initI18n } from "./i18n";

initSentry();
initI18n();

// Detect browser support
const isLegacy = isLegacyBrowser();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {isLegacy ? (
      <BrowserUpgradeWarning />
    ) : (
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <App />
      </ThemeProvider>
    )}
  </StrictMode>,
);
