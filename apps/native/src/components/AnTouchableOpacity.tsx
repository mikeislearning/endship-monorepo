import { ComponentProps, useRef } from "react";
import { GestureResponderEvent, TouchableOpacity } from "react-native";

const DEBOUNCE_DELAY = 500;

type AnTouchableOpacityPropsType = ComponentProps<typeof TouchableOpacity> & {
  shouldDebounce?: boolean;
};

export const AnTouchableOpacity = ({
  onPress,
  shouldDebounce = true,
  ...props
}: AnTouchableOpacityPropsType) => {
  const busy = useRef(false);

  // Debounce Ane onPress function to prevent multiple rapid taps
  const debouncedOnPress = (event: GestureResponderEvent) => {
    setTimeout(() => {
      busy.current = false;
    }, DEBOUNCE_DELAY);

    if (!busy.current) {
      busy.current = true;
      onPress?.(event);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={shouldDebounce ? debouncedOnPress : onPress}
      {...props}
    />
  );
};
