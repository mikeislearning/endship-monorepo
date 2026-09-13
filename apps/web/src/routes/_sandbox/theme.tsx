import { createFileRoute } from "@tanstack/react-router";

import { ThemeDemo } from "@/sandbox/pages/ThemeDemo";

export const Route = createFileRoute("/_sandbox/theme")({
  component: ThemeDemo,
});
