import { ComponentProps, ReactNode } from "react";
import { Platform } from "react-native";
import Animated from "react-native-reanimated";

type AnNativeOnlyAnimatedViewPropsType = ComponentProps<typeof Animated.View>;

/**
 * This component is used to wrap animated views that should only be animated on native.
 * @param props - The props for the animated view.
 * @returns The animated view if the platform is native, otherwise the children.
 * @example
 * <NativeOnlyAnimatedView entering={FadeIn} exiting={FadeOut}>
 *   <Text>I am only animated on native</Text>
 * </NativeOnlyAnimatedView>
 */
export const AnNativeOnlyAnimatedView = (
  props: AnNativeOnlyAnimatedViewPropsType,
) => {
  if (Platform.OS === "web") {
    return <>{props.children as ReactNode}</>;
  } else {
    return <Animated.View {...props} />;
  }
};
