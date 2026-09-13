import { InfoIcon } from "lucide-react";

import { AwButton } from "@/components/AwButton/AwButton";
import { AwText } from "@/components/AwText/AwText";
import {
  AwTooltip,
  AwTooltipContent,
  AwTooltipTrigger,
} from "@/components/AwTooltip";

export const TooltipDemo = () => {
  return (
    <div className="flex flex-wrap items-start gap-4">
      <AwTooltip>
        <AwTooltipTrigger
          render={
            <AwButton variant="outline" i18nKey="sandbox:tooltip.default" />
          }
        />
        <AwTooltipContent i18nKey="sandbox:tooltip.content" />
      </AwTooltip>
      <div className="flex gap-2">
        {["top", "right", "bottom", "left"].map(side => (
          <AwTooltip key={side}>
            <AwTooltipTrigger
              render={<AwButton variant="outline" className="capitalize" />}>
              {side}
            </AwTooltipTrigger>
            <AwTooltipContent
              side={side as "top" | "right" | "bottom" | "left"}
              i18nKey="sandbox:tooltip.content"
            />
          </AwTooltip>
        ))}
      </div>
      <AwTooltip>
        <AwTooltipTrigger render={<AwButton variant="ghost" size="icon" />}>
          <InfoIcon />
          <AwText
            as="span"
            className="sr-only"
            i18nKey="sandbox:tooltip.info"
          />
        </AwTooltipTrigger>
        <AwTooltipContent i18nKey="sandbox:tooltip.extendedContent" />
      </AwTooltip>
    </div>
  );
};
