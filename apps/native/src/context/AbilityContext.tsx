import { createContext } from "react";

import { abilities } from "@libs/authorization";

export const AbilityContext = createContext(
  abilities({
    userId: "",
    userRole: null,
  }),
);
