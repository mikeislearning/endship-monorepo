import { useEffect } from "react";

import { AuthLoading } from "@/blocks/AuthLoading";
import { useSignOutMutation } from "@/data/mutations/authMutations";

export const LogoutPage = () => {
  const { mutate: signOut } = useSignOutMutation();

  useEffect(() => {
    signOut();
  }, [signOut]);

  return <AuthLoading />;
};
