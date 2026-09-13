import { ReactNode } from "react";
import { VariantProps } from "class-variance-authority";

import { textVariants } from "@/components/AwText/variants";
import { I18nKeyType } from "@/i18n";

import { DateOfBirthInputDemo } from "./blocks/DateOfBirthInputDemo";
import { ErrorFallbackDemo } from "./blocks/ErrorFallbackDemo";
import { AccordionDemo } from "./components/AccordionDemo";
import { AlertDemo } from "./components/AlertDemo";
import { AlertDialogDemo } from "./components/AlertDialogDemo";
import { AvatarDemo } from "./components/AvatarDemo";
import { BadgeDemo } from "./components/BadgeDemo";
import { BreadcrumbDemo } from "./components/BreadcrumbDemo";
import { ButtonDemo } from "./components/ButtonDemo";
import { CardDemo } from "./components/CardDemo";
import { CheckboxDemo } from "./components/CheckboxDemo";
import { DatePickerDemo } from "./components/DatePickerDemo";
import { DialogDemo } from "./components/DialogDemo";
import { DropdownMenuDemo } from "./components/DropdownMenuDemo";
import { EmptyDemo } from "./components/EmptyDemo";
import { FormDemo } from "./components/FormDemo";
import { HoverCardDemo } from "./components/HoverCardDemo";
import { InputDemo } from "./components/InputDemo";
import { ItemDemo } from "./components/ItemDemo";
import { LabelDemo } from "./components/LabelDemo";
import { LoadingSpinnerDemo } from "./components/LoadingSpinnerDemo";
import { MenubarDemo } from "./components/MenubarDemo";
import { NavigationMenuDemo } from "./components/NavigationMenuDemo";
import { OTPInputDemo } from "./components/OTPInputDemo";
import { PaginationDemo } from "./components/PaginationDemo";
import { ProgressDemo } from "./components/ProgressDemo";
import { RadioGroupDemo } from "./components/RadioGroupDemo";
import { ScrollAreaDemo } from "./components/ScrollAreaDemo";
import { SelectDemo } from "./components/SelectDemo";
import { SeparatorDemo } from "./components/SeparatorDemo";
import { SheetDemo } from "./components/SheetDemo";
import { SkeletonDemo } from "./components/SkeletonDemo";
import { SliderDemo } from "./components/SliderDemo";
import { SonnerDemo } from "./components/SonnerDemo";
import { SwitchDemo } from "./components/SwitchDemo";
import { TableDemo } from "./components/TableDemo";
import { TabsDemo } from "./components/TabsDemo";
import { TextareaDemo } from "./components/TextareaDemo";
import { TextDemo } from "./components/TextDemo";
import { TimePickerDemo } from "./components/TimePickerDemo";
import { ToggleDemo } from "./components/ToggleDemo";
import { TooltipDemo } from "./components/TooltipDemo";

export const getComponentId = (name: string) => {
  // Convert title case to kebab case
  return name
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase()
    .replace(/ /g, "-");
};

export const COMPONENTS: {
  name: string;
  descriptionI18nKey?: I18nKeyType;
  DemoComponent: () => ReactNode;
}[] = [
  {
    name: "Accordion",
    descriptionI18nKey: "sandbox:accordion.blurb",
    DemoComponent: AccordionDemo,
  },
  {
    name: "Alert",
    descriptionI18nKey: "sandbox:alert.blurb",
    DemoComponent: AlertDemo,
  },
  {
    name: "Alert Dialog",
    descriptionI18nKey: "sandbox:alertDialog.blurb",
    DemoComponent: AlertDialogDemo,
  },
  {
    name: "Avatar",
    descriptionI18nKey: "sandbox:avatar.blurb",
    DemoComponent: AvatarDemo,
  },
  {
    name: "Badge",
    descriptionI18nKey: "sandbox:badge.blurb",
    DemoComponent: BadgeDemo,
  },
  {
    name: "Breadcrumb",
    descriptionI18nKey: "sandbox:breadcrumb.blurb",
    DemoComponent: BreadcrumbDemo,
  },
  {
    name: "Button",
    descriptionI18nKey: "sandbox:button.blurb",
    DemoComponent: ButtonDemo,
  },
  {
    name: "Card",
    descriptionI18nKey: "sandbox:card.blurb",
    DemoComponent: CardDemo,
  },
  {
    name: "Checkbox",
    descriptionI18nKey: "sandbox:checkbox.blurb",
    DemoComponent: CheckboxDemo,
  },
  {
    name: "Date Picker",
    descriptionI18nKey: "sandbox:datePicker.blurb",
    DemoComponent: DatePickerDemo,
  },
  {
    name: "Dialog",
    descriptionI18nKey: "sandbox:dialog.blurb",
    DemoComponent: DialogDemo,
  },
  {
    name: "Dropdown Menu",
    descriptionI18nKey: "sandbox:dropdownMenu.blurb",
    DemoComponent: DropdownMenuDemo,
  },
  {
    name: "Empty",
    descriptionI18nKey: "sandbox:empty.blurb",
    DemoComponent: EmptyDemo,
  },
  {
    name: "Form",
    descriptionI18nKey: "sandbox:form.blurb",
    DemoComponent: FormDemo,
  },
  {
    name: "Hover Card",
    descriptionI18nKey: "sandbox:hoverCard.blurb",
    DemoComponent: HoverCardDemo,
  },
  {
    name: "Input",
    descriptionI18nKey: "sandbox:input.blurb",
    DemoComponent: InputDemo,
  },
  {
    name: "Item",
    descriptionI18nKey: "sandbox:item.blurb",
    DemoComponent: ItemDemo,
  },
  {
    name: "Label",
    descriptionI18nKey: "sandbox:label.blurb",
    DemoComponent: LabelDemo,
  },
  {
    name: "Loading Spinner",
    descriptionI18nKey: "sandbox:loadingSpinner.blurb",
    DemoComponent: LoadingSpinnerDemo,
  },
  {
    name: "Menubar",
    descriptionI18nKey: "sandbox:menubar.blurb",
    DemoComponent: MenubarDemo,
  },
  {
    name: "Navigation Menu",
    descriptionI18nKey: "sandbox:navigationMenu.blurb",
    DemoComponent: NavigationMenuDemo,
  },
  {
    name: "OTP Input",
    descriptionI18nKey: "sandbox:otpInput.blurb",
    DemoComponent: OTPInputDemo,
  },
  {
    name: "Pagination",
    descriptionI18nKey: "sandbox:pagination.blurb",
    DemoComponent: PaginationDemo,
  },
  {
    name: "Progress",
    descriptionI18nKey: "sandbox:progress.blurb",
    DemoComponent: ProgressDemo,
  },
  {
    name: "Radio Group",
    descriptionI18nKey: "sandbox:radioGroup.blurb",
    DemoComponent: RadioGroupDemo,
  },
  {
    name: "Scroll Area",
    descriptionI18nKey: "sandbox:scrollArea.blurb",
    DemoComponent: ScrollAreaDemo,
  },
  {
    name: "Select",
    descriptionI18nKey: "sandbox:select.blurb",
    DemoComponent: SelectDemo,
  },
  {
    name: "Separator",
    descriptionI18nKey: "sandbox:separator.blurb",
    DemoComponent: SeparatorDemo,
  },
  {
    name: "Sheet",
    descriptionI18nKey: "sandbox:sheet.blurb",
    DemoComponent: SheetDemo,
  },
  {
    name: "Skeleton",
    descriptionI18nKey: "sandbox:skeleton.blurb",
    DemoComponent: SkeletonDemo,
  },
  {
    name: "Slider",
    descriptionI18nKey: "sandbox:slider.blurb",
    DemoComponent: SliderDemo,
  },
  {
    name: "Sonner",
    descriptionI18nKey: "sandbox:sonner.blurb",
    DemoComponent: SonnerDemo,
  },
  {
    name: "Switch",
    descriptionI18nKey: "sandbox:switch.blurb",
    DemoComponent: SwitchDemo,
  },
  {
    name: "Table",
    descriptionI18nKey: "sandbox:table.blurb",
    DemoComponent: TableDemo,
  },
  {
    name: "Tabs",
    descriptionI18nKey: "sandbox:tabs.blurb",
    DemoComponent: TabsDemo,
  },
  {
    name: "Text",
    descriptionI18nKey: "sandbox:text.blurb",
    DemoComponent: TextDemo,
  },
  {
    name: "Textarea",
    descriptionI18nKey: "sandbox:textarea.blurb",
    DemoComponent: TextareaDemo,
  },
  {
    name: "Time Picker",
    descriptionI18nKey: "sandbox:timePicker.blurb",
    DemoComponent: TimePickerDemo,
  },
  {
    name: "Toggle",
    descriptionI18nKey: "sandbox:toggle.blurb",
    DemoComponent: ToggleDemo,
  },
  {
    name: "Tooltip",
    descriptionI18nKey: "sandbox:tooltip.blurb",
    DemoComponent: TooltipDemo,
  },
];

export const BLOCKS: {
  name: string;
  descriptionI18nKey?: I18nKeyType;
  DemoComponent: () => ReactNode;
}[] = [
  {
    name: "Date of Birth Input",
    descriptionI18nKey: "sandbox:dateOfBirthInput.blurb",
    DemoComponent: DateOfBirthInputDemo,
  },
  {
    name: "Error Fallback",
    descriptionI18nKey: "sandbox:errorFallback.blurb",
    DemoComponent: ErrorFallbackDemo,
  },
];

export const THEME_COLORS = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "border",
  "input",
  "ring",
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
  "sidebar",
  "sidebar-foreground",
  "sidebar-primary",
  "sidebar-primary-foreground",
  "sidebar-accent",
  "sidebar-accent-foreground",
  "sidebar-border",
  "sidebar-ring",
];

export const TEXT_VARIANTS: {
  name: string;
  variant: VariantProps<typeof textVariants>["variant"];
}[] = [
  { name: "Title", variant: "title" },
  { name: "Header 1", variant: "headerOne" },
  { name: "Header 2", variant: "headerTwo" },
  { name: "Header 3", variant: "headerThree" },
  { name: "Large", variant: "lg" },
  { name: "Large (Medium)", variant: "lgMedium" },
  { name: "Large (Bold)", variant: "lgBold" },
  { name: "Medium", variant: "md" },
  { name: "Medium (Medium)", variant: "mdMedium" },
  { name: "Medium (Bold)", variant: "mdBold" },
  { name: "Small", variant: "sm" },
  { name: "Small (Medium)", variant: "smMedium" },
  { name: "Small (Bold)", variant: "smBold" },
];
