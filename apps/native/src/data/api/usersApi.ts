import { sendSentryError } from "@/services/sentry";
import { supabaseClient } from "@/services/supabase";

export const UsersApi = {
  getUser: async (userId?: string | null) => {
    if (!userId) {
      return null;
    }

    const { data, error } = await supabaseClient
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      sendSentryError({ message: "Error getting user", error });
    }

    return data;
  },
};
