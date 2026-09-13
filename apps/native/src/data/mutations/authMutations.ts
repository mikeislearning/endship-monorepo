import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AuthApi } from "../api/authApi";

export const useSignOutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => AuthApi.signOut(),
    onSuccess: () => {
      // Clear the query cache after small delay to ensure the UI updates first
      setTimeout(() => {
        queryClient.clear();
      }, 500);
    },
  });
};
