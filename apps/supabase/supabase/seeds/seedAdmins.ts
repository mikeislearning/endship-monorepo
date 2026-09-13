import { SeedClient } from "@snaplet/seed";

import users from "./data/users.json";

export const seedAdmins = async ({
  seedClient,
}: {
  seedClient: SeedClient;
}) => {
  await seedClient.admins(
    users.map(u => ({
      id: u.adminId,
      email: u.email,
      first_name: u.firstName,
      last_name: u.lastName,
      is_super_admin: true,
      status: "ACTIVE",
    })),
  );
};
