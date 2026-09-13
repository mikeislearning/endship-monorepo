import * as ProgressPrimitive from "@rn-primitives/progress";
import { Platform } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from "react-native-reanimated";

import { usePlatformOS } from "@/hooks/usePlatformOS";
import { cn } from "@/utils/tailwind";

import { AnBox } from "./AnBox";

type IndicatorPropsType = {
  value: number | undefined | null;
  className?: string;
};

const WebIndicator = ({ value, className }: IndicatorPropsType) => {
  if (Platform.OS !== "web") {
    return null;
  }

  return (
    <AnBox
      className={cn(
        "bg-primary h-full w-full flex-1 transition-all",
        className,
      )}
      style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}>
      <ProgressPrimitive.Indicator className={cn("h-full w-full", className)} />
    </AnBox>
  );
};

const NativeIndicator = ({ value, className }: IndicatorPropsType) => {
  const progress = useDerivedValue(() => value ?? 0);

  const indicator = useAnimatedStyle(() => {
    return {
      width: withSpring(
        `${interpolate(progress.value, [0, 100], [1, 100], Extrapolation.CLAMP)}%`,
        { overshootClamping: true },
      ),
    };
  }, [value]);

  if (Platform.OS === "web") {
    return null;
  }

  return (
    <ProgressPrimitive.Indicator asChild>
      <Animated.View
        style={indicator}
        className={cn("bg-foreground h-full", className)}
      />
    </ProgressPrimitive.Indicator>
  );
};

type AnProgressPropsType = ProgressPrimitive.RootProps & {
  indicatorClassName?: string;
};

export const AnProgress = ({
  className,
  value,
  indicatorClassName,
  ...props
}: AnProgressPropsType) => {
  const { isWeb, isNative } = usePlatformOS();

  return (
    <ProgressPrimitive.Root
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className,
      )}
      {...props}>
      {isNative ? (
        <NativeIndicator value={value} className={indicatorClassName} />
      ) : isWeb ? (
        <WebIndicator value={value} className={indicatorClassName} />
      ) : null}
    </ProgressPrimitive.Root>
  );
};
