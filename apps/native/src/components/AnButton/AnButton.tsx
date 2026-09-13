import { ComponentProps } from "react";
import { type VariantProps } from "class-variance-authority";
import { LucideIcon } from "lucide-react-native";

import { TextClassContext } from "@/context/TextClassContext";
import { useAppTheme } from "@/hooks/useAppTheme";
import { ChildrenOrI18nType } from "@/i18n";
import { cn } from "@/utils/tailwind";

import { AnIcon } from "../AnIcon";
import { AnLoadingSpinner } from "../AnLoadingSpinner";
import { AnText } from "../AnText/AnText";
import { TextVariantType } from "../AnText/variants";
import { AnTouchableOpacity } from "../AnTouchableOpacity";
import {
  buttonTextVariants,
  buttonVariants,
  ButtonVariantType,
} from "./variants";

type AnButtonIconPropsType = {
  size?: number;
  variant: ButtonVariantType;
  isLoading: boolean;
  IconComponent?: LucideIcon;
  iconProps?: Omit<ComponentProps<typeof AnIcon>, "as" | "size">;
};

const AnButtonIcon = ({
  size = 14,
  isLoading,
  variant,
  IconComponent,
  iconProps = {},
}: AnButtonIconPropsType) => {
  const { resolvedColors } = useAppTheme();

  switch (true) {
    case isLoading:
      return (
        <AnLoadingSpinner
          {...iconProps}
          size={size + 2}
          fill={
            variant === "default"
              ? resolvedColors.primaryForeground
              : resolvedColors.foreground
          }
        />
      );

    case Boolean(IconComponent):
      return IconComponent ? (
        <AnIcon {...iconProps} as={IconComponent} size={size} />
      ) : null;

    default:
      return null;
  }
};

export type AnButtonPropsType = ComponentProps<typeof AnTouchableOpacity> &
  ChildrenOrI18nType &
  VariantProps<typeof buttonVariants> & {
    textVariant?: TextVariantType;
    isLoading?: boolean;
    isDisabled?: boolean;
    IconComponent?: LucideIcon;
    iconProps?: ComponentProps<typeof AnIcon>;
    iconPosition?: "left" | "right";
  };

export const AnButton = ({
  className,
  variant,
  size,
  IconComponent,
  iconPosition = "left",
  iconProps,
  textVariant = "button",
  isLoading = false,
  isDisabled = false,
  children,
  i18nKey,
  i18nOptions,
  ...props
}: AnButtonPropsType) => {
  return (
    <TextClassContext.Provider value={buttonTextVariants({ variant, size })}>
      <AnTouchableOpacity
        className={cn(
          props.disabled && "opacity-50",
          buttonVariants({ variant, size }),
          className,
          {
            "flex-row-reverse": iconPosition === "right" && !isLoading,
          },
        )}
        role="button"
        disabled={isDisabled || isLoading}
        {...props}>
        <AnButtonIcon
          size={size === "lg" ? 16 : 14}
          variant={variant}
          isLoading={isLoading}
          IconComponent={IconComponent}
          iconProps={iconProps}
        />
        {children ?? (
          <AnText
            variant={textVariant}
            i18nKey={i18nKey}
            i18nOptions={i18nOptions}
          />
        )}
      </AnTouchableOpacity>
    </TextClassContext.Provider>
  );
};
