import {
  BadgeCheckIcon,
  BellIcon,
  ChevronsUpDownIcon,
  CreditCardIcon,
  LogOut,
  MoreHorizontalIcon,
  PencilIcon,
  ShareIcon,
  SparklesIcon,
  TrashIcon,
} from "lucide-react";

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
import { AwText } from "@/components/AwText/AwText";
import { useTranslator } from "@/hooks/useTranslate";

export const DropdownMenuDemo = () => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <UserDropdownMenu />
      <OptionsDropdownMenu />
    </div>
  );
};

const UserDropdownMenu = () => {
  const { t } = useTranslator();

  return (
    <AwDropdownMenu>
      <AwDropdownMenuTrigger
        render={
          <AwButton
            variant="outline"
            className="h-12 justify-start px-2 md:max-w-50"
          />
        }>
        <div className="grid flex-1 text-left leading-tight">
          <AwText
            variant="mdBold"
            className="truncate"
            i18nKey="sandbox:orgName"
          />
          <AwText
            as="span"
            variant="sm"
            className="truncate text-muted-foreground">
            accounts@mindsea.com
          </AwText>
        </div>
        <ChevronsUpDownIcon className="ml-auto text-muted-foreground" />
      </AwDropdownMenuTrigger>
      <AwDropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56"
        align="start">
        <AwDropdownMenuGroup>
          <AwDropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-2 py-1.5 text-left">
              <div className="grid flex-1 text-left leading-tight">
                <AwText
                  variant="mdBold"
                  className="truncate"
                  i18nKey="sandbox:orgName"
                />
                <AwText
                  as="span"
                  className="truncate text-xs text-muted-foreground">
                  accounts@mindsea.com
                </AwText>
              </div>
            </div>
          </AwDropdownMenuLabel>
        </AwDropdownMenuGroup>
        <AwDropdownMenuSeparator />
        <AwDropdownMenuGroup>
          <AwDropdownMenuItem>
            <SparklesIcon />
            {t("sandbox:dropdownMenu.upgrade")}
          </AwDropdownMenuItem>
        </AwDropdownMenuGroup>
        <AwDropdownMenuSeparator />
        <AwDropdownMenuGroup>
          <AwDropdownMenuItem>
            <BadgeCheckIcon />
            {t("sandbox:dropdownMenu.account")}
          </AwDropdownMenuItem>
          <AwDropdownMenuItem>
            <CreditCardIcon />
            {t("sandbox:dropdownMenu.billing")}
          </AwDropdownMenuItem>
          <AwDropdownMenuItem>
            <BellIcon />
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
  );
};

const OptionsDropdownMenu = () => {
  const { t } = useTranslator();

  return (
    <AwDropdownMenu>
      <AwDropdownMenuTrigger render={<AwButton variant="ghost" size="icon" />}>
        <MoreHorizontalIcon />
      </AwDropdownMenuTrigger>
      <AwDropdownMenuContent align="start">
        <AwDropdownMenuGroup className="*:data-[slot=dropdown-menu-item]:[&>svg]:text-muted-foreground">
          <AwDropdownMenuItem>
            <PencilIcon />
            {t("common:edit")}
          </AwDropdownMenuItem>
          <AwDropdownMenuItem>
            <ShareIcon />
            {t("common:share")}
          </AwDropdownMenuItem>
        </AwDropdownMenuGroup>
        <AwDropdownMenuSeparator />
        <AwDropdownMenuGroup>
          <AwDropdownMenuItem variant="destructive">
            <TrashIcon />
            {t("common:delete")}
          </AwDropdownMenuItem>
        </AwDropdownMenuGroup>
      </AwDropdownMenuContent>
    </AwDropdownMenu>
  );
};
