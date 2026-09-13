import {
  Control,
  ControllerRenderProps,
  FieldValues,
  Path,
} from "react-hook-form";

import {
  AwFormControl,
  AwFormDescription,
  AwFormErrorMessage,
  AwFormField,
  AwFormItem,
  AwFormLabel,
} from "@/components/AwForm";
import { I18nKeyType } from "@/i18n";
import { cn } from "@/utils/tailwind";

import { BaseMultiTextSelect } from "./BaseMultiTextSelect";
import { BaseTextSelect, BaseTextSelectPropsType } from "./BaseTextSelect";

type ApSelectInputPropsType<T extends FieldValues> = BaseTextSelectPropsType & {
  name: Path<T>;
  control: Control<T>;
  labelI18nKey?: I18nKeyType;
  labelI18nOptions?: object;
  descriptionI18nKey?: I18nKeyType;
  descriptionI18nOptions?: object;
  errorI18nKey?: I18nKeyType;
  errorI18nOptions?: object;
  className?: string;
  showError?: boolean;
  isMultiSelect?: boolean;
  isRequired?: boolean;
  onSelectionChanged?: (value: string | number | (string | number)[]) => void;
};

export const AwSelectInput = <T extends FieldValues>({
  name,
  control,
  labelI18nKey,
  labelI18nOptions,
  descriptionI18nKey,
  descriptionI18nOptions,
  className,
  showError = true,
  errorI18nKey,
  errorI18nOptions,
  isRequired = true,
  onSelectionChanged,
  ...props
}: ApSelectInputPropsType<T>) => {
  const { isMultiSelect } = props;

  const renderSelectComponent = (field: ControllerRenderProps<T, Path<T>>) => {
    const { ...fieldProps } = field;
    switch (true) {
      case isMultiSelect:
        return (
          <BaseMultiTextSelect
            values={field.value ?? []}
            onSelectionChange={values => {
              field.onChange(values);
              onSelectionChanged?.(values);
            }}
            {...props}
            {...fieldProps}
          />
        );

      default:
        return (
          <BaseTextSelect
            onValueChange={selection => {
              field.onChange(selection?.value);
              if (selection) {
                onSelectionChanged?.(selection?.value);
              }
            }}
            {...props}
            {...fieldProps}
          />
        );
    }
  };

  return (
    <AwFormField
      control={control}
      name={name}
      render={({ field }) => (
        <AwFormItem>
          <div className={cn("flex flex-col gap-2", className)}>
            {labelI18nKey && (
              <AwFormLabel
                i18nKey={labelI18nKey}
                i18nOptions={labelI18nOptions}
                isDisabled={props.isDisabled}
                isRequired={isRequired}
              />
            )}
            <AwFormControl>{renderSelectComponent(field)}</AwFormControl>
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
