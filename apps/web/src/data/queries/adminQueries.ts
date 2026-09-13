import { useQuery } from "@tanstack/react-query";

import { FIVE_MINUTES_IN_MS } from "@/domain/constants";
import {
  useCurrentAuthUserId,
  useCurrentAuthUserRole,
} from "@/stores/authStore";

import { AdminsApi } from "../api/adminsApi";

export const AdminQueryKeys = {
  all: ["admin"] as const,
  me: () => [...AdminQueryKeys.all, "me"] as const,
  details: (id: string) => [...AdminQueryKeys.all, "details", id] as const,
};

export const useGetCurrentAdminQuery = () => {
  const currentAuthUserId = useCurrentAuthUserId();
  const currentAuthUserRole = useCurrentAuthUserRole();

  const isAdminUser =
    currentAuthUserRole === "ADMIN" || currentAuthUserRole === "SUPER_ADMIN";

  return useQuery({
    queryKey: AdminQueryKeys.me(),
    queryFn: () => AdminsApi.getAdmin(currentAuthUserId),
    staleTime: FIVE_MINUTES_IN_MS,
    refetchInterval: FIVE_MINUTES_IN_MS,
    enabled: Boolean(currentAuthUserId && isAdminUser),
  });
};
