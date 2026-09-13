import * as TabsPrimitive from "@rn-primitives/tabs";

import { TextClassContext } from "@/context/TextClassContext";
import { usePlatformOS } from "@/hooks/usePlatformOS";
import { ChildrenOrI18nType } from "@/i18n";
import { cn } from "@/utils/tailwind";

import { AnText } from "./AnText/AnText";

type AnTabsPropsType = TabsPrimitive.RootProps;

export const AnTabs = ({ className, ...props }: AnTabsPropsType) => {
  return (
    <TabsPrimitive.Root
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
};

type AnTabsListPropsType = TabsPrimitive.ListProps;

export const AnTabsList = ({ className, ...props }: AnTabsListPropsType) => {
  const { isWeb, isNative } = usePlatformOS();

  return (
    <TabsPrimitive.List
      className={cn(
        "bg-muted flex h-9 flex-row items-center justify-center rounded-lg p-[3px]",
        isWeb && "inline-flex w-fit",
        isNative && "mr-auto",
        className,
      )}
      {...props}
    />
  );
};

type AnTabsTriggerPropsType = TabsPrimitive.TriggerProps & ChildrenOrI18nType;

export const AnTabsTrigger = ({
  className,
  children,
  i18nKey,
  i18nOptions,
  ...props
}: AnTabsTriggerPropsType) => {
  const { value } = TabsPrimitive.useRootContext();
  const { isWeb } = usePlatformOS();

  return (
    <TextClassContext.Provider
      value={cn(
        "font-primary-medium text-foreground dark:text-muted-foreground text-sm",
        value === props.value && "dark:text-foreground",
      )}>
      <TabsPrimitive.Trigger
        className={cn(
          "flex h-[calc(100%-1px)] flex-row items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 shadow-none shadow-black/5",
          isWeb &&
            "focus-visible:ring-ring/50 focus-visible:border-ring focus-visible:outline-ring inline-flex cursor-default whitespace-nowrap transition-[color,box-shadow] focus-visible:outline-1 focus-visible:ring-[3px] disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
          props.disabled && "opacity-50",
          props.value === value &&
            "dark:border-foreground/20 dark:bg-background/50 bg-background",
          className,
        )}
        {...props}>
        {children ?? <AnText i18nKey={i18nKey} i18nOptions={i18nOptions} />}
      </TabsPrimitive.Trigger>
    </TextClassContext.Provider>
  );
};

type AnTabsContentPropsType = TabsPrimitive.ContentProps;

export const AnTabsContent = ({
  className,
  ...props
}: AnTabsContentPropsType) => {
  const { isWeb } = usePlatformOS();

  return (
    <TabsPrimitive.Content
      className={cn(
        {
          "flex-1 outline-none": isWeb,
        },
        className,
      )}
      {...props}
    />
  );
};
