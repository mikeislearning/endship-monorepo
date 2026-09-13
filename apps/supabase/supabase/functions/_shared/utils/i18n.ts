import i18n from "i18next";

import { supabaseI18nResources } from "@libs/i18n";

i18n.init({
  lng: "en",
  debug: false,
  ns: ["supabase", "common"],
  defaultNS: "supabase",
  resources: supabaseI18nResources,
});

export { i18n };
