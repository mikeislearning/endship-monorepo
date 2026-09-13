import { useForm } from "react-hook-form";

import { AwForm } from "@/components/AwForm";
import { AwTimePickerInput } from "@/components/AwTimePickerInput/AwTimePickerInput";
import { appLogger } from "@/utils/logger";

export const TimePickerDemo = () => {
  const form = useForm();

  return (
    <AwForm
      form={form}
      onSubmit={values => {
        appLogger.debug("values", values);
      }}>
      <AwTimePickerInput name="time" control={form.control} />
    </AwForm>
  );
};
