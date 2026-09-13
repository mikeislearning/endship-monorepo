import { FieldValues } from "react-hook-form";

import { I18nKeyType } from "@/i18n";

import { AnFormInput, BaseFormInputPropsType } from "../AnForm";
import { BaseTextInput, BaseTextInputPropsType } from "./BaseTextInput";

type AnTextInputPropsType<T extends FieldValues> = BaseFormInputPropsType<T> &
  Omit<BaseTextInputPropsType, "onChange"> & {
    placeholderI18nKey?: I18nKeyType;
    placeholderI18nOptions?: object;
    inputClassName?: string;
  };

export const AnTextInput = <T extends FieldValues>({
  placeholderI18nKey,
  placeholderI18nOptions,
  inputClassName,
  ...props
}: AnTextInputPropsType<T>) => {
  return (
    <AnFormInput {...props}>
      {({ field, hasError }) => {
        const handleChangeText = (text: string) => {
          field.onChange(text);
        };

        const handleBlur = () => {
          field.onBlur();
        };

        return (
          <BaseTextInput
            i18nKey={placeholderI18nKey}
            i18nOptions={placeholderI18nOptions}
            className={inputClassName}
            editable={!props.isDisabled}
            hasError={hasError}
            value={field.value}
            onChangeText={handleChangeText}
            onBlur={handleBlur}
            {...props}
          />
        );
      }}
    </AnFormInput>
  );
};
