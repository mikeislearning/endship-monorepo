import { type ComponentProps } from "react";
import { OTPInput, SlotProps } from "input-otp";
import { type ViewProps } from "react-native";

import { cn } from "@/utils/tailwind";

import { AnBox } from "../AnBox";
import { AnText } from "../AnText/AnText";

type BaseOTPInputPropsType = ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
};

export const BaseOTPInput = ({
  className,
  containerClassName,
  ...props
}: BaseOTPInputPropsType) => {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "flex flex-row items-center gap-2",
        containerClassName,
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      textAlign="center"
      {...props}
    />
  );
};

export const BaseOTPInputGroup = ({ className, ...props }: ViewProps) => {
  return (
    <AnBox
      data-slot="input-otp-group"
      className={cn(
        "flex w-full flex-row items-center justify-center gap-2",
        className,
      )}
      {...props}
    />
  );
};

type BaseOTPInputSlotPropsType = SlotProps & {
  className?: string;
};

export const BaseOTPInputSlot = ({
  className,
  char,
  hasFakeCaret,
  isActive,
  ...props
}: BaseOTPInputSlotPropsType) => {
  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "shadow-xs aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 dark:data-[active=true]:aria-invalid:ring-destructive/40 data-[active=true]:ring-ring/50 dark:bg-background/50 border-input bg-background data-[active=true]:border-ring relative flex h-10 w-10 items-center justify-center rounded-lg border outline-none transition-all data-[active=true]:z-10 data-[active=true]:ring-[3px]",
        className,
      )}
      {...props}>
      {char !== null && <AnText variant="lgBold">{char}</AnText>}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  );
};
