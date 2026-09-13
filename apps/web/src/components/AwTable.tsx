import { ComponentProps } from "react";

import { useTranslate } from "@/hooks/useTranslate";
import { ChildrenOrI18nType } from "@/utils/react";
import { cn } from "@/utils/tailwind";

import { textVariants } from "./AwText/variants";

export const AwTable = ({ className, ...props }: ComponentProps<"table">) => {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto">
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
};

export const AwTableHeader = ({
  className,
  ...props
}: ComponentProps<"thead">) => {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  );
};

export const AwTableBody = ({
  className,
  ...props
}: ComponentProps<"tbody">) => {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
};

export const AwTableFooter = ({
  className,
  ...props
}: ComponentProps<"tfoot">) => {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
        className,
      )}
      {...props}
    />
  );
};

export const AwTableRow = ({ className, ...props }: ComponentProps<"tr">) => {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className,
      )}
      {...props}
    />
  );
};

type AwTableHeadPropsType = ComponentProps<"th"> & ChildrenOrI18nType;

export const AwTableHead = ({
  className,
  children,
  i18nKey,
  i18nOptions,
  ...props
}: AwTableHeadPropsType) => {
  const i18nText = useTranslate(i18nKey, i18nOptions);

  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        textVariants({ variant: "mdMedium" }),
        className,
      )}
      {...props}>
      {children ?? i18nText}
    </th>
  );
};

type AwTableCellPropsType = ComponentProps<"td"> & ChildrenOrI18nType;

export const AwTableCell = ({
  className,
  children,
  i18nKey,
  i18nOptions,
  ...props
}: AwTableCellPropsType) => {
  const i18nText = useTranslate(i18nKey, i18nOptions);

  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        textVariants(),
        className,
      )}
      {...props}>
      {children ?? i18nText}
    </td>
  );
};

type AwTableCaptionPropsType = ComponentProps<"caption"> & ChildrenOrI18nType;

export const AwTableCaption = ({
  className,
  children,
  i18nKey,
  i18nOptions,
  ...props
}: AwTableCaptionPropsType) => {
  const i18nText = useTranslate(i18nKey, i18nOptions);

  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-muted-foreground", textVariants(), className)}
      {...props}>
      {children ?? i18nText}
    </caption>
  );
};
