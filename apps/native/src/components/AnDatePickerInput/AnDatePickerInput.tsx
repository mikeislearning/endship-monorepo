import { FieldValues } from "react-hook-form";

import { I18nKeyType } from "@/i18n";

import { AnFormInput, BaseFormInputPropsType } from "../AnForm";
import {
  BaseDatePickerInput,
  BaseDatePickerInputPropsType,
} from "./BaseDatePickerInput";

type AnDatePickerInputPropsType<T extends FieldValues> =
  BaseFormInputPropsType<T> &
    Omit<BaseDatePickerInputPropsType, "onChange"> & {
      placeholderI18nKey?: I18nKeyType;
      placeholderI18nOptions?: object;
      inputClassName?: string;
    };

export const AnDatePickerInput = <T extends FieldValues>({
  placeholderI18nKey,
  placeholderI18nOptions,
  inputClassName,
  ...props
}: AnDatePickerInputPropsType<T>) => {
  return (
    <AnFormInput {...props}>
      {({ field, hasError }) => (
        <BaseDatePickerInput
          i18nKey={placeholderI18nKey}
          i18nOptions={placeholderI18nOptions}
          className={inputClassName}
          hasError={hasError}
          {...field}
          {...props}
        />
      )}
    </AnFormInput>
  );
};
