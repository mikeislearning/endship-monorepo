import { useState } from "react";
import { Href, useSegments } from "expo-router";
import { MenuIcon, XIcon } from "lucide-react-native";

import { AnBox } from "@/components/AnBox";
import { AnIcon } from "@/components/AnIcon";
import { AnLink } from "@/components/AnLink";
import { AnText } from "@/components/AnText/AnText";
import { AnTouchableOpacity } from "@/components/AnTouchableOpacity";
import { I18nKeyType } from "@/i18n";
import { cn } from "@/utils/tailwind";

import { ThemeToggle } from "./ThemeToggle";

type WebMenubarPropsType = {
  items: {
    i18nKey: I18nKeyType;
    href: Href;
  }[];
};

export const WebMenubar = ({ items }: WebMenubarPropsType) => {
  const segments = useSegments();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (href: Href) => {
    const hrefPath = typeof href === "string" ? href : href.pathname;

    const routePath = (
      hrefPath.startsWith("/") ? hrefPath.substring(1) : hrefPath
    )
      .split("/")
      .filter(segment => !segment.startsWith("(") || !segment.endsWith(")"))
      .join("/");

    const activeSegments = segments
      .filter(segment => !segment.startsWith("(") || !segment.endsWith(")"))
      .join("/");

    return activeSegments === routePath;
  };

  return (
    <>
      <AnBox className="border-border bg-sidebar sticky inset-x-0 top-0 h-14 flex-row items-center justify-between gap-2 border-b py-1.5 pl-4 pr-5">
        <AnBox className="w-full flex-row items-center justify-center md:w-1/2 md:justify-start">
          <AnLink href="/" className="flex flex-row items-center gap-2">
            <div className="text-sidebar-foreground-foreground bg-sidebar-primary flex aspect-square w-8 items-center justify-center rounded-lg">
              <img
                src="https://github.com/mindsea.png"
                alt="MindSea"
                className="rounded-lg"
              />
            </div>
            <AnText variant="mdBold" i18nKey="sandbox:orgName" />
          </AnLink>
        </AnBox>
        <AnBox className="hidden flex-1 flex-row items-center justify-end gap-6 md:flex">
          {items.map(({ i18nKey, href }, index) => (
            <AnLink href={href} key={index}>
              <AnText
                i18nKey={i18nKey}
                variant="mdBold"
                className={cn(
                  "text-sidebar-ring hover:text-sidebar-foreground transition-colors",
                  {
                    "text-sidebar-foreground": isActive(href),
                  },
                )}
              />
            </AnLink>
          ))}
          <ThemeToggle />
        </AnBox>
        <AnTouchableOpacity
          className="absolute right-3 top-4 flex md:hidden"
          onPress={() => setIsMenuOpen(!isMenuOpen)}>
          <AnIcon
            as={isMenuOpen ? XIcon : MenuIcon}
            size={24}
            className="text-sidebar-foreground"
          />
        </AnTouchableOpacity>
      </AnBox>
      {isMenuOpen && (
        <AnBox className="border-sidebar-border bg-background absolute inset-0 top-[72px] z-50 items-center gap-3 border-b px-4">
          {items.map(({ i18nKey, href }, index) => (
            <AnBox key={index}>
              <AnLink
                href={href}
                onPress={() => {
                  setIsMenuOpen(false);
                }}>
                <AnText
                  i18nKey={i18nKey}
                  variant="lgBold"
                  className={cn(
                    "text-sidebar-ring hover:text-sidebar-foreground transition-colors",
                    {
                      "text-sidebar-foreground": isActive(href),
                    },
                  )}
                />
              </AnLink>
            </AnBox>
          ))}
        </AnBox>
      )}
    </>
  );
};
