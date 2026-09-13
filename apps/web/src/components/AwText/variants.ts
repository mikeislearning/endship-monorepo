import { cva, VariantProps } from "class-variance-authority";

export const textVariants = cva("whitespace-pre-line", {
  variants: {
    variant: {
      title: "text-3xl leading-[1.875] font-semibold -tracking-[0.4px]",
      headerOne:
        "font-heading text-2xl leading-8 font-semibold tracking-[0.4px]",
      headerTwo: "font-heading text-xl leading-7 font-semibold tracking-normal",
      headerThree:
        "font-heading text-lg leading-[1.125] font-medium tracking-normal",
      lg: "text-base leading-6 tracking-normal",
      lgMedium: "text-base leading-6 font-medium tracking-normal",
      lgBold: "text-base leading-6 font-semibold tracking-normal",
      md: "text-sm leading-5 tracking-normal",
      mdMedium: "text-sm leading-5 font-medium tracking-normal",
      mdBold: "text-sm leading-5 font-semibold tracking-normal",
      sm: "text-xs leading-4 tracking-normal",
      smMedium: "text-xs leading-4 font-medium tracking-normal",
      smBold: "text-xs leading-4 font-semibold tracking-normal",
      button: "text-sm leading-none font-medium tracking-normal",
      smButton: "text-xs leading-none font-medium tracking-normal",
    },
  },
  defaultVariants: {
    variant: "md",
  },
});

export type TextVariantType = NonNullable<
  VariantProps<typeof textVariants>["variant"]
>;
