import { useCallback } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import {
  ChevronsUpDown,
  Component,
  LogOut,
  MoonIcon,
  SunIcon,
  X,
} from "lucide-react";

import { AwAvatar, AwAvatarFallback } from "@/components/AwAvatar";
import { AwButton } from "@/components/AwButton/AwButton";
import {
  AwDropdownMenu,
  AwDropdownMenuContent,
  AwDropdownMenuGroup,
  AwDropdownMenuItem,
  AwDropdownMenuLabel,
  AwDropdownMenuSeparator,
  AwDropdownMenuTrigger,
} from "@/components/AwDropdownMenu";
import { AwSeparator } from "@/components/AwSeparator";
import {
  AwSidebar,
  AwSidebarContent,
  AwSidebarFooter,
  AwSidebarGroup,
  AwSidebarHeader,
  AwSidebarInset,
  AwSidebarMenu,
  AwSidebarMenuButton,
  AwSidebarMenuItem,
} from "@/components/AwSidebar";
import { AwText } from "@/components/AwText/AwText";
import { sidebarItems, SidebarItemType } from "@/domain/sidebar";
import { useCurrentAdmin } from "@/hooks/useCurrentAdmin";
import { useSidebar } from "@/hooks/useSidebar";
import { useTheme } from "@/hooks/useTheme";
import { useTranslator } from "@/hooks/useTranslate";

type AwSidebarMenuItemPropsType = {
  item: SidebarItemType;
};

const AppSidebarMenuItem = ({ item }: AwSidebarMenuItemPropsType) => {
  const location = useLocation();
  const parentLocation = location.pathname.split("/").at(1);

  return (
    <AwSidebarMenuItem className="py-0">
      <Link to={item.url} className="px-0">
        <AwSidebarMenuButton isActive={`/${parentLocation}` === item.url}>
          {item.icon}
          <AwText as="span" i18nKey={item.title} />
        </AwSidebarMenuButton>
      </Link>
    </AwSidebarMenuItem>
  );
};

const SidebarUserMenu = () => {
  const { isMobile } = useSidebar();
  const { t } = useTranslator();

  const currentAdmin = useCurrentAdmin();

  const { setTheme, theme } = useTheme();

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return (
    <AwSidebarMenu>
      <AwSidebarMenuItem>
        <AwDropdownMenu>
          <AwDropdownMenuTrigger
            render={
              <AwSidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                <AwAvatar className="h-8 w-8 rounded-lg">
                  <AwAvatarFallback className="rounded-lg">
                    {currentAdmin.first_name?.[0]?.toUpperCase() ?? "M"}
                    {currentAdmin.last_name?.[0]?.toUpperCase() ?? "S"}
                  </AwAvatarFallback>
                </AwAvatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {`${currentAdmin.first_name} ${currentAdmin.last_name}`}
                  </span>
                  <span className="truncate text-xs">{currentAdmin.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </AwSidebarMenuButton>
            }
          />
          <AwDropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}>
            <AwDropdownMenuGroup>
              <AwDropdownMenuLabel className="flex flex-row items-center justify-between font-normal">
                <AwText i18nKey="common:theme" />
                <AwButton
                  type="button"
                  variant="outline"
                  size="icon"
                  className="group/toggle size-8"
                  onClick={toggleTheme}>
                  <SunIcon className="hidden [html.dark_&]:block" />
                  <MoonIcon className="hidden [html.light_&]:block" />
                </AwButton>
              </AwDropdownMenuLabel>
            </AwDropdownMenuGroup>
            <AwDropdownMenuSeparator />
            <Link to="/logout">
              <AwDropdownMenuItem>
                <LogOut />
                {t("common:signOut")}
              </AwDropdownMenuItem>
            </Link>
          </AwDropdownMenuContent>
        </AwDropdownMenu>
      </AwSidebarMenuItem>
    </AwSidebarMenu>
  );
};

export const AppSidebar = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <AwSidebar>
      <AwSidebarHeader className="flex flex-row items-center justify-between gap-2">
        <AwSidebarMenu className="p-2 pb-0">
          <AwSidebarMenuItem className="flex flex-row items-center gap-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <img
                src="https://github.com/mindsea.png"
                alt="MindSea"
                className="rounded-lg"
              />
            </div>
            <AwText as="span" variant="mdBold" i18nKey="sandbox:orgName" />
          </AwSidebarMenuItem>
        </AwSidebarMenu>
        <AwSidebarInset className="md:hidden">
          <AwButton size="icon" variant="outline" onClick={toggleSidebar}>
            <X />
          </AwButton>
        </AwSidebarInset>
      </AwSidebarHeader>
      <AwSidebarContent>
        <AwSidebarGroup className="group-data-[collapsible=icon]:hidden">
          <AwSidebarMenu>
            {sidebarItems.map(item => (
              <AppSidebarMenuItem item={item} key={item.title} />
            ))}
          </AwSidebarMenu>
        </AwSidebarGroup>
      </AwSidebarContent>
      <AwSidebarFooter>
        <AwSeparator />
        <Link to="/sandbox" className="px-0" target="_blank" rel="noreferrer">
          <AwSidebarMenuButton>
            <Component />
            <AwText as="span" i18nKey="sandbox:title" />
          </AwSidebarMenuButton>
        </Link>
        <SidebarUserMenu />
      </AwSidebarFooter>
    </AwSidebar>
  );
};
