import { ComponentProps, useContext } from "react";
import type { LucideIcon } from "lucide-react-native";
import { type ViewProps } from "react-native";

import { TextClassContext } from "@/context/TextClassContext";
import { cn } from "@/utils/tailwind";

import { AnBox } from "./AnBox";
import { AnIcon } from "./AnIcon";
import { AnText } from "./AnText/AnText";

type AnAlertPropsType = ViewProps & {
  icon: LucideIcon;
  variant?: "default" | "destructive";
  iconClassName?: string;
};

export const AnAlert = ({
  className,
  variant,
  children,
  icon,
  iconClassName,
  ...props
}: AnAlertPropsType) => {
  return (
    <TextClassContext.Provider
      value={cn(
        "text-foreground text-sm",
        variant === "destructive" && "text-destructive",
        className,
      )}>
      <AnBox
        role="alert"
        className={cn(
          "border-border bg-card relative w-full rounded-lg border px-4 pb-2 pt-3.5",
          className,
        )}
        {...props}>
        <AnBox className="absolute left-3.5 top-[15px]">
          <AnIcon
            as={icon}
            className={cn(
              "size-4",
              variant === "destructive" && "text-destructive",
              iconClassName,
            )}
          />
        </AnBox>
        {children}
      </AnBox>
    </TextClassContext.Provider>
  );
};

type AnAlertTitlePropsType = ComponentProps<typeof AnText>;

export const AnAlertTitle = ({
  className,
  ...props
}: AnAlertTitlePropsType) => {
  return (
    <AnText
      className={cn(
        "font-primary-medium mb-1 ml-0.5 min-h-4 pl-6 leading-tight tracking-tight",
        className,
      )}
      {...props}
    />
  );
};

type AnAlertDescriptionPropsType = ComponentProps<typeof AnText>;

export const AnAlertDescription = ({
  className,
  ...props
}: AnAlertDescriptionPropsType) => {
  const textClass = useContext(TextClassContext);
  return (
    <AnText
      className={cn(
        "text-muted-foreground ml-0.5 pb-1.5 pl-6 text-sm leading-relaxed",
        textClass?.includes("text-destructive") && "text-destructive/90",
        className,
      )}
      {...props}
    />
  );
};
