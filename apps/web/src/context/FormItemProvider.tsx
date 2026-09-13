import { createContext } from "react";

type FormItemContextValueType = {
  id: string;
};

export const FormItemContext = createContext<FormItemContextValueType>(
  {} as FormItemContextValueType,
);
