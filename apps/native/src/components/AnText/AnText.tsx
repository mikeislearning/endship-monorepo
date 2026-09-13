import { ComponentProps, ReactNode, useContext } from "react";
import * as Slot from "@rn-primitives/slot";
import { Trans, TransProps } from "react-i18next";
import { Text as RNText } from "react-native";

import { TextClassContext } from "@/context/TextClassContext";
import { I18nKeyType } from "@/i18n";
import { cn } from "@/utils/tailwind";

import { ARIA_LEVEL, ROLE, textVariants, TextVariantType } from "./variants";

export type AnTextPropsType = ComponentProps<typeof RNText> & {
  asChild?: boolean;
  children?: ReactNode;
  i18nKey?: I18nKeyType;
  i18nOptions?: object;
  i18nProps?: Omit<TransProps<I18nKeyType>, "i18nKey" | "values">;
  variant?: TextVariantType;
};

export const AnText = ({
  className,
  asChild = false,
  variant = "md",
  children,
  i18nKey,
  i18nOptions,
  i18nProps,
  ...props
}: AnTextPropsType) => {
  const textClass = useContext(TextClassContext);
  const Component = asChild ? Slot.Text : RNText;

  return (
    <Component
      className={cn(textVariants({ variant }), textClass, className)}
      role={variant ? ROLE[variant] : undefined}
      aria-level={variant ? ARIA_LEVEL[variant] : undefined}
      {...props}>
      {children ?? (
        <Trans
          // Doing this as a workaround for a typing error with i18nKey union
          i18nKey={i18nKey as string}
          values={i18nOptions}
          components={{
            medium: (
              <AnText
                variant={variant}
                className={cn(textClass, className, "font-primary-medium")}
              />
            ),
            bold: (
              <AnText
                variant={variant}
                className={cn(textClass, className, "font-primary-semibold")}
              />
            ),
            italic: (
              <AnText
                variant={variant}
                className={cn(textClass, className, "italic")}
              />
            ),
            underline: (
              <AnText
                variant={variant}
                className={cn(textClass, className, "underline")}
              />
            ),
          }}
        />
      )}
    </Component>
  );
};
