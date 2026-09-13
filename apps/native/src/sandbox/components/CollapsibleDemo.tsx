import { useState } from "react";
import { ChevronsUpDownIcon } from "lucide-react-native";

import { AnBox } from "@/components/AnBox";
import { AnButton } from "@/components/AnButton/AnButton";
import {
  AnCollapsible,
  AnCollapsibleContent,
  AnCollapsibleTrigger,
} from "@/components/AnCollapsible";
import { AnIcon } from "@/components/AnIcon";
import { AnText } from "@/components/AnText/AnText";

export const CollapsibleDemo = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AnCollapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full gap-2 md:w-[350px]">
      <AnBox className="flex-row items-center justify-between gap-4 pl-4">
        <AnText variant="mdMedium" className="line-clamp-1">
          @peduarte starred 3 repositories
        </AnText>
        <AnCollapsibleTrigger asChild>
          <AnButton variant="ghost" size="sm">
            <AnIcon as={ChevronsUpDownIcon} className="h-4 w-4" />
          </AnButton>
        </AnCollapsibleTrigger>
      </AnBox>
      <AnBox className="shadow-xs border-border rounded-md border px-4 py-2">
        <AnText>@radix-ui/primitives</AnText>
      </AnBox>
      <AnCollapsibleContent className="flex flex-col gap-2">
        <AnBox className="shadow-xs border-border rounded-md border px-4 py-2">
          <AnText>@radix-ui/colors</AnText>
        </AnBox>
        <AnBox className="shadow-xs border-border rounded-md border px-4 py-2">
          <AnText>@stitches/react</AnText>
        </AnBox>
      </AnCollapsibleContent>
    </AnCollapsible>
  );
};
