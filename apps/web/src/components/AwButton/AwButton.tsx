import { ComponentProps, ReactElement, ReactNode } from "react";
import { Button as ButtonPrimitive } from "@base-ui/react";
import { type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { useTranslate } from "@/hooks/useTranslate";
import { I18nKeyType } from "@/i18n";
import { cn } from "@/utils/tailwind";

import { textVariants } from "../AwText/variants";
import { buttonVariants } from "./variants";

type AwButtonIconPropsType = {
  isLoading: boolean;
  iconComponent?: ReactElement;
};

const AwButtonIcon = ({ isLoading, iconComponent }: AwButtonIconPropsType) => {
  switch (true) {
    case isLoading:
      return <Loader2 className="animate-spin" />;

    case Boolean(iconComponent):
      return iconComponent;

    default:
      return null;
  }
};

export type AwButtonPropsType = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    iconComponent?: ReactElement;
    iconPosition?: "left" | "right";
    isLoading?: boolean;
    isDisabled?: boolean;
    children?: ReactNode;
    i18nKey?: I18nKeyType;
    i18nOptions?: object;
    asButtonElement?: boolean;
  };

export const AwButton = ({
  className,
  variant,
  size,
  iconComponent,
  iconPosition = "left",
  isLoading = false,
  isDisabled = false,
  children,
  i18nKey,
  i18nOptions,
  asButtonElement = true,
  ...props
}: AwButtonPropsType) => {
  const i18nText = useTranslate(i18nKey, i18nOptions);

  return (
    <ButtonPrimitive
      data-slot="button"
      type="button"
      nativeButton={asButtonElement}
      render={asButtonElement ? <button /> : <div />}
      className={cn(
        buttonVariants({ variant, size, className }),
        textVariants({
          variant: size === "sm" ? "smButton" : "button",
        }),
        {
          "flex-row-reverse": iconPosition === "right" && !isLoading,
        },
      )}
      disabled={Boolean(isDisabled) || isLoading}
      {...props}>
      <AwButtonIcon isLoading={isLoading} iconComponent={iconComponent} />
      {children ?? i18nText}
    </ButtonPrimitive>
  );
};
