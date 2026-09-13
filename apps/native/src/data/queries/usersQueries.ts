import { useQuery } from "@tanstack/react-query";

import { FIVE_MINUTES_IN_MS } from "@/domain/constants";
import {
  useCurrentAuthUserId,
  useCurrentAuthUserRole,
} from "@/stores/authStore";

import { UsersApi } from "../api/usersApi";

export const UserQueryKeys = {
  all: ["users"] as const,
  me: () => [...UserQueryKeys.all, "me"] as const,
  details: (id: string) => [...UserQueryKeys.all, "details", id] as const,
};

export const useGetCurrentUserQuery = () => {
  const currentAuthUserId = useCurrentAuthUserId();
  const currentAuthUserRole = useCurrentAuthUserRole();

  const isRegularUser = currentAuthUserRole === "USER";

  return useQuery({
    queryKey: UserQueryKeys.me(),
    queryFn: () => UsersApi.getUser(currentAuthUserId),
    staleTime: FIVE_MINUTES_IN_MS,
    refetchInterval: FIVE_MINUTES_IN_MS,
    enabled: Boolean(currentAuthUserId && isRegularUser),
  });
};
