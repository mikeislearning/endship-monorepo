import { ComponentProps } from "react";
import { Menubar as MenubarPrimitive } from "@base-ui/react/menubar";

import { cn } from "@/utils/tailwind";

import {
  AwDropdownMenu,
  AwDropdownMenuCheckboxItem,
  AwDropdownMenuContent,
  AwDropdownMenuGroup,
  AwDropdownMenuItem,
  AwDropdownMenuLabel,
  AwDropdownMenuPortal,
  AwDropdownMenuRadioGroup,
  AwDropdownMenuRadioItem,
  AwDropdownMenuSeparator,
  AwDropdownMenuShortcut,
  AwDropdownMenuSub,
  AwDropdownMenuSubContent,
  AwDropdownMenuSubTrigger,
  AwDropdownMenuTrigger,
} from "./AwDropdownMenu";

export const AwMenubar = ({ className, ...props }: MenubarPrimitive.Props) => {
  return (
    <MenubarPrimitive
      data-slot="menubar"
      className={cn(
        "flex h-9 items-center gap-1 rounded-md border p-1 shadow-xs",
        className,
      )}
      {...props}
    />
  );
};

export const AwMenubarMenu = (props: ComponentProps<typeof AwDropdownMenu>) => {
  return <AwDropdownMenu data-slot="menubar-menu" {...props} />;
};

export const AwMenubarGroup = (
  props: ComponentProps<typeof AwDropdownMenuGroup>,
) => {
  return <AwDropdownMenuGroup data-slot="menubar-group" {...props} />;
};

export const AwMenubarPortal = (
  props: ComponentProps<typeof AwDropdownMenuPortal>,
) => {
  return <AwDropdownMenuPortal data-slot="menubar-portal" {...props} />;
};

export const AwMenubarRadioGroup = (
  props: ComponentProps<typeof AwDropdownMenuRadioGroup>,
) => {
  return (
    <AwDropdownMenuRadioGroup data-slot="menubar-radio-group" {...props} />
  );
};

export const AwMenubarTrigger = ({
  className,
  ...props
}: ComponentProps<typeof AwDropdownMenuTrigger>) => {
  return (
    <AwDropdownMenuTrigger
      data-slot="menubar-trigger"
      className={cn(
        "flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-hidden select-none hover:bg-muted aria-expanded:bg-muted",
        className,
      )}
      {...props}
    />
  );
};

export const AwMenubarContent = ({
  className,
  align = "start",
  alignOffset = -4,
  sideOffset = 8,
  ...props
}: ComponentProps<typeof AwDropdownMenuContent>) => {
  return (
    <AwDropdownMenuContent
      data-slot="menubar-content"
      align={align}
      alignOffset={alignOffset}
      sideOffset={sideOffset}
      className={cn("w-auto min-w-48 rounded-md", className)}
      {...props}
    />
  );
};

export const AwMenubarItem = ({
  className,
  ...props
}: ComponentProps<typeof AwDropdownMenuItem>) => {
  return (
    <AwDropdownMenuItem
      data-slot="menubar-item"
      className={cn("gap-2 rounded-sm px-2 py-1.5 text-sm", className)}
      {...props}
    />
  );
};

export const AwMenubarCheckboxItem = ({
  className,
  ...props
}: ComponentProps<typeof AwDropdownMenuCheckboxItem>) => {
  return (
    <AwDropdownMenuCheckboxItem
      data-slot="menubar-checkbox-item"
      className={className}
      {...props}
    />
  );
};

export const AwMenubarRadioItem = ({
  className,
  ...props
}: ComponentProps<typeof AwDropdownMenuRadioItem>) => {
  return (
    <AwDropdownMenuRadioItem
      data-slot="menubar-radio-item"
      className={className}
      {...props}
    />
  );
};

export const AwMenubarLabel = ({
  className,
  ...props
}: ComponentProps<typeof AwDropdownMenuLabel>) => {
  return (
    <AwDropdownMenuLabel
      data-slot="menubar-label"
      className={className}
      {...props}
    />
  );
};

export const AwMenubarSeparator = ({
  className,
  ...props
}: ComponentProps<typeof AwDropdownMenuSeparator>) => {
  return (
    <AwDropdownMenuSeparator
      data-slot="menubar-separator"
      className={className}
      {...props}
    />
  );
};

export const AwMenubarShortcut = ({
  className,
  ...props
}: ComponentProps<typeof AwDropdownMenuShortcut>) => {
  return (
    <AwDropdownMenuShortcut
      data-slot="menubar-shortcut"
      className={className}
      {...props}
    />
  );
};

export const AwMenubarSub = (
  props: ComponentProps<typeof AwDropdownMenuSub>,
) => {
  return <AwDropdownMenuSub data-slot="menubar-sub" {...props} />;
};

export const AwMenubarSubTrigger = ({
  className,
  ...props
}: ComponentProps<typeof AwDropdownMenuSubTrigger>) => {
  return (
    <AwDropdownMenuSubTrigger
      data-slot="menubar-sub-trigger"
      className={className}
      {...props}
    />
  );
};

export const AwMenubarSubContent = ({
  className,
  ...props
}: ComponentProps<typeof AwDropdownMenuSubContent>) => {
  return (
    <AwDropdownMenuSubContent
      data-slot="menubar-sub-content"
      className={className}
      {...props}
    />
  );
};
