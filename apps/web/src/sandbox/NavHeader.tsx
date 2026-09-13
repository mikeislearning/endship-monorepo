import { Link, LinkProps } from "@tanstack/react-router";

import {
  AwNavigationMenu,
  AwNavigationMenuItem,
  AwNavigationMenuLink,
  AwNavigationMenuList,
} from "@/components/AwNavigationMenu/AwNavigationMenu";
import { useTranslator } from "@/hooks/useTranslate";
import { I18nKeyType } from "@/i18n";

const NAV_ITEMS: {
  to: LinkProps["to"];
  label: I18nKeyType;
}[] = [
  {
    label: "sandbox:components.title",
    to: "/sandbox",
  },
  {
    label: "sandbox:blocks.title",
    to: "/blocks",
  },
  {
    label: "sandbox:theme.title",
    to: "/theme",
  },
];

export const NavHeader = () => {
  const { t } = useTranslator();

  return (
    <AwNavigationMenu className="hidden sm:flex">
      <AwNavigationMenuList className="gap-2 *:data-[slot=navigation-menu-item]:h-7 **:data-[slot=navigation-menu-link]:py-1 **:data-[slot=navigation-menu-link]:font-medium">
        {NAV_ITEMS.map(({ to, label }) => (
          <AwNavigationMenuItem key={to}>
            <AwNavigationMenuLink render={<Link to={to}>{t(label)}</Link>} />
          </AwNavigationMenuItem>
        ))}
      </AwNavigationMenuList>
    </AwNavigationMenu>
  );
};
