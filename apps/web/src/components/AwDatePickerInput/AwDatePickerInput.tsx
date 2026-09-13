import { CalendarIcon } from "lucide-react";
import { Control, FieldValues, Path } from "react-hook-form";

import { useTranslate } from "@/hooks/useTranslate";
import { I18nKeyType } from "@/i18n";
import { dateAsDayjs } from "@/utils/date";
import { cn } from "@/utils/tailwind";

import { AwButton } from "../AwButton/AwButton";
import {
  AwFormControl,
  AwFormDescription,
  AwFormErrorMessage,
  AwFormField,
  AwFormItem,
  AwFormLabel,
} from "../AwForm";
import { AwPopover, AwPopoverContent, AwPopoverTrigger } from "../AwPopover";
import { BaseDatePicker, BaseDatePickerPropsType } from "./BaseDatePicker";

const DATE_PICKER_MAX_YEARS = 5;

type AwDateInputPropsType<T extends FieldValues> = Omit<
  BaseDatePickerPropsType,
  "mode" | "selected"
> & {
  name: Path<T>;
  control: Control<T>;
  labelI18nKey?: I18nKeyType;
  labelI18nOptions?: object;
  placeholderI18nKey?: I18nKeyType;
  placeholderI18nOptions?: object;
  descriptionI18nKey?: I18nKeyType;
  descriptionI18nOptions?: object;
  errorI18nKey?: I18nKeyType;
  errorI18nOptions?: object;
  dateFormat?: string;
  showError?: boolean;
  onValueChange?: (value: string) => void;
  isRequired?: boolean;
  allowPastDates?: boolean;
};

export const AwDatePickerInput = <T extends FieldValues>({
  name,
  control,
  labelI18nKey,
  labelI18nOptions,
  placeholderI18nKey,
  placeholderI18nOptions,
  descriptionI18nKey,
  descriptionI18nOptions,
  dateFormat = "MMMM Do, YYYY",
  showError = true,
  errorI18nKey,
  errorI18nOptions,
  className,
  onValueChange,
  isRequired,
  allowPastDates = false,
  ...props
}: AwDateInputPropsType<T>) => {
  const placeholder = useTranslate(placeholderI18nKey, placeholderI18nOptions);

  return (
    <AwFormField
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <AwFormItem>
            <div className={cn("flex flex-col gap-2", className)}>
              {labelI18nKey && (
                <AwFormLabel
                  i18nKey={labelI18nKey}
                  i18nOptions={labelI18nOptions}
                  isRequired={isRequired}
                />
              )}
              <AwPopover>
                <AwFormControl>
                  <AwPopoverTrigger
                    render={
                      <AwButton
                        type="button"
                        variant="outline"
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      />
                    }>
                    {field.value ? (
                      dateAsDayjs(field.value).format(dateFormat)
                    ) : (
                      <span>{placeholder}</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </AwPopoverTrigger>
                </AwFormControl>
                <AwPopoverContent className="w-auto p-0" align="start">
                  <BaseDatePicker
                    mode="single"
                    endMonth={dateAsDayjs()
                      .add(DATE_PICKER_MAX_YEARS, "year")
                      .toDate()}
                    captionLayout="dropdown"
                    selected={dateAsDayjs(field.value).toDate()}
                    onSelect={date => {
                      const value = dateAsDayjs(date).toISOString();
                      if (onValueChange) {
                        onValueChange(value);
                      } else {
                        field.onChange(value);
                      }
                    }}
                    disabled={date =>
                      !allowPastDates &&
                      dateAsDayjs(date).isBefore(dateAsDayjs(), "day")
                    }
                    {...props}
                  />
                </AwPopoverContent>
              </AwPopover>
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
        );
      }}
    />
  );
};
