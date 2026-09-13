import { ActionsType, DBTablesType } from "@libs/authorization";
import { hasPermission } from "@/utils/authorization";

import { useCurrentAdmin } from "./useCurrentAdmin";

type UseHasPermissionType = {
  action: ActionsType;
  subject: DBTablesType;
  subjectResource?: object;
};

export const useHasPermission = (params: UseHasPermissionType) => {
  const currentAdmin = useCurrentAdmin();

  return hasPermission({
    userId: currentAdmin.id,
    userRole: currentAdmin.is_super_admin ? "SUPER_ADMIN" : "ADMIN",
    ...params,
  });
};
