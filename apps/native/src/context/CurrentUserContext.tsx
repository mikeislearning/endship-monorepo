import { createContext } from "react";

import { UserType } from "@/domain/users";

export const CurrentUserContext = createContext<UserType | null>(null);
