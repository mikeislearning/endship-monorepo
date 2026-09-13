import { useEffect, type ComponentProps } from "react";
import { OTPInput, SlotProps } from "input-otp-native";
import { type ViewProps } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import { useAppTheme } from "@/hooks/useAppTheme";
import { cn } from "@/utils/tailwind";

import { AnBox } from "../AnBox";
import { AnText } from "../AnText/AnText";

type BaseOTPInputPropsType = ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
};

export const BaseOTPInput = ({
  className,
  containerClassName,
  ...props
}: BaseOTPInputPropsType) => {
  return (
    <OTPInput
      containerClassName={cn(
        "flex flex-row items-center gap-2",
        containerClassName,
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      textAlign="center"
      {...props}
    />
  );
};

export const BaseOTPInputGroup = ({ className, ...props }: ViewProps) => {
  return (
    <AnBox
      className={cn("flex-row items-center justify-center gap-2", className)}
      {...props}
    />
  );
};

type BaseOTPInputSlotPropsType = SlotProps & {
  className?: string;
};

export const BaseOTPInputSlot = ({
  char,
  hasFakeCaret,
  isActive,
}: BaseOTPInputSlotPropsType) => {
  return (
    <AnBox
      className={cn(
        "dark:bg-background/50 border-input bg-background h-10 w-10 items-center justify-center rounded-lg border",
        {
          "border-primary border-2": isActive,
        },
      )}>
      {char !== null && <AnText variant="lgBold">{char}</AnText>}
      {hasFakeCaret && <FakeCaret />}
    </AnBox>
  );
};

const FakeCaret = () => {
  const opacity = useSharedValue(1);
  const { resolvedColors } = useAppTheme();

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 500 }),
        withTiming(1, { duration: 500 }),
      ),
      -1,
      true,
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const baseStyle = {
    width: 2,
    height: 20,
    backgroundColor: resolvedColors.mutedForeground,
    borderRadius: 1,
  };

  return (
    <AnBox className="absolute h-full w-full items-center justify-center">
      <Animated.View style={[baseStyle, animatedStyle]} />
    </AnBox>
  );
};
