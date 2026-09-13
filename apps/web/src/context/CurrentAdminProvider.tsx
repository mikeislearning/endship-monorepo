import { ReactNode, useEffect } from "react";
import { toast } from "sonner";

import { AuthLoading } from "@/blocks/AuthLoading";
import { useSignOutMutation } from "@/data/mutations/authMutations";
import { useGetCurrentAdminQuery } from "@/data/queries/adminQueries";
import { useTranslator } from "@/hooks/useTranslate";

import { CurrentAdminContext } from "./CurrentAdminContext";

export const CurrentAdminContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { t } = useTranslator();
  const { data: admin, isLoading, error } = useGetCurrentAdminQuery();
  const { mutate: signOut } = useSignOutMutation();

  useEffect(() => {
    if (error) {
      // On an error (usually from not having a corresponding admin in the database)
      // Display an error message and sign out the user
      toast.error(t("web:login.errors.unauthorized"), {
        duration: 3000,
      });
      signOut();
    }
  }, [error, t, signOut]);

  if (isLoading || !admin) {
    return <AuthLoading />;
  }

  return (
    <CurrentAdminContext.Provider value={admin}>
      {children}
    </CurrentAdminContext.Provider>
  );
};
