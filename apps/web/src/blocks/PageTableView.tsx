import { LinkProps, useNavigate } from "@tanstack/react-router";
import { SearchIcon } from "lucide-react";
import { FieldValues, Path, useForm } from "react-hook-form";

import { AwDataTable, AwDataTablePropsType } from "@/components/AwDataTable";
import { AwForm } from "@/components/AwForm";
import { AwTextInput } from "@/components/AwTextInput/AwTextInput";
import { I18nKeyType } from "@/i18n";

import { FilterSheet, FilterSheetPropsType } from "./FilterSheet";
import { Paginator, PaginatorPropsType } from "./Paginator";

type PageTableViewPropsType<DataType, FilterType extends FieldValues> = {
  fromRoute: LinkProps["from"];
  searchFilterProps?: {
    currentValue: string;
    placeholderI18nKey: I18nKeyType;
  };
  filterSheetProps?: FilterSheetPropsType<FilterType>;
  tableProps: AwDataTablePropsType<DataType, string>;
  paginatorProps: PaginatorPropsType;
};

export const PageTableView = <DataType, FilterType extends FieldValues>({
  fromRoute,
  tableProps,
  searchFilterProps,
  filterSheetProps,
  paginatorProps,
}: PageTableViewPropsType<DataType, FilterType>) => {
  const form = useForm<FilterType>();
  const navigate = useNavigate({ from: fromRoute });

  return (
    <>
      <div className="flex items-center gap-3">
        <div className="flex-1">
          {searchFilterProps && (
            <AwForm form={form} isInputOnlyForm>
              <AwTextInput
                name={"search" as Path<FilterType>}
                value={searchFilterProps.currentValue}
                onChange={({ target }) => {
                  void navigate({
                    search: prev => ({
                      ...prev,
                      search: target.value,
                    }),
                  });
                }}
                control={form.control}
                leftIcon={<SearchIcon />}
                placeholderI18nKey={searchFilterProps.placeholderI18nKey}
                isRequired={false}
              />
            </AwForm>
          )}
        </div>
        {filterSheetProps && <FilterSheet<FilterType> {...filterSheetProps} />}
      </div>
      <div className="flex-1">
        <AwDataTable {...tableProps} />
      </div>
      <Paginator {...paginatorProps} />
    </>
  );
};
