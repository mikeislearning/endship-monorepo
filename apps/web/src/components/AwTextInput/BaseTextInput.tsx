import { ComponentProps, ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import { useHookFormMask } from "use-mask-input";

import { useTranslate } from "@/hooks/useTranslate";
import { I18nKeyType } from "@/i18n";
import { cn } from "@/utils/tailwind";

export type InputMaskType = {
  fieldName: string;
  mask: string[];
  required?: boolean;
};

export type BaseTextInputPropsType = ComponentProps<"input"> & {
  i18nKey?: I18nKeyType;
  i18nOptions?: object;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  mask?: InputMaskType;
};

export const BaseTextInput = ({
  ref,
  className,
  type,
  mask,
  i18nKey,
  i18nOptions,
  leftIcon,
  rightIcon,
  value,
  onChange,
  ...props
}: BaseTextInputPropsType) => {
  const { register } = useFormContext();
  const registerWithMask = useHookFormMask(register);

  const placeholder = useTranslate(i18nKey, i18nOptions);
  const hasLeftIcon = Boolean(leftIcon);
  const hasRightIcon = Boolean(rightIcon);

  return (
    <div className="relative inline-flex w-full flex-1 items-center">
      {hasLeftIcon && (
        <div className="absolute top-0 bottom-0 left-2 flex w-4 items-center justify-center text-muted-foreground">
          {leftIcon}
        </div>
      )}
      <input
        type={type}
        data-slot="input"
        placeholder={placeholder}
        {...(mask
          ? registerWithMask(mask.fieldName, mask.mask, {
              autoUnmask: true,
              required: mask.required,
            })
          : { ref })}
        className={cn(
          "h-9 w-full min-w-0 rounded-md border border-input bg-background px-2.5 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30",
          "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
          "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
          hasLeftIcon ? "pl-7.5" : "",
          hasRightIcon ? "pr-7.5" : "",
          className,
        )}
        {...props}
        value={value ?? ""}
        onChange={onChange ?? undefined}
        readOnly={onChange ? false : true}
        defaultValue={undefined}
      />
      {hasRightIcon && (
        <div className="absolute top-0 right-2 bottom-0 flex w-4 items-center justify-center text-muted-foreground">
          {rightIcon}
        </div>
      )}
    </div>
  );
};
