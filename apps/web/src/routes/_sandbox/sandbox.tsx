import { createFileRoute } from "@tanstack/react-router";

import { ComponentsDemo } from "@/sandbox/pages/ComponentsDemo";

export const Route = createFileRoute("/_sandbox/sandbox")({
  component: ComponentsDemo,
});
