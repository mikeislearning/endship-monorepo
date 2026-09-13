import { createFileRoute } from "@tanstack/react-router";

import { LogoutPage } from "@/interactors/LogoutPage";

export const Route = createFileRoute("/_authed/logout")({
  component: LogoutPage,
});
