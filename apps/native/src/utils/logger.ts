/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { sendSentryError } from "@/services/sentry";

// Simple logger utility that logs to console in development and sends errors to
// Sentry in production
export const appLogger = {
  nav: (route: string, params?: Record<string, unknown>) => {
    if (__DEV__) {
      console.log(`Switched to ${route}`);
      if (params) {
        console.log(`${route} Params: `, params);
      }
    }
  },
  debug: (...args: any[]) => {
    if (__DEV__) {
      const textArg = args[0] as string;
      console.log(`DEBUG ====> ${textArg}`);
      if (args[1]) {
        for (const arg of args) {
          if (arg !== textArg) {
            console.log("DEBUG DATA ====>", arg);
          }
        }
      }
    }
  },
  warn: (text: string) => {
    if (__DEV__) {
      console.warn(`WARN ====> : ${text}`);
    }
  },
  event: (text: string, data?: any) => {
    if (__DEV__) {
      console.log(`EVENT ====> ${text}`, data);
    }
  },
  error: ({
    error,
    message,
    shouldThrowError = false,
  }: {
    error: unknown;
    message: string;
    shouldThrowError?: boolean;
  }) => {
    if (__DEV__) {
      console.error(`ERROR ====> ${message}`, error);
    }

    sendSentryError({
      error,
      message,
      shouldThrowError,
    });
  },
};
