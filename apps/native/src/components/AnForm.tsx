import { ComponentProps, ReactNode, useId } from "react";
import { Slot } from "@rn-primitives/slot";
import {
  Control,
  Controller,
  ControllerProps,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  FormProvider,
  Path,
  UseFormReturn,
} from "react-hook-form";

import { FormFieldContext } from "@/context/FormFieldProvider";
import { FormItemContext } from "@/context/FormItemProvider";
import { useFormField } from "@/hooks/useFormField";
import { usePlatformOS } from "@/hooks/usePlatformOS";
import { useTranslate } from "@/hooks/useTranslate";
import { I18nKeyType } from "@/i18n";
import { cn } from "@/utils/tailwind";

import { AnBox } from "./AnBox";
import { AnLabel } from "./AnLabel";
import { AnText, AnTextPropsType } from "./AnText/AnText";
import { textVariants } from "./AnText/variants";

type AnFormPropsType<T extends FieldValues> = ComponentProps<"form"> & {
  form: UseFormReturn<T>;
  className?: string;
  isInputOnlyForm?: boolean;
  onSubmit?: (values: T) => void;
} & (
    | {
        isInputOnlyForm: true;
        onSubmit?: never;
      }
    | {
        isInputOnlyForm?: false;
        onSubmit: (values: T) => void;
      }
  );

export const AnForm = <T extends FieldValues>({
  form,
  children,
  onSubmit,
  className,
  isInputOnlyForm = false,
  ...props
}: AnFormPropsType<T>) => {
  const { isNative } = usePlatformOS();

  if (isNative || isInputOnlyForm) {
    return (
      <FormProvider {...form}>
        <AnBox className={cn("w-full gap-4", className)}>{children}</AnBox>
      </FormProvider>
    );
  }

  return (
    <FormProvider {...form}>
      <form
        className={cn("flex w-full flex-col gap-6", className)}
        onSubmit={event => {
          if (onSubmit) {
            void form.handleSubmit(onSubmit)();
          }
          event.preventDefault();
        }}
        {...props}>
        {children}
      </form>
    </FormProvider>
  );
};

export const AnFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: ControllerProps<TFieldValues, TName>,
) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

export const AnFormItem = (props: ComponentProps<typeof AnBox>) => {
  const id = useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <AnBox data-slot="form-item" {...props} />
    </FormItemContext.Provider>
  );
};

type AnLabelPropsType = ComponentProps<typeof AnLabel> & {
  isDisabled?: boolean;
  isRequired?: boolean;
};

export const AnFormLabel = ({
  className,
  isDisabled,
  isRequired,
  ...props
}: AnLabelPropsType) => {
  const { error, formItemId } = useFormField();

  return (
    <AnBox className="flex-row">
      <AnLabel
        data-slot="form-label"
        data-error={Boolean(error)}
        disabled={isDisabled}
        className={cn(
          {
            "cursor-not-allowed opacity-50": isDisabled,
          },
          className,
        )}
        htmlFor={formItemId}
        {...props}
      />
      {isRequired && (
        <AnText className="text-destructive mb-0.5 ml-0.5" variant="sm">
          *
        </AnText>
      )}
    </AnBox>
  );
};

export const AnFormControl = (props: ComponentProps<typeof Slot>) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={Boolean(error)}
      {...props}
    />
  );
};

export const AnFormDescription = ({
  className,
  children,
  i18nKey,
  i18nOptions,
  ...props
}: AnTextPropsType) => {
  const { formDescriptionId } = useFormField();
  const i18nText = useTranslate(i18nKey, i18nOptions);

  return (
    <AnText
      data-slot="form-description"
      id={formDescriptionId}
      className={cn(
        textVariants(),
        "text-muted-foreground whitespace-pre-line",
        className,
      )}
      {...props}>
      {children ?? i18nText}
    </AnText>
  );
};

export const AnFormErrorMessage = ({
  className,
  children,
  i18nKey,
  i18nOptions,
  ...props
}: AnTextPropsType) => {
  const { error } = useFormField();
  const i18nText = useTranslate(i18nKey, i18nOptions);

  const body = error
    ? String(error?.message ?? error?.root?.message ?? "")
    : (i18nText ?? children);

  const hasMessage = Boolean(body);

  return (
    <AnBox
      className={cn(
        "max-h-0 overflow-hidden whitespace-pre-line transition-[max-height] duration-200 ease-in-out",
        {
          "mt-2 max-h-20": hasMessage,
        },
      )}>
      <AnText data-slot="form-message" className="text-destructive" {...props}>
        {body}
      </AnText>
    </AnBox>
  );
};

type AnFormInputPropsType<T extends FieldValues> = {
  name: FieldPath<T>;
  control: Control<T>;
  isDisabled?: boolean;
  labelI18nKey?: I18nKeyType;
  labelI18nOptions?: object;
  descriptionI18nKey?: I18nKeyType;
  descriptionI18nOptions?: object;
  showError?: boolean;
  isRequired?: boolean;
  errorI18nKey?: I18nKeyType;
  errorI18nOptions?: object;
  className?: string;
  children: ({
    field,
    hasError,
  }: {
    field: Omit<ControllerRenderProps<T, Path<T>>, "ref">;
    hasError: boolean;
  }) => ReactNode;
};

export type BaseFormInputPropsType<T extends FieldValues> = Omit<
  AnFormInputPropsType<T>,
  "children"
>;

export const AnFormInput = <T extends FieldValues>({
  name,
  control,
  isDisabled = false,
  labelI18nKey,
  labelI18nOptions,
  descriptionI18nKey,
  descriptionI18nOptions,
  isRequired = true,
  showError = true,
  errorI18nKey,
  errorI18nOptions,
  className,
  children,
}: AnFormInputPropsType<T>) => {
  return (
    <AnFormField
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <AnFormItem>
          <AnBox className={cn("gap-2", className)}>
            {labelI18nKey && (
              <AnFormLabel
                i18nKey={labelI18nKey}
                i18nOptions={labelI18nOptions}
                isDisabled={isDisabled}
                isRequired={isRequired}
              />
            )}
            <AnFormControl>
              {children({ field, hasError: Boolean(error?.message) })}
            </AnFormControl>
            {descriptionI18nKey && (
              <AnFormDescription
                i18nKey={descriptionI18nKey}
                i18nOptions={descriptionI18nOptions}
              />
            )}
          </AnBox>
          {showError && (
            <AnFormErrorMessage
              i18nKey={errorI18nKey}
              i18nOptions={errorI18nOptions}
            />
          )}
        </AnFormItem>
      )}
    />
  );
};
