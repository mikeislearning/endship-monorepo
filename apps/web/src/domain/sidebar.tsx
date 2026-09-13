import { ReactElement } from "react";
import { LinkProps } from "@tanstack/react-router";

import { I18nKeyType } from "@/i18n";

export type SidebarItemType = {
  title: I18nKeyType;
  url: LinkProps["to"];
  icon: ReactElement;
};

export const sidebarItems: SidebarItemType[] = [];
