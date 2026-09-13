import * as LabelPrimitive from "@rn-primitives/label";
import { Platform } from "react-native";

import { cn } from "@/utils/tailwind";

import { AnText, AnTextPropsType } from "./AnText/AnText";

type AnLabelPropsType = LabelPrimitive.TextProps & AnTextPropsType;

export const AnLabel = ({
  onPress,
  onLongPress,
  onPressIn,
  onPressOut,
  disabled,
  ...props
}: AnLabelPropsType) => {
  return (
    <LabelPrimitive.Root
      className={cn(
        "flex select-none flex-row items-center gap-2",
        Platform.select({
          web: "cursor-default leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
        }),
        disabled && "opacity-50",
      )}
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={disabled}>
      <LabelPrimitive.Text asChild>
        <AnText variant="mdMedium" {...props} />
      </LabelPrimitive.Text>
    </LabelPrimitive.Root>
  );
};
