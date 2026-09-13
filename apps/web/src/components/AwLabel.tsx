import { ComponentProps } from "react";

import { useTranslate } from "@/hooks/useTranslate";
import { ChildrenOrI18nType } from "@/utils/react";
import { cn } from "@/utils/tailwind";

import { textVariants } from "./AwText/variants";

export type AwLabelPropsType = ComponentProps<"label"> & ChildrenOrI18nType;

export const AwLabel = ({
  className,
  children,
  i18nKey,
  i18nOptions,
  ...props
}: AwLabelPropsType) => {
  const i18nText = useTranslate(i18nKey, i18nOptions);

  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-2 select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        textVariants({
          variant: "mdMedium",
        }),
        className,
      )}
      {...props}>
      {children ?? i18nText}
    </label>
  );
};
