import { ComponentProps } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

import { I18nKeyType } from "@/i18n";
import { cn } from "@/utils/tailwind";

import {
  AwFormControl,
  AwFormDescription,
  AwFormErrorMessage,
  AwFormField,
  AwFormItem,
  AwFormLabel,
} from "../AwForm";
import { BaseTextareaInput } from "./BaseTextareaInput";
import {
  BaseTextInput,
  BaseTextInputPropsType,
  InputMaskType,
} from "./BaseTextInput";

type AwTextInputPropsType<T extends FieldValues> = Omit<
  BaseTextInputPropsType,
  "mask"
> &
  ComponentProps<"textarea"> & {
    name: FieldPath<T>;
    control: Control<T>;
    isMultiLine?: boolean;
    isDisabled?: boolean;
    labelI18nKey?: I18nKeyType;
    labelI18nOptions?: object;
    placeholderI18nKey?: I18nKeyType;
    placeholderI18nOptions?: object;
    descriptionI18nKey?: I18nKeyType;
    descriptionI18nOptions?: object;
    showError?: boolean;
    isRequired?: boolean;
    errorI18nKey?: I18nKeyType;
    errorI18nOptions?: object;
    mask?: Omit<InputMaskType, "fieldName">;
    inputClassName?: string;
  };

export const AwTextInput = <T extends FieldValues>({
  name,
  control,
  isMultiLine = false,
  isDisabled = false,
  labelI18nKey,
  labelI18nOptions,
  placeholderI18nKey,
  placeholderI18nOptions,
  descriptionI18nKey,
  descriptionI18nOptions,
  isRequired = true,
  showError = true,
  errorI18nKey,
  errorI18nOptions,
  mask,
  className,
  inputClassName,
  ...props
}: AwTextInputPropsType<T>) => {
  return (
    <AwFormField
      name={name}
      control={control}
      render={({ field }) => (
        <AwFormItem>
          <div className={cn("flex flex-col gap-2", className)}>
            {labelI18nKey && (
              <AwFormLabel
                i18nKey={labelI18nKey}
                i18nOptions={labelI18nOptions}
                isDisabled={isDisabled}
                isRequired={isRequired}
              />
            )}
            <AwFormControl>
              {isMultiLine ? (
                <BaseTextareaInput
                  i18nKey={placeholderI18nKey}
                  i18nOptions={placeholderI18nOptions}
                  className={inputClassName}
                  disabled={isDisabled}
                  {...field}
                  {...props}
                />
              ) : (
                <BaseTextInput
                  i18nKey={placeholderI18nKey}
                  i18nOptions={placeholderI18nOptions}
                  className={inputClassName}
                  disabled={isDisabled}
                  mask={mask ? { ...mask, fieldName: name } : undefined}
                  {...field}
                  {...props}
                />
              )}
            </AwFormControl>
            {descriptionI18nKey && (
              <AwFormDescription
                i18nKey={descriptionI18nKey}
                i18nOptions={descriptionI18nOptions}
              />
            )}
          </div>
          {showError && (
            <AwFormErrorMessage
              i18nKey={errorI18nKey}
              i18nOptions={errorI18nOptions}
            />
          )}
        </AwFormItem>
      )}
    />
  );
};
