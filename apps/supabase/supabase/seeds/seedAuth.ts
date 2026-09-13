import { SeedClient } from "@snaplet/seed";
import dayjs from "dayjs";

import users from "./data/users.json";

const NOW = dayjs().toISOString();

export const seedAuthUsers = async ({
  seedClient,
}: {
  seedClient: SeedClient;
}) => {
  for (const role of ["SUPER_ADMIN", "USER"]) {
    await seedClient.auth_users(
      users.map(u => ({
        instance_id: "00000000-0000-0000-0000-000000000000",
        id: role === "SUPER_ADMIN" ? u.adminId : u.userId,
        aud: "authenticated",
        role: "authenticated",
        email:
          role === "SUPER_ADMIN" ? u.email.replace(/@/, "+admin@") : u.email,
        email_confirmed_at: NOW,
        invited_at: null,
        recovery_sent_at: null,
        raw_app_meta_data: {
          provider: "email",
          providers: ["email"],
          role,
        },
        raw_user_meta_data: {},
        created_at: NOW,
        updated_at: NOW,
        encrypted_password:
          "$2a$13$NXVJGThfibDYY2traSvH6.eiko1/qf/2dA8JdBz1sZgbuq5HOxiGy", // encrypted password for password123
        confirmation_sent_at: null,
        email_change_sent_at: null,
        last_sign_in_at: null,
        confirmed_at: null,
        banned_until: null,
        reauthentication_sent_at: null,
        deleted_at: null,
        providers: ["email"],
        is_super_admin: false,
        email_change: "",
      })),
    );
  }
};
