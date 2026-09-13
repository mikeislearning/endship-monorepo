import { ReactNode } from "react";

import { I18nKeyType } from "@/i18n";

import { AccordionDemo } from "./components/AccordionDemo";
import { AlertDemo } from "./components/AlertDemo";
import { AlertDialogDemo } from "./components/AlertDialogDemo";
import { AvatarDemo } from "./components/AvatarDemo";
import { BadgeDemo } from "./components/BadgeDemo";
import { BottomSheetModalDemo } from "./components/BottomSheetModalDemo";
import { ButtonDemo } from "./components/ButtonDemo";
import { CardDemo } from "./components/CardDemo";
import { CollapsibleDemo } from "./components/CollapsibleDemo";
import { DialogDemo } from "./components/DialogDemo";
import { DropdownMenuDemo } from "./components/DropdownMenuDemo";
import { IconDemo } from "./components/IconDemo";
import { LabelDemo } from "./components/LabelDemo";
import { LoadingSpinnerDemo } from "./components/LoadingSpinnerDemo";
import { PopoverDemo } from "./components/PopoverDemo";
import { ProgressDemo } from "./components/ProgressDemo";
import { SegmentedControlDemo } from "./components/SegmentedControlDemo";
import { SeparatorDemo } from "./components/SeparatorDemo";
import { SkeletonDemo } from "./components/SkeletonDemo";
import { TabsDemo } from "./components/TabsDemo";
import { TextDemo } from "./components/TextDemo";
import { ToastDemo } from "./components/ToastDemo";
import { TooltipDemo } from "./components/TooltipDemo";

export const COMPONENTS: {
  i18nKey: I18nKeyType;
  descriptionI18nKey?: I18nKeyType;
  DemoComponent: () => ReactNode;
}[] = [
  {
    i18nKey: "sandbox:accordion.name",
    descriptionI18nKey: "sandbox:accordion.blurb",
    DemoComponent: AccordionDemo,
  },
  {
    i18nKey: "sandbox:alert.name",
    descriptionI18nKey: "sandbox:alert.blurb",
    DemoComponent: AlertDemo,
  },
  {
    i18nKey: "sandbox:alertDialog.name",
    descriptionI18nKey: "sandbox:alertDialog.blurb",
    DemoComponent: AlertDialogDemo,
  },
  {
    i18nKey: "sandbox:avatar.name",
    descriptionI18nKey: "sandbox:avatar.blurb",
    DemoComponent: AvatarDemo,
  },
  {
    i18nKey: "sandbox:badge.name",
    descriptionI18nKey: "sandbox:badge.blurb",
    DemoComponent: BadgeDemo,
  },
  {
    i18nKey: "sandbox:bottomSheetModal.name",
    descriptionI18nKey: "sandbox:bottomSheetModal.blurb",
    DemoComponent: BottomSheetModalDemo,
  },
  {
    i18nKey: "sandbox:button.name",
    descriptionI18nKey: "sandbox:button.blurb",
    DemoComponent: ButtonDemo,
  },
  {
    i18nKey: "sandbox:card.name",
    descriptionI18nKey: "sandbox:card.blurb",
    DemoComponent: CardDemo,
  },
  {
    i18nKey: "sandbox:collapsible.name",
    descriptionI18nKey: "sandbox:collapsible.blurb",
    DemoComponent: CollapsibleDemo,
  },
  {
    i18nKey: "sandbox:dialog.name",
    descriptionI18nKey: "sandbox:dialog.blurb",
    DemoComponent: DialogDemo,
  },
  {
    i18nKey: "sandbox:dropdownMenu.name",
    descriptionI18nKey: "sandbox:dropdownMenu.blurb",
    DemoComponent: DropdownMenuDemo,
  },
  {
    i18nKey: "sandbox:icon.name",
    descriptionI18nKey: "sandbox:icon.blurb",
    DemoComponent: IconDemo,
  },
  {
    i18nKey: "sandbox:label.name",
    descriptionI18nKey: "sandbox:label.blurb",
    DemoComponent: LabelDemo,
  },
  {
    i18nKey: "sandbox:loadingSpinner.name",
    descriptionI18nKey: "sandbox:loadingSpinner.blurb",
    DemoComponent: LoadingSpinnerDemo,
  },
  {
    i18nKey: "sandbox:popover.name",
    descriptionI18nKey: "sandbox:popover.blurb",
    DemoComponent: PopoverDemo,
  },
  {
    i18nKey: "sandbox:progress.name",
    descriptionI18nKey: "sandbox:progress.blurb",
    DemoComponent: ProgressDemo,
  },
  {
    i18nKey: "sandbox:segmentedControl.name",
    descriptionI18nKey: "sandbox:segmentedControl.blurb",
    DemoComponent: SegmentedControlDemo,
  },
  {
    i18nKey: "sandbox:separator.name",
    descriptionI18nKey: "sandbox:separator.blurb",
    DemoComponent: SeparatorDemo,
  },
  {
    i18nKey: "sandbox:skeleton.name",
    descriptionI18nKey: "sandbox:skeleton.blurb",
    DemoComponent: SkeletonDemo,
  },
  {
    i18nKey: "sandbox:tabs.name",
    descriptionI18nKey: "sandbox:tabs.blurb",
    DemoComponent: TabsDemo,
  },
  {
    i18nKey: "sandbox:text.name",
    descriptionI18nKey: "sandbox:text.blurb",
    DemoComponent: TextDemo,
  },
  {
    i18nKey: "sandbox:toast.name",
    descriptionI18nKey: "sandbox:toast.blurb",
    DemoComponent: ToastDemo,
  },
  {
    i18nKey: "sandbox:tooltip.name",
    descriptionI18nKey: "sandbox:tooltip.blurb",
    DemoComponent: TooltipDemo,
  },
];
