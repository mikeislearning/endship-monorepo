/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { isDevEnvironment } from "@/domain/constants";
import { sendSentryError } from "@/services/sentry";

/** Logger
 *
 * Provides all the different sorts of logging
 * error debug query mutation analytics
 *
 */

export const appLogger = {
  nav: (route: string, params?: Record<string, unknown>) => {
    if (isDevEnvironment) {
      console.log(`Switched to ${route}`);
      if (params) {
        console.log(`${route} Params: `, params);
      }
    }
  },
  debug: (...args: any[]) => {
    if (isDevEnvironment) {
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
    if (isDevEnvironment) {
      console.warn(`WARN ====> : ${text}`);
    }
  },
  event: (text: string, data?: any) => {
    if (isDevEnvironment) {
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
    if (isDevEnvironment) {
      console.error(`ERROR ====> ${message}`, error);
    }

    sendSentryError({
      error,
      message,
      shouldThrowError,
    });
  },
};
