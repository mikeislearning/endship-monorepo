import { Control, FieldValues, Path } from "react-hook-form";

import { AwFormErrorMessage, AwFormField } from "@/components/AwForm";
import { AwTextInput } from "@/components/AwTextInput/AwTextInput";

type DateOfBirthInputPropsType<T extends FieldValues> = {
  control: Control<T>;
  isRequired?: boolean;
};

export const DateOfBirthInput = <T extends FieldValues>({
  control,
  isRequired,
}: DateOfBirthInputPropsType<T>) => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        <AwTextInput
          control={control}
          name={"day" as Path<T>}
          labelI18nKey="common:dateOfBirth"
          placeholderI18nKey="common:day"
          showError={false}
          isRequired={isRequired}
        />
        <AwTextInput
          control={control}
          name={"month" as Path<T>}
          className="mt-7"
          placeholderI18nKey="common:month"
          showError={false}
        />
        <AwTextInput
          control={control}
          name={"year" as Path<T>}
          className="mt-7"
          placeholderI18nKey="common:year"
          showError={false}
        />
      </div>
      <AwFormField
        control={control}
        name={"dateOfBirth" as Path<T>}
        render={() => (
          <div className="w-full">
            <AwFormErrorMessage />
          </div>
        )}
      />
    </div>
  );
};
