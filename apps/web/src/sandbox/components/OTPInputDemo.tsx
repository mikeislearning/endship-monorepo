import { useForm } from "react-hook-form";

import { AwForm } from "@/components/AwForm";
import { AwOTPInput } from "@/components/AwOTPInput/AwOTPInput";
import { appLogger } from "@/utils/logger";

export const OTPInputDemo = () => {
  const form = useForm();

  return (
    <AwForm
      form={form}
      className="flex w-sm flex-col flex-wrap gap-4"
      onSubmit={values => {
        appLogger.debug("values", values);
      }}>
      <AwOTPInput
        labelI18nKey="sandbox:otpInput.withDigits"
        control={form.control}
        name="codeOne"
        otpInputType="DIGITS"
      />
      <AwOTPInput
        labelI18nKey="sandbox:otpInput.withCharacters"
        control={form.control}
        name="codeTwo"
        otpInputType="CHARACTERS"
      />
      <AwOTPInput
        labelI18nKey="sandbox:otpInput.withDigitsAndCharacters"
        control={form.control}
        name="codeThree"
      />
    </AwForm>
  );
};
