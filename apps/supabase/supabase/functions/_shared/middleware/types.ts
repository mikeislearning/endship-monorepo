import { UserRoleType } from "@libs/authorization";

export type RequestContextType = {
  Variables: {
    userId: string;
    userEmail?: string;
    userRole: UserRoleType;
  };
};
