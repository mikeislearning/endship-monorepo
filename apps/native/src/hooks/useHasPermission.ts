import { ActionsType, DBTablesType } from "@libs/authorization";
import {
  useCurrentAuthUserId,
  useCurrentAuthUserRole,
} from "@/stores/authStore";
import { hasPermission } from "@/utils/authorization";

type UseHasPermissionType = {
  action: ActionsType;
  subject: DBTablesType;
  subjectResource?: object;
};

export const useHasPermission = (params: UseHasPermissionType) => {
  const currentAuthUserId = useCurrentAuthUserId();
  const currentAuthUserRole = useCurrentAuthUserRole();

  return hasPermission({
    userId: currentAuthUserId ?? "",
    userRole: currentAuthUserRole,
    ...params,
  });
};
