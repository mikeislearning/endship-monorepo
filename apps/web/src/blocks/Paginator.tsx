import { useEffect } from "react";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import { AwForm } from "@/components/AwForm";
import {
  AwPagination,
  AwPaginationButton,
  AwPaginationContent,
  AwPaginationEllipsis,
  AwPaginationGoToFirst,
  AwPaginationGoToLast,
  AwPaginationItem,
  AwPaginationNext,
  AwPaginationPrevious,
} from "@/components/AwPagination";
import { AwSelectInput } from "@/components/AwSelectInput/AwSelectInput";
import { AwSeparator } from "@/components/AwSeparator";
import { AwText } from "@/components/AwText/AwText";
import { DEFAULT_PAGE_SIZE } from "@/domain/constants";

const paginatorFormSchema = z.object({
  page: z.number(),
  pageSize: z.number(),
});
type PaginatorFormType = z.infer<typeof paginatorFormSchema>;

export type PaginatorPropsType = {
  totalCount: number;
  initialPage: number;
  initialPageSize: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
};

export const Paginator = ({
  totalCount,
  initialPage,
  initialPageSize,
  onPageChange,
  onPageSizeChange,
}: PaginatorPropsType) => {
  const form = useForm<PaginatorFormType>({
    resolver: standardSchemaResolver(paginatorFormSchema),
    defaultValues: {
      page: initialPage ?? 1,
      pageSize: initialPageSize ?? DEFAULT_PAGE_SIZE,
    },
  });

  const [page, pageSize] = useWatch({
    control: form.control,
    name: ["page", "pageSize"],
  });

  const from = (page - 1) * pageSize + 1;

  const to = (() => {
    const value = from + pageSize - 1;
    return totalCount > value ? value : totalCount;
  })();

  const totalPages = Math.max(Math.ceil(totalCount / pageSize), 1);

  const handlePageChange = (value: number) => {
    form.setValue("page", value);
    onPageChange?.(value);
  };

  useEffect(() => {
    onPageSizeChange?.(pageSize);
  }, [pageSize, onPageSizeChange]);

  return (
    <div className="fixed right-0 bottom-0 left-0 flex flex-col gap-2 bg-background px-4 pb-4 md:left-64">
      <AwSeparator />
      <div className="flex justify-between max-sm:flex-col max-sm:items-center max-sm:gap-3">
        <div className="flex flex-2 flex-row items-center gap-2 max-sm:flex-1">
          <div className="flex flex-row items-center gap-2 pl-2 max-sm:hidden">
            <AwText i18nKey="common:pagination.rowsPerPage" />
            <AwForm form={form} isInputOnlyForm>
              <AwSelectInput
                isNumberValue
                name="pageSize"
                control={form.control}
                className="w-17.5"
                options={[
                  {
                    label: "10",
                    value: 10,
                  },
                  {
                    label: "25",
                    value: 25,
                  },
                  {
                    label: "50",
                    value: 50,
                  },
                  {
                    label: "100",
                    value: 100,
                  },
                ]}
              />
            </AwForm>
          </div>
          <div className="flex flex-row items-center whitespace-pre max-sm:text-center max-sm:text-muted-foreground">
            <AwText
              i18nKey="common:pagination.showingPrefix"
              className="sm:hidden"
            />
            <AwText
              i18nKey="common:pagination.rowsResults"
              i18nOptions={{
                from: to === 0 ? 0 : from,
                to,
                total: totalCount,
              }}
            />
          </div>
        </div>
        <AwPagination className="flex-0 max-sm:flex-1 md:justify-end">
          <AwPaginationContent>
            <AwPaginationItem>
              <AwPaginationGoToFirst
                disabled={page === 1}
                onClick={() => handlePageChange(1)}
              />
            </AwPaginationItem>
            <AwPaginationItem>
              <AwPaginationPrevious
                disabled={page === 1}
                onClick={() => handlePageChange(page - 1)}
              />
            </AwPaginationItem>
            {page >= 4 && (
              <AwPaginationItem>
                <AwPaginationEllipsis />
              </AwPaginationItem>
            )}
            {totalPages === page && page > 2 && (
              <AwPaginationItem>
                <AwPaginationButton onClick={() => handlePageChange(page - 2)}>
                  {page - 2}
                </AwPaginationButton>
              </AwPaginationItem>
            )}
            {page > 1 && (
              <AwPaginationItem>
                <AwPaginationButton onClick={() => handlePageChange(page - 1)}>
                  {page - 1}
                </AwPaginationButton>
              </AwPaginationItem>
            )}
            <AwPaginationItem>
              <AwPaginationButton isActive>{page}</AwPaginationButton>
            </AwPaginationItem>
            {totalPages > page && (
              <AwPaginationItem>
                <AwPaginationButton onClick={() => handlePageChange(page + 1)}>
                  {page + 1}
                </AwPaginationButton>
              </AwPaginationItem>
            )}
            {totalPages > page + 1 && page === 1 && (
              <AwPaginationItem>
                <AwPaginationButton onClick={() => handlePageChange(page + 2)}>
                  {page + 2}
                </AwPaginationButton>
              </AwPaginationItem>
            )}
            {totalPages > page + 2 && (
              <AwPaginationItem>
                <AwPaginationEllipsis />
              </AwPaginationItem>
            )}
            <AwPaginationItem>
              <AwPaginationNext
                disabled={page === totalPages}
                onClick={() => handlePageChange(page + 1)}
              />
            </AwPaginationItem>
            <AwPaginationItem>
              <AwPaginationGoToLast
                disabled={page === totalPages}
                onClick={() => handlePageChange(totalPages)}
              />
            </AwPaginationItem>
          </AwPaginationContent>
        </AwPagination>
      </div>
    </div>
  );
};
