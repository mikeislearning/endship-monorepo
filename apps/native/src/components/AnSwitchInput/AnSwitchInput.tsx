import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

import {
  AnFormControl,
  AnFormDescription,
  AnFormErrorMessage,
  AnFormField,
  AnFormItem,
  AnFormLabel,
  BaseFormInputPropsType,
} from "@/components/AnForm";
import { OptionType } from "@/domain/common";
import { I18nKeyType } from "@/i18n";
import { cn } from "@/utils/tailwind";

import { AnBox } from "../AnBox";
import { BaseSwitchInput, BaseSwitchInputPropsType } from "./BaseSwitchInput";

type SwitchOptionType = OptionType & {
  isDisabled?: boolean;
  descriptionI18nKey?: I18nKeyType;
  descriptionI18nOptions?: object;
  isRequired?: boolean;
};

type AnSwitchInputPropsType<T extends FieldValues> = BaseFormInputPropsType<T> &
  Omit<BaseSwitchInputPropsType, "checked" | "onCheckedChange"> & {
    inputClassName?: string;
    singleOptionClassName?: string;
    hasMultipleOptions?: boolean;
  } & (
    | {
        hasMultipleOptions: true;
        options: SwitchOptionType[];
        option?: never;
      }
    | {
        hasMultipleOptions?: false;
        option: Omit<SwitchOptionType, "value">;
        options?: never;
      }
  );

export const AnSwitchInput = <T extends FieldValues>({
  name,
  control,
  labelI18nKey,
  labelI18nOptions,
  descriptionI18nKey,
  descriptionI18nOptions,
  showError = true,
  errorI18nKey,
  errorI18nOptions,
  hasMultipleOptions = false,
  singleOptionClassName,
  options,
  option,
  isDisabled = false,
  className,
  inputClassName,
  isRequired = true,
  ...props
}: AnSwitchInputPropsType<T>) => {
  const renderSingleOption = (field: ControllerRenderProps<T, Path<T>>) => {
    if (!option) return null;

    return (
      <AnFormItem
        className={cn(
          "flex flex-row items-center gap-x-2 gap-y-0",
          singleOptionClassName,
        )}>
        <AnFormControl>
          <BaseSwitchInput
            disabled={isDisabled}
            checked={field.value}
            onCheckedChange={value => {
              field.onChange(value);
            }}
            className={inputClassName}
            {...props}
          />
        </AnFormControl>
        <AnBox className="gap-y-1.5">
          <AnFormLabel
            isDisabled={isDisabled}
            isRequired={option.isRequired}
            className="leading-none">
            {option.label}
          </AnFormLabel>
          {option.descriptionI18nKey && (
            <AnFormDescription
              i18nKey={option.descriptionI18nKey}
              i18nOptions={option.descriptionI18nOptions}
            />
          )}
        </AnBox>
      </AnFormItem>
    );
  };

  const renderMultipleOptions = () => {
    return (
      <>
        {descriptionI18nKey && (
          <AnFormDescription
            i18nKey={descriptionI18nKey}
            i18nOptions={descriptionI18nOptions}
          />
        )}
        {options?.map(option => (
          <AnFormField
            name={name}
            key={option.value}
            control={control}
            render={({ field }) => {
              const fieldValue = (field.value ?? []) as string[];

              return (
                <AnFormItem className="flex flex-row items-center gap-x-2 gap-y-0">
                  <AnFormControl>
                    <BaseSwitchInput
                      disabled={isDisabled || option.isDisabled}
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
                  </AnFormControl>
                  <AnFormLabel
                    isDisabled={isDisabled || option.isDisabled}
                    className={cn("leading-none", {
                      "font-primary": Boolean(labelI18nKey),
                    })}>
                    {option.label}
                  </AnFormLabel>
                </AnFormItem>
              );
            }}
          />
        ))}
      </>
    );
  };

  return (
    <AnFormField
      name={name}
      control={control}
      render={({ field }) => (
        <AnFormItem>
          <AnBox className={cn("gap-2", className)}>
            {labelI18nKey && (
              <AnFormLabel
                i18nKey={labelI18nKey}
                i18nOptions={labelI18nOptions}
                isRequired={isRequired}
              />
            )}
            {hasMultipleOptions
              ? renderMultipleOptions()
              : renderSingleOption(field)}
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
