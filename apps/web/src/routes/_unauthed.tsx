import { useEffect } from "react";
import {
  createFileRoute,
  Outlet,
  redirect,
  useNavigate,
} from "@tanstack/react-router";

import { authSearchParamsSchema } from "@/domain/auth";
import { useIsAuthenticated } from "@/stores/authStore";

const UnauthedRouteLayout = () => {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const { redirect } = Route.useSearch();

  useEffect(() => {
    // When isAuthenticated changes and the user is authenticated,
    // redirect them to the redirect path
    if (isAuthenticated) {
      void navigate({ to: redirect ?? "/" });
    }
  }, [isAuthenticated, navigate, redirect]);

  return <Outlet />;
};

export const Route = createFileRoute("/_unauthed")({
  component: UnauthedRouteLayout,
  validateSearch: authSearchParamsSchema,
  beforeLoad: ({ context }) => {
    if (context.isAuthenticated) {
      throw redirect({
        to: "/",
      });
    }
  },
});
