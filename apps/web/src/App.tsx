import "./index.css";

// import "./tangerine.css";
// import "./neobrutalism.css";
// import "./mindsea.css";

import { useEffect } from "react";
import { RouterProvider } from "@tanstack/react-router";

import { routerInstance } from "@/utils/router";

import { setupAuthListener, useIsAuthenticated } from "./stores/authStore";

export const App = () => {
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    const authSubscription = setupAuthListener();

    return () => {
      authSubscription.unsubscribe();
    };
  }, []);

  if (isAuthenticated === undefined) {
    return null;
  }

  return (
    <RouterProvider
      router={routerInstance}
      context={{
        isAuthenticated,
      }}
    />
  );
};
