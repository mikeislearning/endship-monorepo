import { Control, FieldValues, Path } from "react-hook-form";

import { I18nKeyType } from "@/i18n";
import { cn } from "@/utils/tailwind";

import {
  AwFormDescription,
  AwFormErrorMessage,
  AwFormField,
  AwFormItem,
  AwFormLabel,
} from "../AwForm";
import { BaseSliderInput, BaseSliderInputPropsType } from "./BaseSliderInput";

type AwSliderInputPropsType<T extends FieldValues> =
  BaseSliderInputPropsType & {
    name: Path<T>;
    control: Control<T>;
    labelI18nKey?: I18nKeyType;
    labelI18nOptions?: object;
    descriptionI18nKey?: I18nKeyType;
    descriptionI18nOptions?: object;
    showError?: boolean;
    errorI18nKey?: I18nKeyType;
    errorI18nOptions?: object;
    isDisabled?: boolean;
    isRequired?: boolean;
  };

export const AwSliderInput = <T extends FieldValues>({
  name,
  control,
  labelI18nKey,
  labelI18nOptions,
  descriptionI18nKey,
  descriptionI18nOptions,
  showError = true,
  errorI18nKey,
  errorI18nOptions,
  className,
  isDisabled = false,
  isRequired = false,
  ...props
}: AwSliderInputPropsType<T>) => {
  return (
    <AwFormField
      name={name}
      control={control}
      render={({ field }) => {
        const { value, onChange, ...fieldProps } = field;
        return (
          <AwFormItem>
            <div className={cn("flex flex-col gap-2", className)}>
              {labelI18nKey && (
                <AwFormLabel
                  i18nKey={labelI18nKey}
                  i18nOptions={labelI18nOptions}
                  isRequired={isRequired}
                />
              )}
              <BaseSliderInput
                disabled={isDisabled}
                onValueChange={values => {
                  onChange(Array.isArray(values) ? values[0] : values);
                }}
                value={[value]}
                {...props}
                {...fieldProps}
              />
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
        );
      }}
    />
  );
};
