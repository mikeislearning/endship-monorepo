import { Session } from "@supabase/supabase-js";
import { createStore, useSelector } from "@xstate/store-react";

import { UserRoleType } from "@libs/authorization";
import { AuthApi } from "@/data/api/authApi";
import { setSentryUser } from "@/services/sentry";

type AuthStoreContextType = {
  session: Session | null;
  isAuthenticated?: boolean;
};

type AuthStoreEventPayloadMapType = {
  authenticated: {
    session: Session;
  };
  unauthenticated: Record<never, never>;
};

const authStore = createStore<
  AuthStoreContextType,
  AuthStoreEventPayloadMapType,
  Partial<AuthStoreContextType>
>({
  context: {
    session: null,
    isAuthenticated: undefined, // Set to undefined initially, so we can render a loading state during initial auth check
  },
  on: {
    // eslint-disable-next-line max-params
    authenticated: (_context, event, enqueue) => {
      // Enqueue side effect to set the Sentry user
      enqueue.effect(() => {
        void setSentryUser(event.session.user);
      });

      return {
        session: event.session,
        isAuthenticated: true,
      };
    },
    // eslint-disable-next-line max-params
    unauthenticated: (_context, _event, enqueue) => {
      // Enqueue side effect to remove the Sentry user
      enqueue.effect(() => {
        void setSentryUser(null);
      });

      return {
        session: null,
        isAuthenticated: false,
      };
    },
  },
});

// Selectors
export const useIsAuthenticated = () =>
  useSelector(authStore, state => state.context.isAuthenticated);
export const useCurrentAuthUserId = () =>
  useSelector(authStore, state => state.context.session?.user.id);
export const useCurrentAuthUserRole = () =>
  useSelector(
    authStore,
    state => state.context.session?.user.app_metadata.role as UserRoleType,
  );

// Listeners
export const setupAuthListener = () => {
  return AuthApi.subscribeToAuthStateChange(session => {
    if (session) {
      // If there is a session, dispatch the authenticated event
      authStore.send({ type: "authenticated", session });
    } else {
      // If there is no session, dispatch the unauthenticated event
      authStore.send({
        type: "unauthenticated",
      });
    }
  });
};
