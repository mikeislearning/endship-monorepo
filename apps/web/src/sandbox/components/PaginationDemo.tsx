import {
  AwPagination,
  AwPaginationButton,
  AwPaginationContent,
  AwPaginationEllipsis,
  AwPaginationItem,
  AwPaginationNext,
  AwPaginationPrevious,
} from "@/components/AwPagination";

export const PaginationDemo = () => {
  return (
    <AwPagination>
      <AwPaginationContent>
        <AwPaginationItem>
          <AwPaginationPrevious />
        </AwPaginationItem>
        <AwPaginationItem>
          <AwPaginationButton>1</AwPaginationButton>
        </AwPaginationItem>
        <AwPaginationItem>
          <AwPaginationButton isActive>2</AwPaginationButton>
        </AwPaginationItem>
        <AwPaginationItem>
          <AwPaginationButton>3</AwPaginationButton>
        </AwPaginationItem>
        <AwPaginationItem>
          <AwPaginationEllipsis />
        </AwPaginationItem>
        <AwPaginationItem>
          <AwPaginationNext />
        </AwPaginationItem>
      </AwPaginationContent>
    </AwPagination>
  );
};
