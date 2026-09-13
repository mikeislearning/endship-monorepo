import { useEffect, useState } from "react";
import { LogOutIcon } from "lucide-react-native";

import { AnBox } from "@/components/AnBox";
import { AnButton } from "@/components/AnButton/AnButton";
import { AnLoadingSpinner } from "@/components/AnLoadingSpinner";
import { AnText } from "@/components/AnText/AnText";
import { useSignOutMutation } from "@/data/mutations/authMutations";
import { cn } from "@/utils/tailwind";

type LoadingScreenPropsType = {
  className?: string;
  hasLogoutFallback?: boolean;
};

export const LoadingScreen = ({
  className,
  hasLogoutFallback,
}: LoadingScreenPropsType) => {
  const [shouldShowLogout, setShouldShowLogout] = useState(false);
  const { mutate: signOut } = useSignOutMutation();

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (hasLogoutFallback && !shouldShowLogout) {
      timeout = setTimeout(
        () => {
          setShouldShowLogout(true);
        },
        __DEV__ ? 5000 : 10000,
      );
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [hasLogoutFallback, shouldShowLogout]);

  return (
    <AnBox
      className={cn("bg-background flex-1 items-center justify-center", {
        className,
      })}>
      {shouldShowLogout ? (
        <AnBox className="-mt-12 gap-4">
          <AnText
            i18nKey="common:loadingError"
            className="whitespace-pre-line text-center"
          />
          <AnButton
            i18nKey="common:logout"
            variant="outline"
            IconComponent={LogOutIcon}
            isLoading={false}
            onPress={() => {
              signOut();
            }}
          />
        </AnBox>
      ) : (
        <AnLoadingSpinner size={40} className="-mt-32" />
      )}
    </AnBox>
  );
};
