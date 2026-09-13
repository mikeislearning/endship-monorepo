import { useContext } from "react";

import { CurrentUserContext } from "@/context/CurrentUserContext";

export const useCurrentUser = () => {
  const currentUser = useContext(CurrentUserContext);

  if (!currentUser) {
    throw new Error("Could not get current user");
  }

  return currentUser;
};
