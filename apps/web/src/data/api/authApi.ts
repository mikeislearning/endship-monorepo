import { Session } from "@supabase/supabase-js";

import { sendSentryError } from "@/services/sentry";
import { supabaseClient } from "@/services/supabase";

export const AuthApi = {
  subscribeToAuthStateChange: (
    onSession: (session: Session | null) => void,
  ) => {
    // Initial check
    void supabaseClient.auth.getSession().then(({ data }) => {
      onSession(data.session);
    });

    // Listen for changes
    const { data } = supabaseClient.auth.onAuthStateChange(
      (_event, session) => {
        onSession(session);
      },
    );

    // Return the subscription to unsubscribe later
    return data.subscription;
  },
  signInWithGoogle: async () => {
    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      sendSentryError({ message: "Error signing in with Google", error });
    }
  },
  signOut: () => supabaseClient.auth.signOut(),
  refreshSession: ({
    refreshToken,
    providerToken,
  }: {
    refreshToken: string;
    providerToken: string;
  }) => {
    return supabaseClient.auth
      .refreshSession({ refresh_token: refreshToken })
      .then(() => {
        void supabaseClient.auth.updateUser({
          data: { provider_token: providerToken },
        });
      })
      .catch(error => {
        sendSentryError({
          error,
          message: "Failed to refresh session",
        });
      });
  },
};
