import { sendSentryError } from "@/services/sentry";
import { supabaseClient } from "@/services/supabase";

export const AdminsApi = {
  getAdmin: async (adminId?: string | null) => {
    if (!adminId) {
      return null;
    }

    const { data, error } = await supabaseClient
      .from("admins")
      .select("*")
      .eq("id", adminId)
      .single();

    if (error) {
      sendSentryError({ message: "Error getting admin", error });
    }

    return data;
  },
};
