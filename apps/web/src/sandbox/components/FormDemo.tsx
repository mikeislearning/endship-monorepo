import { useEffect } from "react";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { t } from "i18next";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { DateOfBirthInput } from "@/blocks/DateOfBirthInput";
import { AwButton } from "@/components/AwButton/AwButton";
import { AwCheckboxInput } from "@/components/AwCheckboxInput/AwCheckboxInput";
import { AwDatePickerInput } from "@/components/AwDatePickerInput/AwDatePickerInput";
import { AwForm } from "@/components/AwForm";
import { AwSelectInput } from "@/components/AwSelectInput/AwSelectInput";
import { AwSeparator } from "@/components/AwSeparator";
import { AwSwitchInput } from "@/components/AwSwitchInput/AwSwitchInput";
import { AwText } from "@/components/AwText/AwText";
import { AwTextInput } from "@/components/AwTextInput/AwTextInput";
import { requiredStringSchema } from "@/domain/common";
import { dateAsDayjs } from "@/utils/date";

const formSchema = z.object({
  username: requiredStringSchema.min(3, {
    error: t("sandbox:form.validation.usernameTooShort"),
  }),
  email: z.email({
    error: t("common:validation.invalidEmail"),
  }),
  bio: requiredStringSchema
    .min(10, {
      error: t("sandbox:form.validation.bioTooShort"),
    })
    .max(140, {
      error: t("sandbox:form.validation.bioTooLong"),
    }),
  day: z.string().regex(/^\d{1,2}$/),
  month: z.string().regex(/^\d{1,2}$/),
  year: z.string().regex(/^\d{4}$/),
  dateOfBirth: z.iso.date({
    error: t("common:validation.requiredField"),
  }),
  notificationChannelPreference: z
    .array(z.enum(["EMAIL", "SMS", "PUSH"]), {
      error: t("common:validation.requiredField"),
    })
    .nonempty({
      error: t("common:validation.atLeastOneOption"),
    }),
  notificationTypePreference: z
    .enum(["MARKETING", "ORDERS", "SECURITY"])
    .array(),
  nextSubscriptionDate: z.iso.date({
    error: t("common:validation.requiredField"),
  }),
});

type FormSchemaType = z.infer<typeof formSchema>;

/*
  TextInput for username
  SingleSelect for email
  TextArea for bio
  DateOfBirthInput for dateOfBirth
  Checkboxes for notificationChannel Preferences
  Switch for notificationType Preferences 
  DatePicker for Next Subsrciption Date
  Button for submit
*/
export const FormDemo = () => {
  const form = useForm<FormSchemaType>({
    defaultValues: {
      notificationTypePreference: ["SECURITY"],
    },
    resolver: standardSchemaResolver(formSchema),
  });

  const { control, setValue } = form;

  const [day, month, year] = useWatch({
    control,
    name: ["day", "month", "year"],
  });

  useEffect(() => {
    setValue("dateOfBirth", `${year}-${month}-${day}`, {
      shouldValidate: Boolean(year) && Boolean(month) && Boolean(day),
    });
  }, [year, month, day, setValue]);

  const onSubmit = () => {
    toast.success("Form submitted successfully");
  };

  return (
    <AwForm
      form={form}
      className="w-md"
      onSubmit={() => {
        void form.handleSubmit(onSubmit)();
      }}>
      <AwTextInput
        name="username"
        control={control}
        labelI18nKey="sandbox:form.usernameLabel"
        placeholderI18nKey="sandbox:form.usernamePlaceholder"
        descriptionI18nKey="sandbox:form.usernameDescription"
      />
      <AwSelectInput
        name="email"
        control={control}
        labelI18nKey="sandbox:form.emailLabel"
        placeholderI18nKey="sandbox:form.emailPlaceholder"
        options={EMAIL_OPTIONS}
        descriptionI18nKey="sandbox:form.emailDescription"
      />
      <AwTextInput
        name="bio"
        control={control}
        labelI18nKey="sandbox:form.bioLabel"
        placeholderI18nKey="sandbox:form.bioPlaceholder"
        isMultiLine
        descriptionI18nKey="sandbox:form.bioDescription"
      />
      <DateOfBirthInput control={control} />
      <AwSeparator />
      <div className="flex flex-col gap-4">
        <AwText
          i18nKey="sandbox:form.notificationsSubtitle"
          variant="headerThree"
        />
        <div className="flex flex-col gap-6">
          <AwCheckboxInput
            hasMultipleOptions
            name="notificationChannelPreference"
            control={control}
            labelI18nKey="sandbox:form.notificationsChannelLabel"
            options={NOTIFICATION_CHANNEL_OPTIONS}
          />
          <AwSwitchInput
            name="notificationTypePreference"
            control={control}
            labelI18nKey="sandbox:form.notificationsTypeLabel"
            hasMultipleOptions
            options={NOTIFICATION_TYPE_OPTIONS}
          />
        </div>
      </div>
      <AwSeparator />
      <AwDatePickerInput
        name="nextSubscriptionDate"
        control={control}
        labelI18nKey="sandbox:form.nextSubscriptionDateLabel"
        placeholderI18nKey="sandbox:form.nextSubscriptionDatePlaceholder"
        onValueChange={value => {
          setValue(
            "nextSubscriptionDate",
            dateAsDayjs(value).format("YYYY-MM-DD"),
          );
        }}
      />
      <AwButton type="submit" i18nKey="common:save" />
    </AwForm>
  );
};

const EMAIL_OPTIONS = [
  { value: "abc@example.com", label: "abc@example.com" },
  { value: "accounts@mindsea.com", label: "accounts@mindsea.com" },
  { value: "emailme@pm.me", label: "emailme@pm.me" },
];

const NOTIFICATION_CHANNEL_OPTIONS = [
  { value: "EMAIL", label: "Email" },
  { value: "SMS", label: "SMS" },
  { value: "PUSH", label: "Push" },
];

const NOTIFICATION_TYPE_OPTIONS = [
  { value: "MARKETING", label: "Marketing" },
  { value: "ORDERS", label: "Orders" },
  { value: "SECURITY", label: "Security", isDisabled: true },
];
