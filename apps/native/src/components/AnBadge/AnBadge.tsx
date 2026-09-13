import * as Slot from "@rn-primitives/slot";
import { type VariantProps } from "class-variance-authority";
import { View, ViewProps } from "react-native";

import { TextClassContext } from "@/context/TextClassContext";
import { ChildrenOrI18nType } from "@/i18n";
import { cn } from "@/utils/tailwind";

import { AnText } from "../AnText/AnText";
import { badgeTextVariants, badgeVariants } from "./variants";

type AnBadgePropsType = ViewProps &
  ChildrenOrI18nType & {
    asChild?: boolean;
  } & VariantProps<typeof badgeVariants>;

export const AnBadge = ({
  className,
  variant,
  asChild,
  children,
  i18nKey,
  i18nOptions,
  ...props
}: AnBadgePropsType) => {
  const Component = asChild ? Slot.View : View;
  return (
    <TextClassContext.Provider value={badgeTextVariants({ variant })}>
      <Component
        className={cn(badgeVariants({ variant }), className)}
        {...props}>
        {children ?? <AnText i18nKey={i18nKey} i18nOptions={i18nOptions} />}
      </Component>
    </TextClassContext.Provider>
  );
};
