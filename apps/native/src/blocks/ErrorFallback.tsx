import { AlertCircleIcon } from "lucide-react-native";

import {
  AnAlert,
  AnAlertDescription,
  AnAlertTitle,
} from "@/components/AnAlert";
import { AnBox } from "@/components/AnBox";
import { AnButton } from "@/components/AnButton/AnButton";
import { AnText } from "@/components/AnText/AnText";
import { envVariables } from "@/utils/envVariables";

// eslint-disable-next-line @typescript-eslint/naming-convention
const SHOULD_PRINT_ERROR =
  envVariables.EXPO_PUBLIC_ENVIRONMENT === "local" ||
  envVariables.EXPO_PUBLIC_ENVIRONMENT === "development";

type ErrorFallbackPropsType = {
  error: unknown;
  resetError: () => Promise<void>;
};

export const ErrorFallback = ({
  error,
  resetError,
}: ErrorFallbackPropsType) => {
  const errorMessage = error instanceof Error ? error.message : undefined;

  return (
    <AnBox className="flex-1 items-center justify-center px-4">
      <AnAlert variant="destructive" icon={AlertCircleIcon} className="w-full">
        <AnAlertTitle i18nKey="common:errorFallback.title" />
        <AnAlertDescription i18nKey="common:errorFallback.description" />
        <AnBox className="items-start gap-4 pt-2">
          {SHOULD_PRINT_ERROR && errorMessage && (
            <AnBox className="bg-primary w-full rounded-sm px-3 py-2">
              <AnText className="text-primary-foreground font-mono font-medium">
                {errorMessage}
              </AnText>
            </AnBox>
          )}
          <AnButton
            variant="outline"
            i18nKey="common:errorFallback.resetCta"
            className="text-foreground w-full shadow-none"
            onPress={() => {
              void resetError();
            }}
          />
        </AnBox>
      </AnAlert>
    </AnBox>
  );
};
