import {
  Children,
  cloneElement,
  ComponentProps,
  isValidElement,
  useId,
} from "react";
import {
  Controller,
  FormProvider,
  UseFormReturn,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { AwLabel } from "@/components/AwLabel";
import { FormFieldContext } from "@/context/FormFieldProvider";
import { FormItemContext } from "@/context/FormItemProvider";
import { useFormField } from "@/hooks/useFormField";
import { useTranslate } from "@/hooks/useTranslate";
import { I18nKeyType } from "@/i18n";
import { ChildrenOrI18nType } from "@/utils/react";
import { cn } from "@/utils/tailwind";

import { AwText } from "./AwText/AwText";
import { textVariants } from "./AwText/variants";

type AwFormPropsType<T extends FieldValues> = Omit<
  ComponentProps<"form">,
  "onSubmit"
> & {
  form: UseFormReturn<T>;
  className?: string;
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

export const AwForm = <T extends FieldValues>({
  form,
  children,
  onSubmit,
  className,
  isInputOnlyForm = false,
  ...props
}: AwFormPropsType<T>) => {
  if (isInputOnlyForm) {
    return <FormProvider {...form}>{children}</FormProvider>;
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

export const AwFormField = <
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

export const AwFormItem = ({ className, ...props }: ComponentProps<"div">) => {
  const id = useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div data-slot="form-item" className={cn("grid", className)} {...props} />
    </FormItemContext.Provider>
  );
};

type AwLabelPropsType = ComponentProps<typeof AwLabel> & {
  isDisabled?: boolean;
  isRequired?: boolean;
};

export const AwFormLabel = ({
  className,
  isDisabled,
  isRequired,
  ...props
}: AwLabelPropsType) => {
  const { error, formItemId } = useFormField();

  return (
    <div className="flex">
      <AwLabel
        data-slot="form-label"
        data-error={Boolean(error)}
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
        <AwText
          as="span"
          className="mb-0.5 ml-0.5 text-destructive"
          variant="sm">
          *
        </AwText>
      )}
    </div>
  );
};

export const AwFormControl = ({ children }: { children?: React.ReactNode }) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  const child = Children.only(children);

  if (!isValidElement(child)) return <>{children}</>;

  // Merge the id and aria attributes directly onto the child element (Slot pattern)
  // so that <label htmlFor> correctly targets the interactive input element
  return cloneElement(child as React.ReactElement<Record<string, unknown>>, {
    id: formItemId,
    "aria-describedby": !error
      ? `${formDescriptionId}`
      : `${formDescriptionId} ${formMessageId}`,
    "aria-invalid": Boolean(error),
  });
};

type AwFormDescriptionPropsType = ComponentProps<"p"> & ChildrenOrI18nType;

export const AwFormDescription = ({
  className,
  children,
  i18nKey,
  i18nOptions,
  ...props
}: AwFormDescriptionPropsType) => {
  const { formDescriptionId } = useFormField();
  const i18nText = useTranslate(i18nKey, i18nOptions);

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn("text-muted-foreground", textVariants(), className)}
      {...props}>
      {children ?? i18nText}
    </p>
  );
};

type AwFormErrorMessagePropsType = ComponentProps<"p"> & {
  i18nKey?: I18nKeyType;
  i18nOptions?: object;
};

export const AwFormErrorMessage = ({
  className,
  children,
  i18nKey,
  i18nOptions,
  ...props
}: AwFormErrorMessagePropsType) => {
  const { error, formMessageId } = useFormField();
  const i18nText = useTranslate(i18nKey, i18nOptions);

  const body = error ? String(error?.message ?? "") : (i18nText ?? children);

  const hasMessage = Boolean(body);

  return (
    <div
      className={cn(
        "min-h-0 overflow-hidden whitespace-pre-line transition-[height] duration-200",
        {
          "mt-2 min-h-5": hasMessage,
        },
      )}>
      <p
        data-slot="form-message"
        id={formMessageId}
        className={cn("text-destructive", textVariants(), className)}
        {...props}>
        {body}
      </p>
    </div>
  );
};
