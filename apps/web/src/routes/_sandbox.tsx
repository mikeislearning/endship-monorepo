import { useEffect } from "react";
import {
  createFileRoute,
  Outlet,
  redirect,
  useLocation,
} from "@tanstack/react-router";
import i18next from "i18next";

import { AwSeparator } from "@/components/AwSeparator";
import { AwSidebarInset, AwSidebarTrigger } from "@/components/AwSidebar";
import { SidebarProvider } from "@/context/SidebarProvider";
import { ModeSwitcher } from "@/sandbox/ModeSwitcher";
import { NavHeader } from "@/sandbox/NavHeader";
import { SidebarDemo } from "@/sandbox/SidebarDemo";
import { envVariables } from "@/utils/envVariables";

const SandboxLayout = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to the top of the page when the location changes
    scrollTo(0, 0);
  }, [location.href]);

  return (
    <SidebarProvider>
      <SidebarDemo />
      <AwSidebarInset>
        <header className="sticky inset-x-0 top-0 isolate z-10 flex shrink-0 items-center gap-2 border-b bg-background">
          <div className="flex h-14 w-full items-center gap-2 px-4">
            <AwSidebarTrigger className="-ml-1.5" />
            <AwSeparator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4 data-[orientation=vertical]:self-center"
            />
            <NavHeader />
            <div className="ml-auto flex items-center">
              <ModeSwitcher />
            </div>
          </div>
        </header>
        <Outlet />
      </AwSidebarInset>
    </SidebarProvider>
  );
};

export const Route = createFileRoute("/_sandbox")({
  component: SandboxLayout,
  beforeLoad: async () => {
    // Sandbox routes are disabled in production
    if (envVariables.VITE_ENVIRONMENT === "production") {
      throw redirect({
        to: "/",
      });
    } else {
      // Load the sandbox namespace for i18next
      await i18next.loadNamespaces("sandbox");
    }
  },
});
