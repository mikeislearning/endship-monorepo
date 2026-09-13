import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

import { AuthApi } from "../api/authApi";

export const useSignInWithGoogleMutation = () => {
  return useMutation({
    mutationFn: () => AuthApi.signInWithGoogle(),
  });
};

export const useRefreshSessionMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: ({
      refreshToken,
      providerToken,
    }: {
      refreshToken: string;
      providerToken: string;
    }) => AuthApi.refreshSession({ refreshToken, providerToken }),
    onSuccess: () => {
      void router.invalidate();
    },
  });
};

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
