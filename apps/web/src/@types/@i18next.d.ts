import { webI18nResources } from "@libs/i18n";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: (typeof webI18nResources)["en"];
  }
}
