import { Href } from "expo-router";

import { I18nKeyType } from "@/i18n";

export const tabItems: {
  i18nKey: I18nKeyType;
  href: Href;
}[] = [
  {
    i18nKey: "sandbox:components.name",
    href: "/components",
  },
  {
    i18nKey: "sandbox:form.name",
    href: "/form",
  },
  {
    i18nKey: "sandbox:theme.name",
    href: "/theme",
  },
];
