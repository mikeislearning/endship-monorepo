import {
  Control,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  Path,
} from "react-hook-form";

import { OptionType } from "@/domain/common";
import { I18nKeyType } from "@/i18n";
import { cn } from "@/utils/tailwind";

import {
  AwFormControl,
  AwFormDescription,
  AwFormErrorMessage,
  AwFormField,
  AwFormItem,
  AwFormLabel,
} from "../AwForm";
import { BaseCheckboxInput } from "./BaseCheckboxInput";

type CheckboxOptionType = Omit<OptionType, "value"> & {
  descriptionI18nKey?: I18nKeyType;
  descriptionI18nOptions?: object;
};

type AwCheckboxGroupInputPropsType<T extends FieldValues> = {
  name: FieldPath<T>;
  control: Control<T>;
  hasMultipleOptions?: boolean;
  labelI18nKey?: I18nKeyType;
  labelI18nOptions?: object;
  descriptionI18nKey?: I18nKeyType;
  descriptionI18nOptions?: object;
  showError?: boolean;
  errorI18nKey?: I18nKeyType;
  errorI18nOptions?: object;
  className?: string;
  inputClassName?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
} & (
  | {
      hasMultipleOptions?: false;
      option: CheckboxOptionType;
      options?: never;
      descriptionI18nKey?: never;
      descriptionI18nOptions?: never;
    }
  | {
      hasMultipleOptions: true;
      options: (OptionType & {
        isDisabled?: boolean;
      })[];
      option?: never;
      descriptionI18nKey?: I18nKeyType;
      descriptionI18nOptions?: object;
    }
);

export const AwCheckboxInput = <T extends FieldValues>({
  name,
  control,
  hasMultipleOptions = false,
  options,
  option,
  isDisabled = false,
  labelI18nKey,
  labelI18nOptions,
  descriptionI18nKey,
  descriptionI18nOptions,
  showError = true,
  errorI18nKey,
  errorI18nOptions,
  className,
  inputClassName,
  isRequired,
  ...props
}: AwCheckboxGroupInputPropsType<T>) => {
  const renderSingleOption = (field: ControllerRenderProps<T, Path<T>>) => {
    if (!option) return null;

    return (
      <AwFormItem className="flex flex-row items-center gap-x-2 gap-y-0">
        <AwFormControl>
          <BaseCheckboxInput
            disabled={isDisabled}
            checked={field.value}
            onCheckedChange={value => {
              field.onChange(value);
            }}
            className={inputClassName}
            {...props}
          />
        </AwFormControl>
        <div className="flex flex-col gap-y-1.5">
          <AwFormLabel
            isDisabled={isDisabled}
            isRequired={isRequired}
            className={cn("leading-none", {
              "font-normal": Boolean(labelI18nKey),
            })}>
            {option.label}
          </AwFormLabel>
          {option.descriptionI18nKey && (
            <AwFormDescription
              i18nKey={option.descriptionI18nKey}
              i18nOptions={option.descriptionI18nOptions}
            />
          )}
        </div>
      </AwFormItem>
    );
  };

  const renderMultipleOptions = () => {
    return (
      <>
        {descriptionI18nKey && (
          <AwFormDescription
            i18nKey={descriptionI18nKey}
            i18nOptions={descriptionI18nOptions}
          />
        )}
        {options?.map(option => (
          <AwFormField
            name={name}
            key={option.value}
            control={control}
            render={({ field }) => {
              const fieldValue = (field.value ?? []) as string[];

              return (
                <AwFormItem className="flex flex-row items-center gap-x-2 gap-y-0">
                  <AwFormControl>
                    <BaseCheckboxInput
                      disabled={isDisabled ?? option.isDisabled}
                      checked={fieldValue.includes(option.value)}
                      className={inputClassName}
                      onCheckedChange={checked => {
                        return checked
                          ? field.onChange([...fieldValue, option.value])
                          : field.onChange(
                              fieldValue.filter(
                                (value: string) => value !== option.value,
                              ),
                            );
                      }}
                      {...props}
                    />
                  </AwFormControl>
                  <AwFormLabel
                    isDisabled={isDisabled}
                    className={cn("leading-none", {
                      "font-normal": Boolean(labelI18nKey),
                    })}>
                    {option.label}
                  </AwFormLabel>
                </AwFormItem>
              );
            }}
          />
        ))}
      </>
    );
  };

  return (
    <AwFormField
      name={name}
      control={control}
      render={({ field }) => (
        <AwFormItem>
          <div className={cn("flex flex-col gap-2", className)}>
            {labelI18nKey && (
              <AwFormLabel
                i18nKey={labelI18nKey}
                i18nOptions={labelI18nOptions}
                isRequired={isRequired}
              />
            )}
            {hasMultipleOptions
              ? renderMultipleOptions()
              : renderSingleOption(field)}
          </div>
          {showError && (
            <AwFormErrorMessage
              i18nKey={errorI18nKey}
              i18nOptions={errorI18nOptions}
            />
          )}
        </AwFormItem>
      )}
    />
  );
};
