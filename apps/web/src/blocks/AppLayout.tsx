import { ReactNode } from "react";

import { AwSidebarInset, AwSidebarTrigger } from "@/components/AwSidebar";
import { cn } from "@/utils/tailwind";

type AppLayoutPropsType = {
  children: ReactNode;
  className?: string;
  hasSidebar?: boolean;
};

export const AppLayout = ({
  children,
  className,
  hasSidebar = true,
}: AppLayoutPropsType) => {
  return (
    <div className={cn("flex flex-1 flex-col gap-6 p-4 pt-7", className)}>
      <div className="inline-flex items-center justify-between">
        {hasSidebar && (
          <AwSidebarInset className="md:hidden">
            <AwSidebarTrigger className="-ml-1.5" />
          </AwSidebarInset>
        )}
      </div>
      {children}
    </div>
  );
};
