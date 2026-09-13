import { useForm, useWatch } from "react-hook-form";

import { AwForm } from "@/components/AwForm";
import { AwSliderInput } from "@/components/AwSliderInput/AwSliderInput";
import { AwText } from "@/components/AwText/AwText";
import { appLogger } from "@/utils/logger";

export const SliderDemo = () => {
  const form = useForm({
    defaultValues: {
      slider: 13,
    },
  });

  const value = useWatch({
    control: form.control,
    name: "slider",
  });

  return (
    <AwForm
      form={form}
      className="flex w-sm flex-col flex-wrap gap-4"
      onSubmit={values => {
        appLogger.debug("values", values);
      }}>
      <AwText>Value: {value}</AwText>
      <AwSliderInput name="slider" control={form.control} min={0} max={100} />
    </AwForm>
  );
};
