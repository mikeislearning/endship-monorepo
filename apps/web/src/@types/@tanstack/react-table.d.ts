import { I18nKeyType } from "@/i18n";

import "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface ColumnMeta {
    isMobileHidden?: boolean;
    tooltipI18nkey?: I18nKeyType;
  }
}
