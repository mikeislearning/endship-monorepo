import { ReactNode, useEffect } from "react";
import { toast } from "sonner-native";

import { LoadingScreen } from "@/blocks/LoadingScreen";
import { useGetCurrentUserQuery } from "@/data/queries/usersQueries";
import { useTranslator } from "@/hooks/useTranslate";

import { CurrentUserContext } from "./CurrentUserContext";

type CurrentUserContextProviderPropsType = {
  children: ReactNode;
};

export const CurrentUserContextProvider = ({
  children,
}: CurrentUserContextProviderPropsType) => {
  const { t } = useTranslator();
  const { data: user, isLoading, error } = useGetCurrentUserQuery();

  useEffect(() => {
    if (error) {
      // On an error (usually from not having a corresponding user in the database)
      // Display an error message and sign out the user
      toast.error(t("native:login.errors.unknown"), {
        duration: 10000,
      });
    }
  }, [error, t]);

  if (isLoading || !user) {
    return <LoadingScreen hasLogoutFallback />;
  }

  return (
    <CurrentUserContext.Provider value={user}>
      {children}
    </CurrentUserContext.Provider>
  );
};
