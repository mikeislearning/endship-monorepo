import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { t } from "i18next";
import { useForm } from "react-hook-form";
import { toast } from "sonner-native";
import { z } from "zod";

import { ScreenLayout } from "@/blocks/ScreenLayout";
import { AnBox } from "@/components/AnBox";
import { AnButton } from "@/components/AnButton/AnButton";
import { AnCheckboxInput } from "@/components/AnCheckboxInput/AnCheckboxInput";
import { AnDatePickerInput } from "@/components/AnDatePickerInput/AnDatePickerInput";
import { AnForm } from "@/components/AnForm";
import { AnOTPInput } from "@/components/AnOTPInput/AnOTPInput";
import { AnSeparator } from "@/components/AnSeparator";
import { AnSwitchInput } from "@/components/AnSwitchInput/AnSwitchInput";
import { AnText } from "@/components/AnText/AnText";
import { AnTextInput } from "@/components/AnTextInput/AnTextInput";
import { AnTimePickerInput } from "@/components/AnTimePickerInput/AnTimePickerInput";
import { requiredStringSchema } from "@/domain/common";

import { SandboxContainer } from "../SandboxContainer";

const formSchema = z.object({
  username: requiredStringSchema.min(3, {
    error: t("sandbox:form.validation.usernameTooShort"),
  }),
  bio: requiredStringSchema
    .min(10, {
      error: t("sandbox:form.validation.bioTooShort"),
    })
    .max(140, {
      error: t("sandbox:form.validation.bioTooLong"),
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
  nextSubscriptionDate: z.iso.date().optional(),
  nextSubscriptionTime: z.iso.date().optional(),
});

type FormSchemaType = z.infer<typeof formSchema>;

const otpFormSchema = z.object({
  otp: requiredStringSchema.length(6),
});

type OtpFormSchemaType = z.infer<typeof otpFormSchema>;

/*
  TextInput for username
  TextArea for bio
  DateOfBirthInput for dateOfBirth
  Checkboxes for notificationChannel Preferences
  Switch for notificationType Preferences
  DatePicker for Next Subsrciption Date
  TimePicker for Next Subscription Time (optional)
  Button for submit
*/
export const FormScreen = () => {
  const form = useForm<FormSchemaType>({
    defaultValues: {
      notificationChannelPreference: ["EMAIL"],
      notificationTypePreference: ["SECURITY"],
    },
    resolver: standardSchemaResolver(formSchema),
  });

  const otpForm = useForm<OtpFormSchemaType>({
    resolver: standardSchemaResolver(otpFormSchema),
  });

  const { control } = form;

  const onSubmit = () => {
    toast.success("Form submitted successfully");
  };

  return (
    <ScreenLayout>
      <AnBox className="mt-safe-offset-10 web:mx-auto web:mt-6 web:max-w-md mb-6 gap-4">
        <SandboxContainer
          titleI18nKey="sandbox:form.title"
          descriptionI18nKey="sandbox:form.blurb">
          <AnForm
            form={form}
            onSubmit={() => {
              void form.handleSubmit(onSubmit)();
            }}>
            <AnTextInput
              name="username"
              control={control}
              labelI18nKey="sandbox:form.usernameLabel"
              placeholderI18nKey="sandbox:form.usernamePlaceholder"
              descriptionI18nKey="sandbox:form.usernameDescription"
            />
            <AnTextInput
              name="bio"
              control={control}
              labelI18nKey="sandbox:form.bioLabel"
              placeholderI18nKey="sandbox:form.bioPlaceholder"
              isMultiline
              descriptionI18nKey="sandbox:form.bioDescription"
            />
            <AnSeparator />
            <AnBox className="gap-4">
              <AnText
                i18nKey="sandbox:form.notificationsSubtitle"
                variant="headerThree"
              />
              <AnBox className="gap-6">
                <AnCheckboxInput
                  hasMultipleOptions
                  name="notificationChannelPreference"
                  control={control}
                  labelI18nKey="sandbox:form.notificationsChannelLabel"
                  options={NOTIFICATION_CHANNEL_OPTIONS}
                />
              </AnBox>
              <AnSwitchInput
                name="notificationTypePreference"
                control={control}
                labelI18nKey="sandbox:form.notificationsTypeLabel"
                hasMultipleOptions
                options={NOTIFICATION_TYPE_OPTIONS}
              />
            </AnBox>
            <AnSeparator />
            <AnText
              i18nKey="sandbox:form.subscriptionSubtitle"
              variant="headerThree"
            />
            <AnDatePickerInput
              name="nextSubscriptionDate"
              control={control}
              isRequired={false}
              labelI18nKey="sandbox:form.nextSubscriptionDateLabel"
              placeholderI18nKey="sandbox:form.nextSubscriptionDatePlaceholder"
            />
            <AnTimePickerInput
              name="nextSubscriptionTime"
              control={control}
              isRequired={false}
              labelI18nKey="sandbox:form.nextSubscriptionTimeLabel"
              placeholderI18nKey="sandbox:form.nextSubscriptionTimePlaceholder"
            />
            <AnSeparator />
            <AnButton i18nKey="common:save" />
          </AnForm>
        </SandboxContainer>
        <SandboxContainer
          titleI18nKey="sandbox:form.otpTitle"
          descriptionI18nKey="sandbox:form.otpDescription">
          <AnText
            i18nKey="sandbox:form.otpLabel"
            variant="headerTwo"
            className="text-center leading-none"
          />
          <AnText
            i18nKey="sandbox:form.otpBlurb"
            i18nOptions={{ phoneNumber: "+1 234 456 7890" }}
            className="text-muted-foreground my-5 mt-1.5 text-center"
          />
          <AnForm
            form={otpForm}
            onSubmit={() => {
              void otpForm.handleSubmit(() => {
                toast.success("OTP Verified Successfully");
              })();
            }}>
            <AnOTPInput name="otp" control={otpForm.control} />
          </AnForm>
        </SandboxContainer>
      </AnBox>
    </ScreenLayout>
  );
};

const NOTIFICATION_CHANNEL_OPTIONS = [
  { value: "EMAIL", label: "Email", isDisabled: true },
  { value: "SMS", label: "SMS" },
  { value: "PUSH", label: "Push" },
];

const NOTIFICATION_TYPE_OPTIONS = [
  { value: "MARKETING", label: "Marketing" },
  { value: "ORDERS", label: "Orders" },
  { value: "SECURITY", label: "Security", isDisabled: true },
];
