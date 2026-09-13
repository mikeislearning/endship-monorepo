import { routerInstance } from "@/utils/router";

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof routerInstance;
  }
}
