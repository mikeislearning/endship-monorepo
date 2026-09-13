import {
  AwAvatar,
  AwAvatarFallback,
  AwAvatarImage,
} from "@/components/AwAvatar";
import { AwButton } from "@/components/AwButton/AwButton";
import {
  AwHoverCard,
  AwHoverCardContent,
  AwHoverCardTrigger,
} from "@/components/AwHoverCard";
import { AwText } from "@/components/AwText/AwText";

export const HoverCardDemo = () => {
  return (
    <AwHoverCard>
      <AwHoverCardTrigger>
        <AwButton variant="link" i18nKey="sandbox:hoverCard.trigger" />
      </AwHoverCardTrigger>
      <AwHoverCardContent className="w-80" side="right">
        <div className="flex justify-between gap-4">
          <AwAvatar>
            <AwAvatarImage src="https://github.com/mindsea.png" />
            <AwAvatarFallback>MS</AwAvatarFallback>
          </AwAvatar>
          <div className="flex flex-col gap-1">
            <AwText variant="mdBold" i18nKey="sandbox:hoverCard.title" />
            <AwText
              i18nKey="sandbox:hoverCard.description"
              className="text-sm text-muted-foreground"
            />
          </div>
        </div>
      </AwHoverCardContent>
    </AwHoverCard>
  );
};
