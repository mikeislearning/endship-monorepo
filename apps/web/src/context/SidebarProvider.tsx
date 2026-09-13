import {
  ComponentProps,
  CSSProperties,
  useCallback,
  useEffect,
  useState,
} from "react";

import { AwTooltipProvider } from "@/components/AwTooltip";
import {
  SIDEBAR_COOKIE_MAX_AGE,
  SIDEBAR_COOKIE_NAME,
  SIDEBAR_KEYBOARD_SHORTCUT,
  SIDEBAR_WIDTH,
  SIDEBAR_WIDTH_ICON,
} from "@/domain/constants";
import { useIsMobile } from "@/hooks/useIsMobile";
import { cn } from "@/utils/tailwind";

import { SidebarContext, SidebarContextPropsType } from "./SidebarContext";

type SidebarProviderPropsType = ComponentProps<"div"> & {
  defaultOpen?: boolean;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
};

export const SidebarProvider = ({
  defaultOpen = true,
  isOpen: isOpenProp,
  onOpenChange,
  className,
  style,
  children,
  ...props
}: SidebarProviderPropsType) => {
  const isMobile = useIsMobile();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [isOpenState, setIsOpenState] = useState(defaultOpen);
  const isOpen = isOpenProp ?? isOpenState;
  const setIsOpen = useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const isOpenState = typeof value === "function" ? value(isOpen) : value;
      if (onOpenChange) {
        onOpenChange(isOpenState);
      } else {
        setIsOpenState(isOpenState);
      }

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${isOpenState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [onOpenChange, isOpen],
  );

  // Helper to toggle the sidebar.
  const toggleSidebar = useCallback(() => {
    return isMobile
      ? setIsMobileOpen(isOpen => !isOpen)
      : setIsOpen(isOpen => !isOpen);
  }, [isMobile, setIsOpen, setIsMobileOpen]);

  // Adds a keyboard shortcut to toggle the sidebar.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = isOpen ? "expanded" : "collapsed";

  const contextValue: SidebarContextPropsType = {
    state,
    isOpen,
    setIsOpen,
    isMobile,
    isMobileOpen,
    setIsMobileOpen,
    toggleSidebar,
  };

  return (
    <SidebarContext.Provider value={contextValue}>
      <AwTooltipProvider>
        <div
          data-slot="sidebar-wrapper"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH,
              "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
              ...style,
            } as CSSProperties
          }
          className={cn(
            "group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar",
            className,
          )}
          {...props}>
          {children}
        </div>
      </AwTooltipProvider>
    </SidebarContext.Provider>
  );
};
