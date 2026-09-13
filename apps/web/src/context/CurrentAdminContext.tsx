import { createContext } from "react";

import { AdminType } from "@/domain/admins";

export const CurrentAdminContext = createContext<AdminType | null>(null);
