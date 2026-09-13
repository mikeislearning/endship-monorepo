import { ComponentProps } from "react";
import { type ViewProps } from "react-native";

import { TextClassContext } from "@/context/TextClassContext";
import { cn } from "@/utils/tailwind";

import { AnBox } from "./AnBox";
import { AnText } from "./AnText/AnText";

type AnCardPropsType = ViewProps;

export const AnCard = ({ className, ...props }: AnCardPropsType) => {
  return (
    <TextClassContext.Provider value="text-card-foreground">
      <AnBox
        className={cn(
          "border-border bg-card flex flex-col gap-6 rounded-xl border py-6 shadow-sm shadow-black/5",
          className,
        )}
        {...props}
      />
    </TextClassContext.Provider>
  );
};

type AnCardHeaderPropsType = ViewProps;

export const AnCardHeader = ({
  className,
  ...props
}: AnCardHeaderPropsType) => {
  return (
    <AnBox className={cn("flex flex-col gap-1.5 px-6", className)} {...props} />
  );
};

type AnCardTitlePropsType = ComponentProps<typeof AnText>;

export const AnCardTitle = ({
  className,
  variant = "headerOne",
  ...props
}: AnCardTitlePropsType) => {
  return (
    <AnText
      role="heading"
      aria-level={3}
      variant={variant}
      className={cn("leading-tight", className)}
      {...props}
    />
  );
};

type AnCardDescriptionPropsType = ComponentProps<typeof AnText>;

export const AnCardDescription = ({
  className,
  variant = "md",
  ...props
}: AnCardDescriptionPropsType) => {
  return (
    <AnText
      variant={variant}
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  );
};

type AnCardContentPropsType = ViewProps;

export const AnCardContent = ({
  className,
  ...props
}: AnCardContentPropsType) => {
  return <AnBox className={cn("px-6", className)} {...props} />;
};

type AnCardFooterPropsType = ViewProps;

export const AnCardFooter = ({
  className,
  ...props
}: AnCardFooterPropsType) => {
  return (
    <AnBox
      className={cn("flex flex-row items-center px-6", className)}
      {...props}
    />
  );
};
