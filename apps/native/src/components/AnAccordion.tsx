import { ReactNode } from "react";
import * as AccordionPrimitive from "@rn-primitives/accordion";
import { ChevronDownIcon } from "lucide-react-native";
import { Platform, Pressable, View } from "react-native";
import Animated, {
  FadeOutUp,
  LayoutAnimationConfig,
  LinearTransition,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";

import { TextClassContext } from "@/context/TextClassContext";
import { usePlatformOS } from "@/hooks/usePlatformOS";
import { cn } from "@/utils/tailwind";

import { AnIcon } from "./AnIcon";

type AnAccordionPropsType = AccordionPrimitive.RootProps & {
  children?: ReactNode;
};

export const AnAccordion = ({ children, ...props }: AnAccordionPropsType) => {
  const { isNative } = usePlatformOS();

  return (
    <LayoutAnimationConfig skipEntering>
      <AccordionPrimitive.Root {...props} asChild={isNative}>
        <Animated.View layout={LinearTransition.duration(200)}>
          {children}
        </Animated.View>
      </AccordionPrimitive.Root>
    </LayoutAnimationConfig>
  );
};

type AnAccordionItemPropsType = AccordionPrimitive.ItemProps;

export const AnAccordionItem = ({
  children,
  className,
  value,
  ...props
}: AnAccordionItemPropsType) => {
  const { isWeb, isNative } = usePlatformOS();

  return (
    <AccordionPrimitive.Item
      className={cn(
        "border-border border-b",
        isWeb && "last:border-b-0",
        className,
      )}
      value={value}
      {...props}>
      <Animated.View
        className="native:overflow-hidden"
        layout={isNative ? LinearTransition.duration(200) : undefined}>
        {children}
      </Animated.View>
    </AccordionPrimitive.Item>
  );
};

const Trigger = Platform.OS === "web" ? View : Pressable;

type AnAccordionTriggerPropsType = AccordionPrimitive.TriggerProps & {
  children?: ReactNode;
};

export const AnAccordionTrigger = ({
  className,
  children,
  ...props
}: AnAccordionTriggerPropsType) => {
  const { isExpanded } = AccordionPrimitive.useItemContext();
  const { isWeb } = usePlatformOS();

  const progress = useDerivedValue(
    () =>
      isExpanded
        ? withTiming(1, { duration: 250 })
        : withTiming(0, { duration: 200 }),
    [isExpanded],
  );
  const chevronStyle = useAnimatedStyle(
    () => ({
      transform: [{ rotate: `${progress.value * 180}deg` }],
    }),
    [progress],
  );

  return (
    <TextClassContext.Provider
      value={cn("text-left text-sm", isWeb && "group-hover:underline")}>
      <AccordionPrimitive.Header>
        <AccordionPrimitive.Trigger {...props} asChild>
          <Trigger
            className={cn(
              "flex-row items-start justify-between gap-4 rounded-md py-4 disabled:opacity-50",
              isWeb &&
                "focus-visible:ring-ring/50 focus-visible:border-ring flex flex-1 outline-none transition-all hover:underline focus-visible:ring-[3px] disabled:pointer-events-none [&[data-state=open]>svg]:rotate-180",
              className,
            )}>
            <>{children}</>
            <Animated.View style={chevronStyle}>
              <AnIcon
                as={ChevronDownIcon}
                size={16}
                className={cn(
                  "text-muted-foreground shrink-0",
                  isWeb &&
                    "pointer-events-none translate-y-0.5 transition-transform duration-200",
                )}
              />
            </Animated.View>
          </Trigger>
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
    </TextClassContext.Provider>
  );
};

type AnAccordionContentPropsType = AccordionPrimitive.ContentProps;

export const AnAccordionContent = ({
  className,
  children,
  ...props
}: AnAccordionContentPropsType) => {
  const { isExpanded } = AccordionPrimitive.useItemContext();
  const { isWeb, isNative } = usePlatformOS();

  return (
    <TextClassContext.Provider value="text-sm">
      <AccordionPrimitive.Content
        className={cn(
          "overflow-hidden",
          isWeb &&
            (isExpanded ? "animate-accordion-down" : "animate-accordion-up"),
        )}
        {...props}>
        <View className={cn("pb-4", className)}>
          <Animated.View
            exiting={isNative ? FadeOutUp.duration(200) : undefined}>
            {children}
          </Animated.View>
        </View>
      </AccordionPrimitive.Content>
    </TextClassContext.Provider>
  );
};
