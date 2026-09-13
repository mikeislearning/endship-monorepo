import { InboxIcon, SearchIcon } from "lucide-react";

import { AwButton } from "@/components/AwButton/AwButton";
import {
  AwEmpty,
  AwEmptyContent,
  AwEmptyDescription,
  AwEmptyHeader,
  AwEmptyMedia,
  AwEmptyTitle,
} from "@/components/AwEmpty/AwEmpty";

export const EmptyDemo = () => {
  return (
    <div className="grid w-full gap-8">
      <AwEmpty>
        <AwEmptyHeader>
          <AwEmptyMedia>
            <InboxIcon className="size-10 text-muted-foreground" />
          </AwEmptyMedia>
          <AwEmptyTitle i18nKey="sandbox:empty.defaultTitle" />
          <AwEmptyDescription i18nKey="sandbox:empty.defaultDescription" />
        </AwEmptyHeader>
      </AwEmpty>
      <AwEmpty>
        <AwEmptyHeader>
          <AwEmptyMedia variant="icon">
            <SearchIcon />
          </AwEmptyMedia>
          <AwEmptyTitle i18nKey="sandbox:empty.iconTitle" />
          <AwEmptyDescription i18nKey="sandbox:empty.iconDescription" />
        </AwEmptyHeader>
      </AwEmpty>
      <AwEmpty>
        <AwEmptyHeader>
          <AwEmptyMedia>
            <InboxIcon className="size-10 text-muted-foreground" />
          </AwEmptyMedia>
          <AwEmptyTitle i18nKey="sandbox:empty.actionTitle" />
          <AwEmptyDescription i18nKey="sandbox:empty.actionDescription" />
        </AwEmptyHeader>
        <AwEmptyContent>
          <AwButton i18nKey="sandbox:empty.actionCta" />
        </AwEmptyContent>
      </AwEmpty>
    </div>
  );
};
