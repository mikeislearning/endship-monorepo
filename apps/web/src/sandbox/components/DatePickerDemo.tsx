import { useForm } from "react-hook-form";

import { AwDatePickerInput } from "@/components/AwDatePickerInput/AwDatePickerInput";
import { AwForm } from "@/components/AwForm";
import { appLogger } from "@/utils/logger";

export const DatePickerDemo = () => {
  const form = useForm();

  return (
    <AwForm
      form={form}
      onSubmit={values => {
        appLogger.debug("values", values);
      }}>
      <AwDatePickerInput
        name="date"
        control={form.control}
        placeholderI18nKey="sandbox:datePicker.placeholder"
      />
    </AwForm>
  );
};
