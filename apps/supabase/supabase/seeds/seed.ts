/**
 * ! Executing this script will delete all data in your database and reseed it.
 */
import process from "node:process";
import { createSeedClient } from "@snaplet/seed";

import { seedAdmins } from "./seedAdmins";
import { seedAuthUsers } from "./seedAuth";

const main = async () => {
  // DRY RUN generates the seed SQL without executing it
  const seedClient = await createSeedClient({ dryRun: true });

  // Truncate all tables in the database
  await seedClient.$resetDatabase();

  // Seed tables

  // auth.users seed is required for authenticated tests, so make sure to
  // configure it as needed when setting up your project.
  await seedAuthUsers({ seedClient });

  await seedAdmins({ seedClient });

  process.exit();
};

main();
