import { Link, LinkProps } from "expo-router";

import { useTranslate } from "@/hooks/useTranslate";
import { I18nKeyType } from "@/i18n";

import { AnText } from "./AnText/AnText";
import { AnTouchableOpacity } from "./AnTouchableOpacity";

type AnLinkPropsType = LinkProps & {
  text?: string;
  i18nKey?: I18nKeyType;
  i18nOptions?: object;
};

export const AnLink = ({
  i18nKey,
  i18nOptions,
  text,
  children,
  className,
  ...props
}: AnLinkPropsType) => {
  const i18nText = useTranslate(i18nKey, i18nOptions);

  return (
    <Link {...props} asChild>
      <AnTouchableOpacity className={className}>
        {children ?? <AnText>{text ?? i18nText}</AnText>}
      </AnTouchableOpacity>
    </Link>
  );
};
