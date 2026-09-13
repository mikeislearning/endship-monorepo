import { ComponentProps, ReactNode } from "react";
import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";

import { useTranslate } from "@/hooks/useTranslate";
import { I18nKeyType } from "@/i18n";
import { ChildrenOrI18nType } from "@/utils/react";
import { cn } from "@/utils/tailwind";

import { textVariants } from "./AwText/variants";

export const AwDropdownMenu = (props: MenuPrimitive.Root.Props) => {
  return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
};

export const AwDropdownMenuPortal = (props: MenuPrimitive.Portal.Props) => {
  return <MenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />;
};

type AwDropdownMenuTriggerPropsType = MenuPrimitive.Trigger.Props & {
  children?: ReactNode;
  i18nKey?: I18nKeyType;
  i18nOptions?: object;
};

export const AwDropdownMenuTrigger = ({
  children,
  i18nKey,
  i18nOptions,
  ...props
}: AwDropdownMenuTriggerPropsType) => {
  const i18nText = useTranslate(i18nKey, i18nOptions);

  return (
    <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props}>
      {children ?? i18nText}
    </MenuPrimitive.Trigger>
  );
};

type AwDropdownMenuContentPropsType = MenuPrimitive.Popup.Props &
  Pick<
    MenuPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >;

export const AwDropdownMenuContent = ({
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  className,
  ...props
}: AwDropdownMenuContentPropsType) => {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        className="isolate z-50 outline-none"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}>
        <MenuPrimitive.Popup
          data-slot="dropdown-menu-content"
          className={cn(
            "z-50 max-h-(--available-height) w-(--anchor-width) min-w-32 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-md bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95",
            className,
          )}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
};

export const AwDropdownMenuGroup = (props: MenuPrimitive.Group.Props) => {
  return <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />;
};

type AwDropdownMenuItemPropsType = MenuPrimitive.Item.Props & {
  children?: ReactNode;
  i18nKey?: I18nKeyType;
  i18nOptions?: object;
  inset?: boolean;
  variant?: "default" | "destructive";
};

export const AwDropdownMenuItem = ({
  className,
  inset,
  variant = "default",
  children,
  i18nKey,
  i18nOptions,
  ...props
}: AwDropdownMenuItemPropsType) => {
  const i18nText = useTranslate(i18nKey, i18nOptions);

  return (
    <MenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "group/dropdown-menu-item relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive",
        textVariants(),
        className,
      )}
      {...props}>
      {i18nText}
      {children}
    </MenuPrimitive.Item>
  );
};

type AwDropdownMenuCheckboxItemPropsType = MenuPrimitive.CheckboxItem.Props &
  ChildrenOrI18nType & {
    inset?: boolean;
  };

export const AwDropdownMenuCheckboxItem = ({
  className,
  children,
  i18nKey,
  i18nOptions,
  checked,
  inset,
  ...props
}: AwDropdownMenuCheckboxItemPropsType) => {
  const i18nText = useTranslate(i18nKey, i18nOptions);

  return (
    <MenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        textVariants(),
        className,
      )}
      checked={checked}
      {...props}>
      <span
        className="pointer-events-none absolute left-2 flex items-center justify-center"
        data-slot="dropdown-menu-checkbox-item-indicator">
        <MenuPrimitive.CheckboxItemIndicator>
          <CheckIcon />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children ?? i18nText}
    </MenuPrimitive.CheckboxItem>
  );
};

export const AwDropdownMenuRadioGroup = (
  props: MenuPrimitive.RadioGroup.Props,
) => {
  return (
    <MenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  );
};

type AwDropdownMenuRadioItemPropsType = MenuPrimitive.RadioItem.Props &
  ChildrenOrI18nType & {
    inset?: boolean;
  };

export const AwDropdownMenuRadioItem = ({
  className,
  children,
  i18nKey,
  i18nOptions,
  inset,
  ...props
}: AwDropdownMenuRadioItemPropsType) => {
  const i18nText = useTranslate(i18nKey, i18nOptions);

  return (
    <MenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        textVariants(),
        className,
      )}
      {...props}>
      <span
        className="pointer-events-none absolute left-2 flex items-center justify-center"
        data-slot="dropdown-menu-radio-item-indicator">
        <MenuPrimitive.RadioItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children ?? i18nText}
    </MenuPrimitive.RadioItem>
  );
};

type AwDropdownMenuLabelPropsType = MenuPrimitive.GroupLabel.Props &
  ChildrenOrI18nType & {
    inset?: boolean;
  };

export const AwDropdownMenuLabel = ({
  className,
  inset,
  children,
  i18nKey,
  i18nOptions,
  ...props
}: AwDropdownMenuLabelPropsType) => {
  const i18nText = useTranslate(i18nKey, i18nOptions);

  return (
    <MenuPrimitive.GroupLabel
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 text-xs font-medium data-inset:pl-8",
        className,
      )}
      {...props}>
      {children ?? i18nText}
    </MenuPrimitive.GroupLabel>
  );
};

export const AwDropdownMenuSeparator = ({
  className,
  ...props
}: MenuPrimitive.Separator.Props) => {
  return (
    <MenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  );
};

export const AwDropdownMenuShortcut = ({
  className,
  ...props
}: ComponentProps<"span">) => {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground",
        className,
      )}
      {...props}
    />
  );
};

export const AwDropdownMenuSub = (props: MenuPrimitive.SubmenuRoot.Props) => {
  return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />;
};

type AwDropdownMenuSubTriggerPropsType = MenuPrimitive.SubmenuTrigger.Props &
  ChildrenOrI18nType & {
    inset?: boolean;
  };

export const AwDropdownMenuSubTrigger = ({
  className,
  inset,
  children,
  i18nKey,
  i18nOptions,
  ...props
}: AwDropdownMenuSubTriggerPropsType) => {
  const i18nText = useTranslate(i18nKey, i18nOptions);

  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-8 data-popup-open:bg-accent data-popup-open:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        textVariants(),
        className,
      )}
      {...props}>
      {children ?? i18nText}
      <ChevronRightIcon className="ml-auto" />
    </MenuPrimitive.SubmenuTrigger>
  );
};

type AwDropdownMenuSubContentPropsType = MenuPrimitive.Popup.Props &
  Pick<
    MenuPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >;

export const AwDropdownMenuSubContent = ({
  align = "start",
  alignOffset = -3,
  side = "right",
  sideOffset = 0,
  className,
  ...props
}: AwDropdownMenuSubContentPropsType) => {
  return (
    <AwDropdownMenuContent
      data-slot="dropdown-menu-sub-content"
      className={cn("w-auto min-w-24", className)}
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      {...props}
    />
  );
};
