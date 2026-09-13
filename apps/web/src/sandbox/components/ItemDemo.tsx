import { FileTextIcon, ImageIcon, MailIcon, StarIcon } from "lucide-react";

import { AwBadge } from "@/components/AwBadge/AwBadge";
import {
  AwItem,
  AwItemActions,
  AwItemContent,
  AwItemDescription,
  AwItemGroup,
  AwItemMedia,
  AwItemSeparator,
  AwItemTitle,
} from "@/components/AwItem/AwItem";

export const ItemDemo = () => {
  return (
    <div className="grid w-full max-w-xl gap-8">
      <AwItemGroup>
        <AwItem>
          <AwItemMedia variant="icon">
            <FileTextIcon />
          </AwItemMedia>
          <AwItemContent>
            <AwItemTitle i18nKey="sandbox:item.secondTitle" />
            <AwItemDescription i18nKey="sandbox:item.secondDescription" />
          </AwItemContent>
        </AwItem>
      </AwItemGroup>

      <AwItemGroup>
        <AwItem variant="outline">
          <AwItemMedia variant="icon">
            <MailIcon />
          </AwItemMedia>
          <AwItemContent>
            <AwItemTitle i18nKey="sandbox:item.outlineTitle" />
            <AwItemDescription i18nKey="sandbox:item.outlineDescription" />
          </AwItemContent>
          <AwItemActions>
            <AwBadge variant="secondary" i18nKey="sandbox:item.badgeNew" />
          </AwItemActions>
        </AwItem>
        <AwItem variant="muted">
          <AwItemMedia variant="icon">
            <StarIcon />
          </AwItemMedia>
          <AwItemContent>
            <AwItemTitle i18nKey="sandbox:item.mutedTitle" />
            <AwItemDescription i18nKey="sandbox:item.mutedDescription" />
          </AwItemContent>
        </AwItem>
      </AwItemGroup>

      <AwItemGroup>
        <AwItem size="sm" variant="outline">
          <AwItemMedia variant="icon">
            <MailIcon />
          </AwItemMedia>
          <AwItemContent>
            <AwItemTitle i18nKey="sandbox:item.smallTitle" />
          </AwItemContent>
        </AwItem>
        <AwItemSeparator />
        <AwItem size="xs" variant="outline">
          <AwItemMedia variant="icon">
            <FileTextIcon />
          </AwItemMedia>
          <AwItemContent>
            <AwItemTitle i18nKey="sandbox:item.extraSmallTitle" />
          </AwItemContent>
        </AwItem>
      </AwItemGroup>

      <AwItemGroup>
        <AwItem variant="outline">
          <AwItemMedia variant="image">
            <ImageIcon className="size-full text-muted-foreground" />
          </AwItemMedia>
          <AwItemContent>
            <AwItemTitle i18nKey="sandbox:item.imageTitle" />
            <AwItemDescription i18nKey="sandbox:item.imageDescription" />
          </AwItemContent>
        </AwItem>
      </AwItemGroup>
    </div>
  );
};
