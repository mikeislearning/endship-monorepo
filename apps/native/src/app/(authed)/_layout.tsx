import { Redirect, Slot } from "expo-router";

import { AuthorizationContextProvider } from "@/context/AuthorizationProvider";
import { CurrentUserContextProvider } from "@/context/CurrentUserProvider";
import { useIsAuthenticated } from "@/stores/authStore";

export default function AuthedLayout() {
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) {
    return <Redirect href="/components" />;
  }

  return (
    <CurrentUserContextProvider>
      <AuthorizationContextProvider>
        <Slot />
      </AuthorizationContextProvider>
    </CurrentUserContextProvider>
  );
}
