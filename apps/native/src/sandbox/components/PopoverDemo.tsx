import { AnBox } from "@/components/AnBox";
import { AnButton } from "@/components/AnButton/AnButton";
import {
  AnPopover,
  AnPopoverContent,
  AnPopoverTrigger,
} from "@/components/AnPopover";
import { AnText } from "@/components/AnText/AnText";

export const PopoverDemo = () => {
  return (
    <AnBox className="native:justify-center web:flex-row items-center">
      <AnPopover>
        <AnPopoverTrigger asChild>
          <AnButton
            variant="outline"
            className="web:w-fit"
            i18nKey="sandbox:popover.trigger"
          />
        </AnPopoverTrigger>
        <AnPopoverContent>
          <AnText variant="mdMedium" i18nKey="sandbox:popover.title" />
          <AnText
            variant="sm"
            className="text-muted-foreground mt-1"
            i18nKey="sandbox:popover.description"
          />
        </AnPopoverContent>
      </AnPopover>
    </AnBox>
  );
};
