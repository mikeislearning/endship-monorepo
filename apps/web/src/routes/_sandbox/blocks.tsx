import { createFileRoute } from "@tanstack/react-router";

import { BlocksDemo } from "@/sandbox/pages/BlocksDemo";

export const Route = createFileRoute("/_sandbox/blocks")({
  component: BlocksDemo,
});
