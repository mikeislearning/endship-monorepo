import { useRef } from "react";
import { LinkProps, useNavigate } from "@tanstack/react-router";
import { SlidersHorizontal } from "lucide-react";
import { FieldValues, Path, PathValue, useForm } from "react-hook-form";

import { AwButton } from "@/components/AwButton/AwButton";
import { AwForm } from "@/components/AwForm";
import { AwSelectInput } from "@/components/AwSelectInput/AwSelectInput";
import { AwSeparator } from "@/components/AwSeparator";
import {
  AwSheet,
  AwSheetContent,
  AwSheetFooter,
  AwSheetHeader,
  AwSheetTitle,
  AwSheetTrigger,
} from "@/components/AwSheet";
import { AwText } from "@/components/AwText/AwText";
import { I18nKeyType } from "@/i18n";

export type FilterSheetPropsType<T> = {
  titleI18nKey: I18nKeyType;
  from: LinkProps["from"];
  count?: number;
  onClear?: () => void;
  filters: {
    id: string;
    name: Path<T>;
    labelI18nKey: I18nKeyType;
    placeholderI18nKey?: I18nKeyType;
    options: { label: string; value: PathValue<T, Path<T>> }[];
  }[];
};

export const FilterSheet = <T extends FieldValues>({
  titleI18nKey,
  count,
  filters,
  from,
  onClear,
}: FilterSheetPropsType<T>) => {
  const focusRef = useRef<HTMLDivElement>(null);
  const form = useForm<T>();
  const navigate = useNavigate({
    from,
  });

  const clearFilters = () => {
    if (onClear) {
      onClear();
    } else {
      void navigate({});
    }
    filters.forEach(filter =>
      form.setValue(filter.name, [] as PathValue<T, Path<T>>),
    );
  };

  return (
    <AwSheet>
      <AwSheetTrigger
        render={
          <AwButton
            variant={count ? "default" : "outline"}
            size={count ? "sm" : "icon"}>
            <SlidersHorizontal className="text-xs" />
            {Boolean(count) && <AwText variant="mdMedium">{count}</AwText>}
          </AwButton>
        }
      />
      <AwSheetContent className="md:max-w-1/3" initialFocus={focusRef}>
        <div ref={focusRef} tabIndex={-1} />
        <AwSheetHeader>
          <AwSheetTitle i18nKey={titleI18nKey} />
        </AwSheetHeader>
        <AwForm form={form} isInputOnlyForm>
          {filters.map(filter => (
            <AwSelectInput
              key={filter.id}
              name={filter.name}
              control={form.control}
              labelI18nKey={filter.labelI18nKey}
              placeholderI18nKey={filter.placeholderI18nKey}
              options={filter.options}
              isMultiSelect
              isRequired={false}
              onSelectionChanged={values => {
                void navigate({
                  search: (prev: Record<string, unknown>) => ({
                    ...prev,
                    [filter.name]: values,
                  }),
                });
              }}
            />
          ))}
        </AwForm>
        <AwSheetFooter>
          <div className="flex flex-1 flex-col gap-4 md:items-end">
            <AwSeparator />
            <AwSheetTrigger
              render={
                <AwButton
                  variant="outline"
                  i18nKey="common:clearFilters"
                  onClick={clearFilters}
                />
              }
            />
          </div>
        </AwSheetFooter>
      </AwSheetContent>
    </AwSheet>
  );
};
