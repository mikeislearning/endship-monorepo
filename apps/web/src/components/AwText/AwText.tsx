import {
  ComponentProps,
  createElement,
  ElementType,
  HTMLAttributes,
  ReactNode,
} from "react";
import { type VariantProps } from "class-variance-authority";
import { Trans } from "react-i18next";

import { I18nKeyType } from "@/i18n";
import { cn } from "@/utils/tailwind";

import { textVariants, TextVariantType } from "./variants";

export type AwTextPropsType = ComponentProps<"p"> &
  HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof textVariants> & {
    as?: ElementType;
  } & {
    children?: ReactNode;
    i18nKey?: I18nKeyType;
    i18nOptions?: object;
    i18nProps?: Omit<ComponentProps<typeof Trans>, "i18nKey" | "values">;
  };

const parseComponent = (variant?: TextVariantType | null) => {
  switch (variant) {
    case "title":
      return "h1";
    case "headerOne":
      return "h2";
    case "headerTwo":
      return "h3";
    case "headerThree":
      return "h4";
    default:
      return "p";
  }
};

export const AwText = ({
  as,
  className,
  variant,
  i18nKey,
  i18nOptions,
  i18nProps,
  children,
  ...props
}: AwTextPropsType) => {
  const { components: i18nComponents, ...restI18nProps } = i18nProps ?? {};

  const content = children ?? (
    <Trans
      // Doing this as a workaround for a typing error with i18nKey union
      i18nKey={i18nKey as never}
      values={i18nOptions}
      components={{
        medium: <span className="font-medium" />,
        bold: <span className="font-semibold" />,
        italic: <span className="italic" />,
        underline: <span className="underline" />,
        ...i18nComponents,
      }}
      {...restI18nProps}
    />
  );

  // ? Using createElement instead of JSX with a dynamic `Comp` variable to avoid
  // ? the React Compiler's "component created during render" false positive
  return createElement(
    as ?? parseComponent(variant),
    { className: cn(textVariants({ variant, className })), ...props },
    content,
  );
};
