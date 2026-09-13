import { useEffect } from "react";
import { ErrorBoundary } from "@sentry/react";
import { QueryClientProvider } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  useNavigate,
} from "@tanstack/react-router";

import { ErrorFallback } from "@/blocks/ErrorFallback";
import { AwToaster } from "@/components/AwToaster";
import { queryClient } from "@/utils/queryClient";
import { RouterContextType } from "@/utils/router";

const RootContainer = () => (
  <div className="flex min-h-screen">
    <QueryClientProvider client={queryClient}>
      <HeadContent />
      <ErrorBoundary fallback={props => <ErrorFallback {...props} />}>
        <Outlet />
      </ErrorBoundary>
      <AwToaster />
      {/* Uncomment the below when you need to use the devtools */}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      {/* <TanStackRouterDevtools position="top-right" /> */}
    </QueryClientProvider>
  </div>
);

const NotFoundHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to the home route
    // TODO: Replace with "/" when the home route is implemented
    void navigate({ to: "/login", replace: true });
  }, [navigate]);

  return null;
};

export const Route = createRootRouteWithContext<RouterContextType>()({
  component: RootContainer,
  notFoundComponent: NotFoundHandler,
});
