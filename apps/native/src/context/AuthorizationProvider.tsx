import { ReactNode } from "react";
import { AbilityProvider } from "@casl/react";

import { abilities } from "@libs/authorization";
import {
  useCurrentAuthUserId,
  useCurrentAuthUserRole,
} from "@/stores/authStore";

export const AuthorizationContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const currentAuthUserId = useCurrentAuthUserId();
  const currentAuthUserRole = useCurrentAuthUserRole();

  return (
    <AbilityProvider
      value={abilities({
        userId: currentAuthUserId ?? "",
        userRole: currentAuthUserRole,
      })}>
      {children}
    </AbilityProvider>
  );
};
