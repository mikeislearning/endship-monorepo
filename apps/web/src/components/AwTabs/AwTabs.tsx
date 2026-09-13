import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { VariantProps } from "class-variance-authority";

import { useTranslate } from "@/hooks/useTranslate";
import { ChildrenOrI18nType } from "@/utils/react";
import { cn } from "@/utils/tailwind";

import { textVariants } from "../AwText/variants";
import { tabsListVariants } from "./variants";

export const AwTabs = ({
  className,
  orientation = "horizontal",
  ...props
}: TabsPrimitive.Root.Props) => {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(
        "group/tabs flex gap-2 data-horizontal:flex-col",
        className,
      )}
      {...props}
    />
  );
};

type AwTabsListPropsType = TabsPrimitive.List.Props &
  VariantProps<typeof tabsListVariants>;

export const AwTabsList = ({
  className,
  variant = "default",
  ...props
}: AwTabsListPropsType) => {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  );
};

type AwTabsTriggerPropsType = TabsPrimitive.Tab.Props & ChildrenOrI18nType;

export const AwTabsTrigger = ({
  className,
  children,
  i18nKey,
  i18nOptions,
  ...props
}: AwTabsTriggerPropsType) => {
  const i18nText = useTranslate(i18nKey, i18nOptions);

  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 whitespace-nowrap text-foreground/60 transition-all group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 dark:text-muted-foreground dark:hover:text-foreground group-data-[variant=default]/tabs-list:data-active:shadow-sm group-data-[variant=line]/tabs-list:data-active:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent",
        "data-active:bg-background data-active:text-foreground dark:data-active:border-input dark:data-active:bg-input/30 dark:data-active:text-foreground",
        "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-[-5px] group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100",
        textVariants({ variant: "mdMedium" }),
        className,
      )}
      {...props}>
      {children ?? i18nText}
    </TabsPrimitive.Tab>
  );
};

export const AwTabsContent = ({
  className,
  ...props
}: TabsPrimitive.Panel.Props) => {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("flex-1 text-sm outline-none", className)}
      {...props}
    />
  );
};
