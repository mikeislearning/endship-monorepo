import { router } from "expo-router";

import { AnBox } from "@/components/AnBox";
import { AnLoadingSpinner } from "@/components/AnLoadingSpinner";
import { AnText } from "@/components/AnText/AnText";
import { AnTouchableOpacity } from "@/components/AnTouchableOpacity";
import { I18nKeyType } from "@/i18n";

import { BackButton } from "./BackButton";

type ScreenHeaderPropsType = {
  i18nKey: I18nKeyType;
  i18nOptions?: Record<string, string>;
  withBackButton?: boolean;
  backButtonI18nKey?: I18nKeyType;
  rightButtonI18nKey?: I18nKeyType;
  rightButtonI18nOptions?: Record<string, string>;
  onRightButtonPress?: () => void;
  isRightButtonLoading?: boolean;
};

export const ScreenHeader = ({
  i18nKey,
  i18nOptions,
  withBackButton = true,
  backButtonI18nKey,
  rightButtonI18nKey,
  onRightButtonPress,
  rightButtonI18nOptions,
  isRightButtonLoading = false,
}: ScreenHeaderPropsType) => {
  return (
    <AnBox className="pt-safe bg-background flex-row items-center justify-between">
      <AnBox className="h-11 min-w-10 items-center justify-center pl-2.5">
        {withBackButton && (
          <AnTouchableOpacity
            onPress={() => {
              if (router.canGoBack()) {
                router.back();
              }
            }}>
            {backButtonI18nKey ? (
              <AnText variant="lg" i18nKey={backButtonI18nKey} />
            ) : (
              <BackButton />
            )}
          </AnTouchableOpacity>
        )}
      </AnBox>
      <AnBox className="h-11 flex-1 items-center justify-center">
        <AnText
          variant="lgBold"
          className="text-center"
          i18nKey={i18nKey}
          i18nOptions={i18nOptions}
        />
      </AnBox>
      {onRightButtonPress && rightButtonI18nKey ? (
        <AnTouchableOpacity
          className="h-11 min-w-10 items-center justify-center pr-2.5"
          onPress={onRightButtonPress}>
          {isRightButtonLoading ? (
            <AnLoadingSpinner size={20} />
          ) : (
            <AnText
              variant="lg"
              i18nKey={rightButtonI18nKey}
              i18nOptions={rightButtonI18nOptions}
            />
          )}
        </AnTouchableOpacity>
      ) : (
        <AnBox className="h-11 min-w-10" />
      )}
    </AnBox>
  );
};
