import { InputHTMLAttributes } from "react";
import {
  REGEXP_ONLY_CHARS,
  REGEXP_ONLY_DIGITS,
  REGEXP_ONLY_DIGITS_AND_CHARS,
} from "input-otp";
import { Control, FieldValues, Path } from "react-hook-form";

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
import {
  BaseOTPInput,
  BaseOTPInputGroup,
  BaseOTPInputSlot,
} from "./BaseOTPInput";

export type OTPInputType = "DIGITS" | "CHARACTERS" | "DIGITS_AND_CHARACTERS";

const getOTPPattern = (otpInputType?: OTPInputType) => {
  switch (otpInputType) {
    case "DIGITS":
      return REGEXP_ONLY_DIGITS;
    case "CHARACTERS":
      return REGEXP_ONLY_CHARS;
    case "DIGITS_AND_CHARACTERS":
      return REGEXP_ONLY_DIGITS_AND_CHARS;
    default:
      return undefined;
  }
};

type AwOTPInputPropsType<T extends FieldValues> =
  InputHTMLAttributes<HTMLInputElement> & {
    name: Path<T>;
    control: Control<T>;
    labelI18nKey?: I18nKeyType;
    labelI18nOptions?: object;
    descriptionI18nKey?: I18nKeyType;
    descriptionI18nOptions?: object;
    showError?: boolean;
    className?: string;
    inputClassName?: string;
    otpLength?: number;
    otpInputType?: OTPInputType;
  };

export const AwOTPInput = <T extends FieldValues>({
  name,
  control,
  labelI18nKey,
  labelI18nOptions,
  descriptionI18nKey,
  descriptionI18nOptions,
  showError = true,
  className,
  inputClassName,
  otpLength = 6,
  otpInputType,
  ...props
}: AwOTPInputPropsType<T>) => {
  return (
    <AwFormField
      control={control}
      name={name}
      render={({ field }) => (
        <AwFormItem>
          <div className={cn("flex flex-col gap-2", className)}>
            {labelI18nKey && (
              <AwFormLabel
                i18nKey={labelI18nKey}
                i18nOptions={labelI18nOptions}
              />
            )}
            <AwFormControl>
              <BaseOTPInput
                maxLength={otpLength}
                pattern={getOTPPattern(otpInputType)}
                className={inputClassName}
                {...props}
                {...field}>
                <BaseOTPInputGroup>
                  {Array.from(Array(otpLength).keys()).map((key, index) => (
                    <BaseOTPInputSlot index={index} key={key} />
                  ))}
                </BaseOTPInputGroup>
              </BaseOTPInput>
            </AwFormControl>
            {descriptionI18nKey && (
              <AwFormDescription
                i18nKey={descriptionI18nKey}
                i18nOptions={descriptionI18nOptions}
              />
            )}
          </div>
          {showError && <AwFormErrorMessage />}
        </AwFormItem>
      )}
    />
  );
};
