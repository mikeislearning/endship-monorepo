import { User } from "@supabase/supabase-js";
import * as Sentry from "@sentry/react-native";

import { envVariables } from "@/utils/envVariables";

export const navigationIntegration = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay: true,
});

const mobileReplayIntegration = Sentry.mobileReplayIntegration({
  maskAllImages: true,
  maskAllText: true,
  maskAllVectors: true,
});

export const initSentry = () => {
  Sentry.init({
    dsn: envVariables.EXPO_PUBLIC_SENTRY_DSN,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1,
    enabled: !__DEV__,
    integrations: [mobileReplayIntegration, navigationIntegration],
    enableNativeFramesTracking: true,
    environment: envVariables.EXPO_PUBLIC_ENVIRONMENT,
  });
};

export const sendSentryError = ({
  error,
  message,
  shouldThrowError = true,
}: {
  error: unknown;
  message: string;
  shouldThrowError?: boolean;
}) => {
  const code =
    error instanceof Error && "code" in error ? error.code : "No code provided";
  const details =
    error instanceof Error && "details" in error
      ? error.details
      : "No details provided";
  const hint =
    error instanceof Error && "hint" in error ? error.hint : "No hint provided";
  const errorText = (error as Error)?.message ?? message;

  Sentry.captureMessage(message, {
    extra: {
      code,
      details,
      hint,
      errorText: errorText,
    },
  });

  if (shouldThrowError) {
    throw new Error(message);
  }
};

export const setSentryUser = (user: User | null) => {
  const sentryUser = user ? { id: user.id, email: user.email } : null;

  Sentry.setUser(sentryUser);
};
