import { Search } from "lucide-react";
import { useForm } from "react-hook-form";

import { AwForm } from "@/components/AwForm";
import { AwTextInput } from "@/components/AwTextInput/AwTextInput";
import { appLogger } from "@/utils/logger";

export const InputDemo = () => {
  const form = useForm();

  return (
    <AwForm
      form={form}
      className="flex w-sm flex-col flex-wrap gap-4"
      onSubmit={values => {
        appLogger.debug("values", values);
      }}>
      <AwTextInput
        name="input-demo-default"
        control={form.control}
        placeholderI18nKey="sandbox:input.default"
      />
      <AwTextInput
        name="input-demo-error"
        control={form.control}
        placeholderI18nKey="sandbox:input.error"
        aria-invalid="true"
      />
      <AwTextInput
        isDisabled
        name="input-demo-disabled"
        control={form.control}
        placeholderI18nKey="sandbox:input.disabled"
      />
      <AwTextInput
        name="input-demo-password"
        control={form.control}
        type="password"
        placeholderI18nKey="sandbox:input.password"
      />
      <AwTextInput
        name="input-demo-number"
        control={form.control}
        type="number"
        placeholderI18nKey="sandbox:input.number"
      />
      <AwTextInput
        name="input-demo-search"
        control={form.control}
        type="search"
        placeholderI18nKey="sandbox:input.search"
        leftIcon={<Search className="size-4 shrink-0 opacity-50" />}
      />
      <AwTextInput
        name="input-demo-tel"
        control={form.control}
        type="tel"
        placeholderI18nKey="sandbox:input.phoneNumber"
        mask={{
          mask: ["(999) 999-9999"],
        }}
      />
      <AwTextInput
        name="input-demo-file"
        control={form.control}
        type="file"
        placeholderI18nKey="sandbox:input.file"
      />
    </AwForm>
  );
};
