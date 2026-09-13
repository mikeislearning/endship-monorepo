import { ComponentProps, ReactNode } from "react";
import { Command as CommandPrimitive } from "cmdk";

import { I18nKeyType } from "@/i18n";
import { cn } from "@/utils/tailwind";

import {
  AwDialog,
  AwDialogContent,
  AwDialogDescription,
  AwDialogHeader,
  AwDialogTitle,
} from "./AwDialog";
import { AwSkeleton } from "./AwSkeleton";
import { textVariants } from "./AwText/variants";
import { BaseTextInput } from "./AwTextInput/BaseTextInput";

export const AwCommand = ({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive>) => {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
        className,
      )}
      {...props}
    />
  );
};

type AwCommandDialogPropsType = Omit<
  ComponentProps<typeof AwDialog>,
  "children"
> & {
  children?: ReactNode;
  titleI18nKey?: I18nKeyType;
  titleI18nOptions?: object;
  descriptionI18nKey?: I18nKeyType;
  descriptionI18nOptions?: object;
};

export const AwCommandDialog = ({
  titleI18nKey,
  titleI18nOptions,
  descriptionI18nKey,
  descriptionI18nOptions,
  children,
  ...props
}: AwCommandDialogPropsType) => {
  return (
    <AwDialog {...props}>
      <AwDialogHeader className="sr-only">
        {titleI18nKey && (
          <AwDialogTitle
            i18nKey={titleI18nKey}
            i18nOptions={titleI18nOptions}
          />
        )}
        {descriptionI18nKey && (
          <AwDialogDescription
            i18nKey={descriptionI18nKey}
            i18nOptions={descriptionI18nOptions}
          />
        )}
      </AwDialogHeader>
      <AwDialogContent className="overflow-hidden p-0">
        <AwCommand className="**:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5 **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-muted-foreground **:[[cmdk-group]]:px-2 **:[[cmdk-input]]:h-12 **:[[cmdk-item]]:px-2 **:[[cmdk-item]]:py-3">
          {children}
        </AwCommand>
      </AwDialogContent>
    </AwDialog>
  );
};

type AwCommandInputPropsType = ComponentProps<typeof CommandPrimitive.Input> & {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  placeholderI18nKey?: I18nKeyType;
  placeholderI18nOptions?: object;
};

export const AwCommandInput = ({
  ref,
  placeholderI18nKey,
  placeholderI18nOptions,
  onValueChange,
  popover,
  ...props
}: AwCommandInputPropsType) => {
  return (
    <div data-slot="command-input-wrapper" className="flex flex-1 items-center">
      <CommandPrimitive.Input asChild data-slot="command-input">
        <BaseTextInput
          ref={ref}
          i18nKey={placeholderI18nKey}
          i18nOptions={placeholderI18nOptions}
          popover={popover === "hint" ? undefined : popover}
          {...props}
          onChange={e => onValueChange?.(e.target.value)}
        />
      </CommandPrimitive.Input>
    </div>
  );
};

export const AwCommandList = ({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.List>) => {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        "max-h-75 scroll-py-1 overflow-x-hidden overflow-y-auto",
        className,
      )}
      {...props}
    />
  );
};

export const AwCommandEmpty = ({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.Empty>) => {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className={cn("pt-4 pb-6 text-center", textVariants(), className)}
      {...props}
    />
  );
};

export const AwCommandGroup = ({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.Group>) => {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "overflow-hidden p-1 text-foreground **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
};

export const AwCommandSeparator = ({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.Separator>) => {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("-mx-1 h-px bg-border", className)}
      {...props}
    />
  );
};

export const AwCommandItem = ({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.Item>) => {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        textVariants(),
        className,
      )}
      {...props}
    />
  );
};

export const AwCommandShortcut = ({
  className,
  ...props
}: ComponentProps<"span">) => {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        textVariants({ variant: "sm" }),
        "ml-auto tracking-widest text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
};

export const AwCommandLoading = () => {
  return (
    <CommandPrimitive.Loading>
      <div className="p-1">
        <AwSkeleton className="h-8 w-full" />
      </div>
    </CommandPrimitive.Loading>
  );
};
