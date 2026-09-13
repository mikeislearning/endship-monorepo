import { InfoIcon } from "lucide-react-native";

import { AnBox } from "@/components/AnBox";
import { AnIcon } from "@/components/AnIcon";
import {
  AnTooltip,
  AnTooltipContent,
  AnTooltipTrigger,
} from "@/components/AnTooltip";

export const TooltipDemo = () => {
  return (
    <AnBox className="native:justify-center web:flex-row web:flex-wrap w-full items-center gap-2">
      <AnTooltip>
        <AnTooltipTrigger className="w-fit">
          <AnIcon as={InfoIcon} className="text-foreground size-6" />
        </AnTooltipTrigger>
        <AnTooltipContent i18nKey="sandbox:tooltip.content" />
      </AnTooltip>
    </AnBox>
  );
};
