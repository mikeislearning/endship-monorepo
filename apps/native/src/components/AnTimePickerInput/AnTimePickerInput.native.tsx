import { FieldValues } from "react-hook-form";

import { I18nKeyType } from "@/i18n";

import { AnFormInput, BaseFormInputPropsType } from "../AnForm";
import {
  BaseTimePickerInput,
  BaseTimePickerInputPropsType,
} from "./BaseTimePickerInput.native";

type AnTimePickerInputPropsType<T extends FieldValues> =
  BaseFormInputPropsType<T> &
    Omit<BaseTimePickerInputPropsType, "onChange"> & {
      placeholderI18nKey?: I18nKeyType;
      placeholderI18nOptions?: object;
      inputClassName?: string;
    };

export const AnTimePickerInput = <T extends FieldValues>({
  placeholderI18nKey,
  placeholderI18nOptions,
  inputClassName,
  ...props
}: AnTimePickerInputPropsType<T>) => {
  return (
    <AnFormInput {...props}>
      {({ field, hasError }) => (
        <BaseTimePickerInput
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
