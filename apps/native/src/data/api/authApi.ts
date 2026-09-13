import { Session } from "@supabase/supabase-js";

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
  signOut: () => supabaseClient.auth.signOut(),
};
