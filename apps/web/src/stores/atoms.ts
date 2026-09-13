import { atom } from "jotai";

import { I18nKeyType } from "@/i18n";

export const discardChangesAtom = atom<{
  entityI18nKeyType: I18nKeyType;
  action: "CREATE" | "UPDATE";
} | null>(null);

export const isDetailsSheetOpenAtom = atom<boolean>(false);
