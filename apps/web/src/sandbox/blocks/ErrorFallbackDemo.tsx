import { ErrorFallback } from "@/blocks/ErrorFallback";
import { appLogger } from "@/utils/logger";

export const ErrorFallbackDemo = () => {
  return (
    <ErrorFallback
      error={
        new Error(
          "This is the Error.message that will only show in local and development environments",
        )
      }
      resetError={() => {
        appLogger.debug("resetError");
      }}
    />
  );
};
