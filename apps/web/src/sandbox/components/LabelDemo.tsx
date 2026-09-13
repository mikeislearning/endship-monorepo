import { useForm } from "react-hook-form";

import { AwForm } from "@/components/AwForm";
import { AwLabel } from "@/components/AwLabel";
import { BaseTextInput } from "@/components/AwTextInput/BaseTextInput";
import { appLogger } from "@/utils/logger";

export const LabelDemo = () => {
  const form = useForm();

  return (
    <AwForm
      form={form}
      className="max-w-sm"
      onSubmit={values => {
        appLogger.debug("values", values);
      }}>
      <div className="grid gap-3">
        <AwLabel
          htmlFor="label-demo-username"
          i18nKey="sandbox:label.username"
        />
        <BaseTextInput id="label-demo-username" placeholder="Username" />
      </div>
      <div className="group grid gap-3" data-disabled>
        <AwLabel
          htmlFor="label-demo-disabled"
          i18nKey="sandbox:label.disabled"
        />
        <BaseTextInput
          id="label-demo-disabled"
          placeholder="Disabled"
          disabled
        />
      </div>
    </AwForm>
  );
};
