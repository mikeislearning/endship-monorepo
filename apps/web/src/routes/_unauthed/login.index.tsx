import { createFileRoute } from "@tanstack/react-router";

import { authSearchParamsSchema } from "@/domain/auth";
import { LoginPage } from "@/interactors/LoginPage";

export const Route = createFileRoute("/_unauthed/login/")({
  component: LoginPage,
  validateSearch: authSearchParamsSchema,
});
