import {
  AwBreadcrumb,
  AwBreadcrumbEllipsis,
  AwBreadcrumbItem,
  AwBreadcrumbLink,
  AwBreadcrumbList,
  AwBreadcrumbPage,
  AwBreadcrumbSeparator,
} from "@/components/AwBreadcrumb";
import {
  AwDropdownMenu,
  AwDropdownMenuContent,
  AwDropdownMenuItem,
  AwDropdownMenuTrigger,
} from "@/components/AwDropdownMenu";

export const BreadcrumbDemo = () => {
  return (
    <AwBreadcrumb>
      <AwBreadcrumbList>
        <AwBreadcrumbItem>
          <AwBreadcrumbLink href="/" i18nKey="common:home" />
        </AwBreadcrumbItem>
        <AwBreadcrumbSeparator />
        <AwBreadcrumbItem>
          <AwDropdownMenu>
            <AwDropdownMenuTrigger className="flex items-center gap-1">
              <AwBreadcrumbEllipsis className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </AwDropdownMenuTrigger>
            <AwDropdownMenuContent align="start">
              <AwDropdownMenuItem i18nKey="sandbox:navigationMenu.documentation" />
              <AwDropdownMenuItem i18nKey="sandbox:theme.title" />
            </AwDropdownMenuContent>
          </AwDropdownMenu>
        </AwBreadcrumbItem>
        <AwBreadcrumbSeparator />
        <AwBreadcrumbItem>
          <AwBreadcrumbLink
            href="/docs/components"
            i18nKey="sandbox:components.title"
          />
        </AwBreadcrumbItem>
        <AwBreadcrumbSeparator />
        <AwBreadcrumbItem>
          <AwBreadcrumbPage i18nKey="sandbox:breadcrumb.name" />
        </AwBreadcrumbItem>
      </AwBreadcrumbList>
    </AwBreadcrumb>
  );
};
