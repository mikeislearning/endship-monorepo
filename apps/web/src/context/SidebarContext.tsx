import { createContext } from "react";

export type SidebarContextPropsType = {
  state: "expanded" | "collapsed";
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (isOpen: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

export const SidebarContext = createContext<SidebarContextPropsType | null>(
  null,
);
