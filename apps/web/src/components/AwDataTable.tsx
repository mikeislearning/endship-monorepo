import {
  ColumnDef,
  ColumnSort,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp } from "lucide-react";

import { I18nKeyType } from "@/i18n";
import { cn } from "@/utils/tailwind";

import { AwButton } from "./AwButton/AwButton";
import { AwCard } from "./AwCard";
import { AwSkeleton } from "./AwSkeleton";
import {
  AwTable,
  AwTableBody,
  AwTableCell,
  AwTableHead,
  AwTableHeader,
  AwTableRow,
} from "./AwTable";
import { AwText } from "./AwText/AwText";
import { AwTooltip, AwTooltipContent, AwTooltipTrigger } from "./AwTooltip";

export type AwDataTablePropsType<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  emptyI18nKey?: I18nKeyType;
  emptyI18nOptions?: object;
  isSortEnabled?: boolean;
  manualSorting?: {
    sorting?: ColumnSort;
    onSortingChange: (sortingValue: ColumnSort) => void;
  };
  onRowClick?: (row: TData) => void;
  hasHeader?: boolean;
  tableCardClassName?: string;
  tableRowClassName?: string;
  hasPagination?: boolean;
};

export const AwDataTable = <TData, TValue>({
  columns,
  data,
  isLoading,
  emptyI18nKey = "common:noResults",
  emptyI18nOptions,
  isSortEnabled = false,
  manualSorting,
  onRowClick,
  hasHeader = true,
  tableCardClassName = "",
  tableRowClassName = "",
  hasPagination = true,
}: AwDataTablePropsType<TData, TValue>) => {
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: isLoading ? [] : data,
    columns,
    enableSorting: Boolean(manualSorting),
    manualSorting: true,
    getCoreRowModel: getCoreRowModel(),
    defaultColumn: {
      minSize: 0,
      size: Number.MAX_SAFE_INTEGER,
      maxSize: Number.MAX_SAFE_INTEGER,
    },
  });

  const handleSorting = (sortingKey: string): ColumnSort => {
    const isDesc =
      sortingKey === manualSorting?.sorting?.id && !manualSorting?.sorting.desc;
    return { id: sortingKey, desc: isDesc };
  };

  const hasNoResults = data.length === 0 && !isLoading;

  return (
    <AwCard
      className={cn(
        "overflow-hidden rounded-md border px-2 py-1 shadow",
        {
          "mb-26 md:mb-18": hasPagination,
        },
        tableCardClassName,
      )}>
      <AwTable>
        {hasHeader && (
          <AwTableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <AwTableRow
                key={headerGroup.id}
                className="hover:bg-transparent dark:hover:bg-transparent">
                {headerGroup.headers.map(header => {
                  return (
                    <AwTableHead
                      key={header.id}
                      className={cn({
                        "max-sm:hidden":
                          header.column.columnDef.meta?.isMobileHidden,
                      })}
                      style={{
                        width:
                          header.getSize() === Number.MAX_SAFE_INTEGER
                            ? "auto"
                            : header.getSize(),
                        maxWidth:
                          header.getSize() === Number.MAX_SAFE_INTEGER
                            ? header.column.columnDef.maxSize
                            : header.getSize(),
                      }}
                      onClick={() => header.column.getToggleSortingHandler()}>
                      <AwTooltip>
                        <AwTooltipTrigger
                          render={
                            <AwButton
                              variant="ghost"
                              disabled={
                                !isSortEnabled ||
                                !header.column.getCanSort() ||
                                hasNoResults
                              }
                              className={cn(
                                "text-muted-foreground hover:bg-transparent disabled:opacity-100 has-[>svg]:px-0 dark:hover:bg-transparent",
                                {
                                  "cursor-pointer":
                                    isSortEnabled &&
                                    !isLoading &&
                                    data.length > 0,
                                },
                              )}
                              onClick={() =>
                                manualSorting?.onSortingChange(
                                  handleSorting(header.id),
                                )
                              }>
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext(),
                                  )}
                              {manualSorting?.sorting?.desc ? (
                                <ArrowUp
                                  className={cn({
                                    hidden:
                                      manualSorting?.sorting?.id !== header.id,
                                  })}
                                />
                              ) : (
                                <ArrowDown
                                  className={cn({
                                    hidden:
                                      manualSorting?.sorting?.id !== header.id,
                                  })}
                                />
                              )}
                            </AwButton>
                          }
                        />
                        {header.column.columnDef.meta?.tooltipI18nkey && (
                          <AwTooltipContent
                            i18nKey={
                              header.column.columnDef.meta.tooltipI18nkey
                            }
                          />
                        )}
                      </AwTooltip>
                    </AwTableHead>
                  );
                })}
              </AwTableRow>
            ))}
          </AwTableHeader>
        )}
        <AwTableBody className="border-0 shadow-none outline-0">
          {isLoading
            ? Array.from({ length: 10 }).map((_, index) => (
                <AwTableRow key={index}>
                  {columns.map((column, columnIndex) => (
                    <AwTableCell
                      key={columnIndex}
                      className={cn("h-13", {
                        "max-sm:hidden": column.meta?.isMobileHidden,
                      })}>
                      <AwSkeleton className="h-5 w-full" />
                    </AwTableCell>
                  ))}
                </AwTableRow>
              ))
            : table.getRowModel().rows.map(row => (
                <AwTableRow
                  key={row.id}
                  className={cn(tableRowClassName, {
                    "cursor-pointer": Boolean(onRowClick),
                  })}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => onRowClick?.(row.original)}>
                  {row.getVisibleCells().map(cell => (
                    <AwTableCell
                      key={cell.id}
                      className={cn("h-13", {
                        "max-sm:hidden":
                          cell.column.columnDef.meta?.isMobileHidden,
                      })}
                      style={{
                        width:
                          cell.column.getSize() === Number.MAX_SAFE_INTEGER
                            ? "auto"
                            : cell.column.getSize(),
                        maxWidth:
                          cell.column.getSize() === Number.MAX_SAFE_INTEGER
                            ? cell.column.columnDef.maxSize
                            : cell.column.getSize(),
                      }}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </AwTableCell>
                  ))}
                </AwTableRow>
              ))}
        </AwTableBody>
      </AwTable>
      {hasNoResults && (
        <div className="mb-5 flex flex-1 items-center justify-center">
          <AwText
            i18nKey={emptyI18nKey}
            i18nOptions={emptyI18nOptions}
            className="p-4 text-center text-muted-foreground"
          />
        </div>
      )}
    </AwCard>
  );
};
