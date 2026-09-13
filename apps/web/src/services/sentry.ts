import { User } from "@supabase/supabase-js";
import * as Sentry from "@sentry/react";

import { envVariables } from "../utils/envVariables";
import { routerInstance } from "../utils/router";

const isEnabled = envVariables.VITE_ENVIRONMENT !== "local";

export const initSentry = () => {
  Sentry.init({
    dsn: envVariables.VITE_SENTRY_DSN,
    environment: envVariables.VITE_ENVIRONMENT,
    integrations: [
      Sentry.tanstackRouterBrowserTracingIntegration(routerInstance),
      Sentry.replayIntegration({
        maskAllText: true,
        maskAllInputs: true,
        blockAllMedia: true,
      }),
    ],
    enabled: isEnabled,
    // Session Replay
    replaysSessionSampleRate: isEnabled ? 0.1 : 0,
    replaysOnErrorSampleRate: isEnabled ? 1.0 : 0,
  });
};

export const sendSentryMessage = (msg: string) => {
  Sentry.captureMessage(msg);
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
    extra: { code, details, hint, errorText: errorText },
  });

  if (shouldThrowError) {
    throw new Error(message);
  }
};

export const setSentryUser = (user: User | null) => {
  const sentryUser = user ? { id: user.id, email: user.email } : null;

  Sentry.setUser(sentryUser);
};

export const addSentryBreadcrumb = ({
  category,
  message,
  data,
}: {
  category: string;
  message: string;
  data?: Record<string, unknown>;
}) => {
  Sentry.addBreadcrumb({
    category,
    message,
    data,
  });
};
