import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";

import {
  AwAvatar,
  AwAvatarFallback,
  AwAvatarImage,
} from "@/components/AwAvatar";
import {
  AwDropdownMenu,
  AwDropdownMenuContent,
  AwDropdownMenuGroup,
  AwDropdownMenuItem,
  AwDropdownMenuLabel,
  AwDropdownMenuSeparator,
  AwDropdownMenuTrigger,
} from "@/components/AwDropdownMenu";
import {
  AwSidebarMenu,
  AwSidebarMenuButton,
  AwSidebarMenuItem,
} from "@/components/AwSidebar";
import { useSidebar } from "@/hooks/useSidebar";
import { useTranslator } from "@/hooks/useTranslate";

type NavUserPropsType = {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
};

export const NavUser = ({ user }: NavUserPropsType) => {
  const { isMobile } = useSidebar();
  const { t } = useTranslator();

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
                  <AwAvatarImage src={user.avatar} alt={user.name} />
                  <AwAvatarFallback className="rounded-lg">CN</AwAvatarFallback>
                </AwAvatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
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
              <AwDropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <AwAvatar className="h-8 w-8 rounded-lg">
                    <AwAvatarImage src={user.avatar} alt={user.name} />
                    <AwAvatarFallback className="rounded-lg">
                      CN
                    </AwAvatarFallback>
                  </AwAvatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
              </AwDropdownMenuLabel>
            </AwDropdownMenuGroup>
            <AwDropdownMenuSeparator />
            <AwDropdownMenuGroup>
              <AwDropdownMenuItem>
                <Sparkles />
                {t("sandbox:dropdownMenu.upgrade")}
              </AwDropdownMenuItem>
            </AwDropdownMenuGroup>
            <AwDropdownMenuSeparator />
            <AwDropdownMenuGroup>
              <AwDropdownMenuItem>
                <BadgeCheck />
                {t("sandbox:dropdownMenu.account")}
              </AwDropdownMenuItem>
              <AwDropdownMenuItem>
                <CreditCard />
                {t("sandbox:dropdownMenu.billing")}
              </AwDropdownMenuItem>
              <AwDropdownMenuItem>
                <Bell />
                {t("sandbox:dropdownMenu.notifications")}
              </AwDropdownMenuItem>
            </AwDropdownMenuGroup>
            <AwDropdownMenuSeparator />
            <AwDropdownMenuItem>
              <LogOut />
              {t("common:signOut")}
            </AwDropdownMenuItem>
          </AwDropdownMenuContent>
        </AwDropdownMenu>
      </AwSidebarMenuItem>
    </AwSidebarMenu>
  );
};
