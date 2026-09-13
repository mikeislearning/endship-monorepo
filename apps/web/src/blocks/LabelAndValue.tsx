import { ReactNode } from "react";

import { AwLabel } from "@/components/AwLabel";
import { AwSkeleton } from "@/components/AwSkeleton";
import { AwText } from "@/components/AwText/AwText";
import { useTranslate } from "@/hooks/useTranslate";
import { I18nKeyType } from "@/i18n";
import { cn } from "@/utils/tailwind";

type LabelAndValuePropsType = {
  labelI18nKey: I18nKeyType;
  labelI18nOptions?: object;
  labelClassName?: string;
  wrapperClassName?: string;
  value?: string;
  valueI18nKey?: I18nKeyType;
  valueI18nOptions?: object;
  valueClassName?: string;
  children?: ReactNode;
  isLoading?: boolean;
  isHidden?: boolean;
  skeletonClassName?: string;
  errorMessageI18nKey?: I18nKeyType;
};

export const LabelAndValue = ({
  labelI18nKey,
  labelI18nOptions,
  labelClassName,
  value,
  valueI18nKey,
  valueI18nOptions,
  valueClassName,
  children,
  wrapperClassName,
  isLoading = false,
  isHidden = false,
  skeletonClassName,
  errorMessageI18nKey,
}: LabelAndValuePropsType) => {
  const valueContent: string | undefined =
    useTranslate(valueI18nKey, valueI18nOptions) ?? value;
  const errorMessage = useTranslate(errorMessageI18nKey);

  if (isHidden) return null;

  return (
    <div className={cn("flex flex-col gap-0.5", wrapperClassName)}>
      <AwLabel
        i18nKey={labelI18nKey}
        i18nOptions={labelI18nOptions}
        className={cn("text-muted-foreground", labelClassName)}
      />
      <div
        className={cn("py-1", {
          "py-1.5": isLoading,
        })}>
        {isLoading ? (
          <AwSkeleton className={cn("h-4 max-w-50", skeletonClassName)} />
        ) : (
          (children ?? (
            <AwText
              className={cn(valueClassName, {
                "text-destructive": !valueContent && errorMessage,
              })}>
              {valueContent ?? errorMessage}
            </AwText>
          ))
        )}
      </div>
    </div>
  );
};
