import { Control, FieldPath, FieldValues } from "react-hook-form";

import {
  AwFormControl,
  AwFormDescription,
  AwFormErrorMessage,
  AwFormField,
  AwFormItem,
  AwFormLabel,
} from "@/components/AwForm";
import { OptionType } from "@/domain/common";
import { I18nKeyType } from "@/i18n";
import { cn } from "@/utils/tailwind";

import {
  BaseRadioGroup,
  BaseRadioGroupCardItem,
  BaseRadioGroupItem,
} from "./BaseRadioGroupInput";

type RadioOptionType = OptionType & {
  isDisabled?: boolean;
  descriptionI18nKey?: I18nKeyType;
  descriptionI18nOptions?: object;
};

type AwRadioGroupInputPropsType<T extends FieldValues> = {
  name: FieldPath<T>;
  control: Control<T>;
  options: RadioOptionType[];
  labelI18nKey?: I18nKeyType;
  labelI18nOptions?: object;
  descriptionI18nKey?: I18nKeyType;
  descriptionI18nOptions?: object;
  showError?: boolean;
  errorI18nKey?: I18nKeyType;
  errorI18nOptions?: object;
  isDisabled?: boolean;
  className?: string;
  radioGroupClassName?: string;
  radioItemClassName?: string;
  isRequired?: boolean;
  variant?: "icon" | "card";
};

export const AwRadioGroupInput = <T extends FieldValues>({
  name,
  control,
  options,
  labelI18nKey,
  labelI18nOptions,
  descriptionI18nKey,
  descriptionI18nOptions,
  showError = true,
  errorI18nKey,
  errorI18nOptions,
  className,
  radioGroupClassName,
  radioItemClassName,
  isDisabled,
  isRequired,
  variant = "icon",
}: AwRadioGroupInputPropsType<T>) => {
  const renderIconItem = (option: RadioOptionType) => (
    <AwFormItem
      key={option.value}
      className={cn("flex flex-row items-center gap-x-3", {
        "items-start": Boolean(option.descriptionI18nKey),
      })}>
      <AwFormControl>
        <BaseRadioGroupItem
          value={option.value}
          disabled={isDisabled ?? option.isDisabled}
        />
      </AwFormControl>
      <div className="flex flex-col gap-y-1.5">
        <AwFormLabel
          isDisabled={isDisabled ?? option.isDisabled}
          className={cn(
            "leading-none",
            {
              "font-normal": Boolean(labelI18nKey),
            },
            radioItemClassName,
          )}>
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

  const renderCardItem = (option: RadioOptionType) => (
    <AwFormItem
      key={option.value}
      className={cn("flex flex-col items-center gap-y-1.5", {
        "items-start": Boolean(option.descriptionI18nKey),
      })}>
      <AwFormControl>
        <BaseRadioGroupCardItem
          value={option.value}
          disabled={isDisabled ?? option.isDisabled}
          className={radioItemClassName}>
          <AwFormLabel
            isDisabled={isDisabled ?? option.isDisabled}
            className="cursor-pointer leading-none">
            {option.label}
          </AwFormLabel>
        </BaseRadioGroupCardItem>
      </AwFormControl>
      {option.descriptionI18nKey && (
        <AwFormDescription
          i18nKey={option.descriptionI18nKey}
          i18nOptions={option.descriptionI18nOptions}
        />
      )}
    </AwFormItem>
  );

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
                isDisabled={isDisabled}
                isRequired={isRequired}
              />
            )}
            <AwFormControl>
              <BaseRadioGroup
                onValueChange={value => {
                  field.onChange(value);
                }}
                defaultValue={field.value}
                className={cn("flex flex-col gap-y-2", radioGroupClassName)}>
                {options.map(option =>
                  variant === "icon"
                    ? renderIconItem(option)
                    : renderCardItem(option),
                )}
              </BaseRadioGroup>
            </AwFormControl>
            {descriptionI18nKey && (
              <AwFormDescription
                i18nKey={descriptionI18nKey}
                i18nOptions={descriptionI18nOptions}
              />
            )}
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
