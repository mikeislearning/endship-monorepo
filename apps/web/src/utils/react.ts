import { ReactNode } from "react";

import { I18nKeyType } from "@/i18n";

export type ChildrenOrI18nType =
  | {
      children?: never;
      i18nKey: I18nKeyType;
      i18nOptions?: object;
    }
  | {
      children: ReactNode;
      i18nKey?: never;
      i18nOptions?: never;
    };

export type RequiredChildrenType = Exclude<ReactNode, null | undefined>;
