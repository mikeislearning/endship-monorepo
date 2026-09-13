import { useForm } from "react-hook-form";

import { AwForm } from "@/components/AwForm";
import { AwSwitchInput } from "@/components/AwSwitchInput/AwSwitchInput";
import { useTranslator } from "@/hooks/useTranslate";
import { appLogger } from "@/utils/logger";

export const SwitchDemo = () => {
  const form = useForm();
  const { t } = useTranslator();

  return (
    <AwForm
      form={form}
      className="w-auto"
      onSubmit={values => {
        appLogger.debug("values", values);
      }}>
      <AwSwitchInput
        name="switch-demo-airplane-mode"
        control={form.control}
        option={{
          label: t("sandbox:switch.airplaneMode"),
        }}
      />
      <AwSwitchInput
        name="switch-demo-bluetooth"
        control={form.control}
        inputClassName="data-[state=checked]:bg-blue-500 dark:data-[state=checked]:bg-blue-600"
        defaultChecked
        option={{
          label: t("sandbox:switch.bluetooth"),
        }}
      />
      <AwSwitchInput
        isDisabled
        name="switch-demo-disabled"
        control={form.control}
        option={{
          label: t("sandbox:switch.disabled"),
        }}
      />
      <AwSwitchInput
        name="switch-demo-required"
        control={form.control}
        option={{
          label: t("sandbox:switch.required"),
          isRequired: true,
        }}
      />
    </AwForm>
  );
};
