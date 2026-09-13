import { FieldValues } from "react-hook-form";

import { AnFormInput, BaseFormInputPropsType } from "../AnForm";
import {
  BaseOTPInput,
  BaseOTPInputGroup,
  BaseOTPInputSlot,
} from "./BaseOTPInput";

type AnOTPInputPropsType<T extends FieldValues> = BaseFormInputPropsType<T> & {
  inputClassName?: string;
  otpLength?: number;
  onComplete?: (otp: string) => void;
};

export const AnOTPInput = <T extends FieldValues>({
  inputClassName,
  otpLength = 6,
  ...props
}: AnOTPInputPropsType<T>) => {
  return (
    <AnFormInput {...props}>
      {({ field }) => (
        <BaseOTPInput
          maxLength={otpLength}
          className={inputClassName}
          {...props}
          {...field}
          render={({ slots }) => (
            <BaseOTPInputGroup>
              {slots.map((slot, idx) => (
                <BaseOTPInputSlot
                  key={idx}
                  className={inputClassName}
                  {...slot}
                />
              ))}
            </BaseOTPInputGroup>
          )}
        />
      )}
    </AnFormInput>
  );
};
