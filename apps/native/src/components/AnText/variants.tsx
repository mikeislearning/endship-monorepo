import { cva, VariantProps } from "class-variance-authority";
import { Role } from "react-native";

export const textVariants = cva(
  "font-primary text-foreground web:select-text whitespace-pre-line text-base antialiased",
  {
    variants: {
      variant: {
        title:
          "font-primary-semibold text-3xl leading-[30px] -tracking-[0.4px]",
        headerOne: "font-primary-semibold text-2xl leading-8 tracking-[0.4px]",
        headerTwo: "font-primary-semibold text-xl leading-7 tracking-normal",
        headerThree: "font-primary-medium text-lg leading-7 tracking-normal",
        lg: "font-primary text-base leading-6 tracking-normal",
        lgMedium: "font-primary-medium text-base leading-6 tracking-normal",
        lgBold: "font-primary-semibold text-base leading-6 tracking-normal",
        md: "font-primary text-sm leading-5 tracking-normal",
        mdMedium: "font-primary-medium text-sm leading-5 tracking-normal",
        mdBold: "font-primary-semibold text-sm leading-5 tracking-normal",
        sm: "font-primary text-xs leading-4 tracking-normal",
        smMedium: "font-primary-medium text-xs leading-4 tracking-normal",
        smBold: "font-primary-semibold text-xs leading-4 tracking-normal",
        button: "font-primary-medium text-sm leading-none tracking-normal",
        smButton: "font-primary-medium text-xs leading-none tracking-normal",
      },
    },
    defaultVariants: {
      variant: "md",
    },
  },
);

export type TextVariantType = NonNullable<
  VariantProps<typeof textVariants>["variant"]
>;

export const ROLE: Partial<Record<TextVariantType, Role>> = {
  title: "heading",
  headerOne: "heading",
  headerTwo: "heading",
  headerThree: "heading",
};

export const ARIA_LEVEL: Partial<Record<TextVariantType, string>> = {
  title: "1",
  headerOne: "2",
  headerTwo: "3",
  headerThree: "4",
};
