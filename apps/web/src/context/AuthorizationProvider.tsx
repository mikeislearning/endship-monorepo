import { ReactNode } from "react";
import { AbilityProvider } from "@casl/react";

import { abilities } from "@libs/authorization";
import { useCurrentAdmin } from "@/hooks/useCurrentAdmin";

export const AuthorizationContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const currentAdmin = useCurrentAdmin();

  return (
    <AbilityProvider
      value={abilities({
        userId: currentAdmin.id,
        userRole: currentAdmin.is_super_admin ? "SUPER_ADMIN" : "ADMIN",
      })}>
      {children}
    </AbilityProvider>
  );
};
