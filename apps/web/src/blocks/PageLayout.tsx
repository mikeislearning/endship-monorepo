import { ReactElement, ReactNode } from "react";

import { AwSidebarInset, AwSidebarTrigger } from "@/components/AwSidebar";
import { AwText } from "@/components/AwText/AwText";
import { I18nKeyType } from "@/i18n";
import { cn } from "@/utils/tailwind";

type PageLayoutPropsType = {
  titleI18nKey?: I18nKeyType;
  titleI18nOptions?: object;
  actionButtonComponent?: ReactElement | null;
  children: ReactNode;
  className?: string;
  hasMenu?: boolean;
};

export const PageLayout = ({
  titleI18nKey,
  titleI18nOptions,
  actionButtonComponent = null,
  children,
  className,
  hasMenu = true,
}: PageLayoutPropsType) => {
  return (
    <div className={cn("flex flex-1 flex-col gap-6 p-4 pt-7", className)}>
      <div className="inline-flex items-center justify-between">
        <div className="inline-flex h-9 items-center gap-2">
          {hasMenu && (
            <AwSidebarInset className="md:hidden">
              <AwSidebarTrigger className="-ml-1.5" />
            </AwSidebarInset>
          )}
          <AwText
            variant="headerOne"
            i18nKey={titleI18nKey}
            i18nOptions={titleI18nOptions}
          />
        </div>
        {actionButtonComponent}
      </div>
      {children}
    </div>
  );
};
