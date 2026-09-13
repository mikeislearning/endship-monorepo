import i18n from "i18next";

import { supabaseI18nResources } from "@libs/i18n";

void i18n.init({
  lng: "en",
  debug: false,
  ns: ["supabase", "common"],
  resources: supabaseI18nResources,
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: "v4",
});

export { i18n };
