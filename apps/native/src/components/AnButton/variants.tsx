import { cva, VariantProps } from "class-variance-authority";
import { Platform } from "react-native";

import { cn } from "@/utils/tailwind";

export const buttonVariants = cva(
  cn(
    "group relative shrink-0 flex-row items-center justify-center gap-2 rounded-md shadow-none",
    Platform.select({
      web: "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive focus-visible:ring-ring/50 focus-visible:border-ring whitespace-nowrap outline-none transition-all focus-visible:ring-[3px] disabled:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    }),
  ),
  {
    variants: {
      variant: {
        default: cn(
          "active:bg-primary/90 bg-primary shadow-sm shadow-black/5",
          Platform.select({ web: "hover:bg-primary/90" }),
        ),
        destructive: cn(
          "active:bg-destructive/90 dark:bg-destructive/60 bg-destructive shadow-sm shadow-black/5",
          Platform.select({
            web: "hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
          }),
        ),
        outline: cn(
          "dark:active:bg-input/50 dark:bg-input/30 border-border bg-background active:bg-accent dark:border-input border shadow-sm shadow-black/5",
          Platform.select({
            web: "dark:hover:bg-input/50 hover:bg-accent",
          }),
        ),
        secondary: cn(
          "active:bg-secondary/80 bg-secondary shadow-sm shadow-black/5",
          Platform.select({ web: "hover:bg-secondary/80" }),
        ),
        ghost: cn(
          "dark:active:bg-accent/50 active:bg-accent",
          Platform.select({ web: "dark:hover:bg-accent/50 hover:bg-accent" }),
        ),
        link: "",
      },
      size: {
        default: cn(
          "h-10 px-4 py-2 sm:h-9",
          Platform.select({ web: "has-[>svg]:px-3" }),
        ),
        sm: cn(
          "h-9 gap-1.5 rounded-md px-3 sm:h-8",
          Platform.select({ web: "has-[>svg]:px-2.5" }),
        ),
        lg: cn(
          "h-11 rounded-md px-6 sm:h-10",
          Platform.select({ web: "has-[>svg]:px-4" }),
        ),
        icon: "h-10 w-10 sm:h-9 sm:w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export const buttonTextVariants = cva(
  cn(
    "font-primary-medium text-foreground text-sm",
    Platform.select({ web: "pointer-events-none transition-colors" }),
  ),
  {
    variants: {
      variant: {
        default: "text-primary-foreground",
        destructive: "text-white",
        outline:
          "group-active:text-accent-foreground web:group-hover:text-accent-foreground",
        secondary: "text-secondary-foreground",
        ghost: "group-active:text-accent-foreground",
        link: "native:border-b native:border-primary text-primary web:underline underline-offset-4",
      },
      size: {
        default: "",
        sm: "",
        lg: "",
        icon: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonVariantType = VariantProps<typeof buttonVariants>["variant"];
