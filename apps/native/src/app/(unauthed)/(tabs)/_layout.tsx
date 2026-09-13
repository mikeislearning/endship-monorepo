import React, { useEffect } from "react";
import { Redirect, Slot, Tabs } from "expo-router";
import { loadNamespaces, t } from "i18next";
import {
  ComponentIcon,
  PaletteIcon,
  TextCursorInputIcon,
} from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemeToggle } from "@/blocks/ThemeToggle";
import { WebMenubar } from "@/blocks/WebMenubar";
import { AnBox } from "@/components/AnBox";
import { AnIcon } from "@/components/AnIcon";
import { AnTouchableOpacity } from "@/components/AnTouchableOpacity";
import { TAB_BAR_HEIGHT } from "@/domain/constants";
import { tabItems } from "@/domain/tabs";
import { useAppTheme } from "@/hooks/useAppTheme";
import { usePlatformOS } from "@/hooks/usePlatformOS";
import { useIsAuthenticated } from "@/stores/authStore";
import { PRIMARY_FONT } from "@/theme/fonts";
import { removeNullValues } from "@/utils/object";
import { cn } from "@/utils/tailwind";

export default function TabLayout() {
  const { resolvedColors } = useAppTheme();
  const insets = useSafeAreaInsets();
  const { isWeb } = usePlatformOS();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    void loadNamespaces("sandbox");
  }, []);

  if (isWeb) {
    return (
      <div className="flex h-screen flex-col">
        <WebMenubar items={tabItems} />
        <div className="bg-background min-h-0 flex-1 overflow-y-auto">
          <Slot />
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Redirect href="/" />;
  }

  return (
    <>
      <AnBox className="top-safe absolute inset-x-0 z-40 w-full items-center">
        <ThemeToggle />
      </AnBox>
      <Tabs
        initialRouteName="components"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: resolvedColors.sidebarForeground,
          tabBarInactiveTintColor: resolvedColors.sidebarRing,
          tabBarStyle: {
            backgroundColor: resolvedColors.sidebar,
            borderColor: resolvedColors.sidebarBorder,
            borderTopWidth: 1,
            height: insets.bottom + TAB_BAR_HEIGHT,
          },
          tabBarLabelStyle: {
            fontSize: 14,
            fontFamily: PRIMARY_FONT.MEDIUM,
          },
          tabBarButton(props) {
            return <AnTouchableOpacity {...removeNullValues(props)} />;
          },
        }}>
        <Tabs.Screen
          name="components"
          options={{
            title: t("sandbox:components.name"),
            tabBarIcon: ({ focused }) => (
              <AnIcon
                as={ComponentIcon}
                className={cn("text-sidebar-ring size-5", {
                  "text-sidebar-foreground": focused,
                })}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="form"
          options={{
            title: t("sandbox:form.name"),
            tabBarIcon: ({ focused }) => (
              <AnIcon
                as={TextCursorInputIcon}
                className={cn("text-sidebar-ring size-5", {
                  "text-sidebar-foreground": focused,
                })}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="theme"
          options={{
            title: t("sandbox:theme.name"),
            tabBarIcon: ({ focused }) => (
              <AnIcon
                as={PaletteIcon}
                className={cn("text-sidebar-ring size-5", {
                  "text-sidebar-foreground": focused,
                })}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
