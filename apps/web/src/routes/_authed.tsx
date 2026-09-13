import { useEffect } from "react";
import {
  createFileRoute,
  Outlet,
  redirect,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";

import { AuthorizationContextProvider } from "@/context/AuthorizationProvider";
import { CurrentAdminContextProvider } from "@/context/CurrentAdminProvider";
import { SidebarProvider } from "@/context/SidebarProvider";
import { AppSidebar } from "@/interactors/AppSidebar";
import { useIsAuthenticated } from "@/stores/authStore";

const AuthedLayout = () => {
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // When isAuthenticated changes and the user is not authenticated,
    // redirect them to the redirect path
    if (isAuthenticated === false && !location.pathname.startsWith("/login")) {
      void navigate({
        to: "/login",
        search: {
          redirect: location.pathname.startsWith("/logout")
            ? undefined
            : location.pathname,
        },
      });
    }
  }, [isAuthenticated, navigate, location.pathname]);

  return (
    <CurrentAdminContextProvider>
      <AuthorizationContextProvider>
        <SidebarProvider>
          <AppSidebar />
          <Outlet />
        </SidebarProvider>
      </AuthorizationContextProvider>
    </CurrentAdminContextProvider>
  );
};

export const Route = createFileRoute("/_authed")({
  component: AuthedLayout,
  beforeLoad: ({ context, location }) => {
    if (!context.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.pathname.startsWith("/logout")
            ? undefined
            : location.href,
        },
      });
    }
  },
});
