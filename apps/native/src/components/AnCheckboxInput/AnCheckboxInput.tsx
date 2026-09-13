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
import { AnTouchableOpacity } from "../AnTouchableOpacity";
import { BaseCheckboxInput } from "./BaseCheckboxInput";

type CheckboxOptionType = Omit<OptionType, "value"> & {
  descriptionI18nKey?: I18nKeyType;
  descriptionI18nOptions?: object;
};

type AnCheckboxGroupInputPropsType<T extends FieldValues> =
  BaseFormInputPropsType<T> & {
    hasMultipleOptions?: boolean;
    inputClassName?: string;
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

export const AnCheckboxInput = <T extends FieldValues>({
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
  isRequired = true,
  ...props
}: AnCheckboxGroupInputPropsType<T>) => {
  const renderSingleOption = (field: ControllerRenderProps<T, Path<T>>) => {
    if (!option) return null;

    return (
      <AnFormItem className="flex flex-row items-center gap-x-2.5 gap-y-0">
        <AnFormControl>
          <BaseCheckboxInput
            disabled={isDisabled}
            checked={field.value}
            onCheckedChange={value => {
              field.onChange(value);
            }}
            className={inputClassName}
            {...props}
          />
        </AnFormControl>
        <AnTouchableOpacity
          className="z-10 flex flex-col gap-y-1.5"
          onPress={() => field.onChange(!field.value)}>
          <AnFormLabel
            isDisabled={isDisabled}
            isRequired={isRequired}
            className={cn("leading-none", {
              "font-primary": Boolean(labelI18nKey),
            })}>
            {option.label}
          </AnFormLabel>
          {option.descriptionI18nKey && (
            <AnFormDescription
              i18nKey={option.descriptionI18nKey}
              i18nOptions={option.descriptionI18nOptions}
            />
          )}
        </AnTouchableOpacity>
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
        <AnBox className="native:gap-2.5 flex flex-col justify-center gap-2">
          {options?.map(option => (
            <AnFormField
              name={name}
              key={option.value}
              control={control}
              render={({ field: { ref, ...field } }) => {
                const fieldValue = (field.value ?? []) as string[];

                return (
                  <AnFormItem>
                    <AnBox className="flex flex-row items-center gap-x-2.5 gap-y-0">
                      <AnFormControl>
                        <BaseCheckboxInput
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
                        className={cn("leading-tight", {
                          "font-primary": Boolean(labelI18nKey),
                        })}
                        onPress={() =>
                          field.onChange(
                            fieldValue.includes(option.value)
                              ? fieldValue.filter(
                                  value => value !== option.value,
                                )
                              : [...fieldValue, option.value],
                          )
                        }>
                        {option.label}
                      </AnFormLabel>
                    </AnBox>
                  </AnFormItem>
                );
              }}
            />
          ))}
        </AnBox>
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
