import { useContext } from "react";

import { CurrentAdminContext } from "@/context/CurrentAdminContext";

export const useCurrentAdmin = () => {
  const currentAdmin = useContext(CurrentAdminContext);

  if (!currentAdmin) {
    throw new Error("Could not get current admin");
  }

  return currentAdmin;
};
