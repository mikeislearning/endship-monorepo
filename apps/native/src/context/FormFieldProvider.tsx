import { createContext } from "react";
import { FieldPath, FieldValues } from "react-hook-form";

export type FormFieldContextValueType<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

export const FormFieldContext = createContext<FormFieldContextValueType>(
  {} as FormFieldContextValueType,
);
