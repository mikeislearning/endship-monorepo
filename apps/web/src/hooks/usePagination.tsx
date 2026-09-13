import { useState } from "react";

import { DEFAULT_PAGE_SIZE } from "@/domain/constants";

export const usePagination = <T extends object>(filters: T) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [prevFilters, setPrevFilters] = useState(filters);

  // Reset page to 1 when filters change
  if (prevFilters !== filters) {
    setPrevFilters(filters);
    setPage(1);
  }

  return {
    page,
    setPage,
    pageSize,
    setPageSize,
  };
};
