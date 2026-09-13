import { ComponentProps } from "react";
import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";

import { useTranslator } from "@/hooks/useTranslate";
import { RequiredChildrenType } from "@/utils/react";
import { cn } from "@/utils/tailwind";

import { AwButton } from "./AwButton/AwButton";
import { AwText } from "./AwText/AwText";

export const AwPagination = ({
  className,
  ...props
}: ComponentProps<"nav">) => {
  const { t } = useTranslator();

  return (
    <nav
      role="navigation"
      aria-label={t("common:pagination.pagination")}
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
};

export const AwPaginationContent = ({
  className,
  ...props
}: ComponentProps<"ul">) => {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
};

export const AwPaginationItem = (props: ComponentProps<"li">) => {
  return <li data-slot="pagination-item" {...props} />;
};

type AwPaginationButtonPropsType = ComponentProps<typeof AwButton> & {
  children: RequiredChildrenType;
  isActive?: boolean;
};

export const AwPaginationButton = ({
  isActive,
  children,
  size = "icon",
  ...props
}: AwPaginationButtonPropsType) => {
  return (
    <AwButton
      type="button"
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      variant={isActive ? "outline" : "ghost"}
      size={size}
      {...props}>
      {children}
    </AwButton>
  );
};

export const AwPaginationGoToFirst = ({
  className,
  ...props
}: Omit<AwPaginationButtonPropsType, "children">) => {
  const { t } = useTranslator();

  return (
    <AwPaginationButton
      aria-label={t("common:pagination.goToFirstPage")}
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}>
      <ChevronFirstIcon />
    </AwPaginationButton>
  );
};

export const AwPaginationPrevious = ({
  className,
  ...props
}: Omit<AwPaginationButtonPropsType, "children">) => {
  const { t } = useTranslator();

  return (
    <AwPaginationButton
      aria-label={t("common:pagination.goToPreviousPage")}
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}>
      <ChevronLeftIcon />
    </AwPaginationButton>
  );
};

export const AwPaginationNext = ({
  className,
  ...props
}: Omit<AwPaginationButtonPropsType, "children">) => {
  const { t } = useTranslator();

  return (
    <AwPaginationButton
      aria-label={t("common:pagination.goToNextPage")}
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}>
      <ChevronRightIcon />
    </AwPaginationButton>
  );
};

export const AwPaginationGoToLast = ({
  className,
  ...props
}: Omit<AwPaginationButtonPropsType, "children">) => {
  const { t } = useTranslator();

  return (
    <AwPaginationButton
      aria-label={t("common:pagination.goToLastPage")}
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}>
      <ChevronLastIcon />
    </AwPaginationButton>
  );
};

export const AwPaginationEllipsis = ({
  className,
  ...props
}: ComponentProps<"span">) => {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}>
      <MoreHorizontalIcon className="size-4" />
      <AwText
        as="span"
        className="sr-only"
        i18nKey="common:pagination.morePages"
      />
    </span>
  );
};
