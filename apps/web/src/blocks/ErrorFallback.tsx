import { AlertCircle } from "lucide-react";

import {
  AwAlert,
  AwAlertDescription,
  AwAlertTitle,
} from "@/components/AwAlert/AwAlert";
import { AwButton } from "@/components/AwButton/AwButton";
import { envVariables } from "@/utils/envVariables";

// eslint-disable-next-line @typescript-eslint/naming-convention
const SHOULD_PRINT_ERROR =
  envVariables.VITE_ENVIRONMENT === "local" ||
  envVariables.VITE_ENVIRONMENT === "preview" ||
  envVariables.VITE_ENVIRONMENT === "development";

type ErrorFallbackPropsType = {
  error: unknown;
  resetError: () => void;
};

export const ErrorFallback = ({
  error,
  resetError,
}: ErrorFallbackPropsType) => {
  const errorMessage = error instanceof Error ? error.message : undefined;

  return (
    <div className="m-auto flex w-md">
      <AwAlert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AwAlertTitle i18nKey="web:errorFallback.title" />
        <AwAlertDescription i18nKey="web:errorFallback.description" />
        <div className="col-start-2 grid justify-items-start gap-4 pt-2">
          {SHOULD_PRINT_ERROR && errorMessage && (
            <div className="w-full rounded-sm bg-primary px-3 py-2 text-primary-foreground">
              <pre className="text-wrap">{errorMessage}</pre>
            </div>
          )}
          <AwButton
            variant="outline"
            i18nKey="web:errorFallback.resetCta"
            className="w-full text-foreground shadow-none"
            onClick={resetError}
          />
        </div>
      </AwAlert>
    </div>
  );
};
