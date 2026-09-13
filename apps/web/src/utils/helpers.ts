import type { ColumnSort } from "@tanstack/react-table";

import { DEFAULT_PAGE_SIZE } from "@/domain/constants";

export const paginationRange = (page: number, pageSize = DEFAULT_PAGE_SIZE) => {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  return { from, to };
};

export type PaginationType<T> = {
  page: number;
  pageSize?: number;
  sort?: ColumnSort;
  filters?: T;
  needsPagination?: boolean;
  isEnabled?: boolean;
};

export const parseSearchTerm = (searchTerm: string) => {
  if (!searchTerm || typeof searchTerm !== "string") {
    return "";
  }

  // 1. Trim the search term to remove leading and trailing whitespace.
  let parsedSearchTerm = searchTerm.trim();

  if (parsedSearchTerm.length === 0) {
    return "";
  }

  // 2. Replace all remaining whitespace with "&" to match all words in the search term.
  // This creates an AND condition between words
  parsedSearchTerm = parsedSearchTerm.replace(/\s+/g, " & ");

  // 3. Append ":*" to the end of the search term to enable partial search.
  // This allows for prefix matching (e.g., "joh" will match "john")
  parsedSearchTerm = parsedSearchTerm + ":*";

  return parsedSearchTerm;
};

// Formats a phone number to "XXX-XXX-XXXX"
export const formatPhoneNumber = (phoneNumber: string) => {
  const cleaned = String(phoneNumber).replace(/\D/g, "");
  const match = /^(\d{3})(\d{3})(\d{4})$/.exec(cleaned);
  if (match && match.length >= 4) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  return null;
};
