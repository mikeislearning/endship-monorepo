import { useForm } from "react-hook-form";

import { DateOfBirthInput } from "@/blocks/DateOfBirthInput";
import { AwForm } from "@/components/AwForm";
import { appLogger } from "@/utils/logger";

export const DateOfBirthInputDemo = () => {
  const form = useForm();

  return (
    <AwForm
      form={form}
      onSubmit={values => {
        appLogger.debug("values", values);
      }}
      className="w-sm">
      <DateOfBirthInput control={form.control} />
    </AwForm>
  );
};
