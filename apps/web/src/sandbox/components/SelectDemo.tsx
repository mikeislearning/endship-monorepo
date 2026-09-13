import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { AwForm } from "@/components/AwForm";
import { AwSelectInput } from "@/components/AwSelectInput/AwSelectInput";
import { appLogger } from "@/utils/logger";

const OPTIONS = [
  { label: "Red", value: "RED" },
  { label: "Orange", value: "ORANGE" },
  { label: "Amber", value: "AMBER" },
  { label: "Yellow", value: "YELLOW" },
  { label: "Lime", value: "LIME" },
  { label: "Green", value: "GREEN" },
  { label: "Emerald", value: "EMERALD" },
  { label: "Teal", value: "TEAL" },
  { label: "Cyan", value: "CYAN" },
  { label: "Sky", value: "SKY" },
  { label: "Blue", value: "BLUE" },
  { label: "Indigo", value: "INDIGO" },
  { label: "Violet", value: "VIOLET" },
  { label: "Purple", value: "PURPLE" },
  { label: "Fuchsia", value: "FUCHSIA" },
  { label: "Pink", value: "PINK" },
  { label: "Rose", value: "ROSE" },
  { label: "Slate", value: "SLATE" },
  { label: "Gray", value: "GRAY" },
  { label: "Zinc", value: "ZINC" },
  { label: "Neutral", value: "NEUTRAL" },
  { label: "Stone", value: "STONE" },
];

export const SelectDemo = () => {
  const form = useForm();
  const [singleSelectSearchTerm, setSingleSelectSearchTerm] = useState("");
  const [multiSelectSearchTerm, setMultiSelectSearchTerm] = useState("");

  const {
    data: singleSelectPokemonOptions,
    isLoading: isSingleSelectPokemonLoading,
  } = useListPokemonQuery(singleSelectSearchTerm);
  const {
    data: multiSelectPokemonOptions,
    isLoading: isMultiSelectPokemonLoading,
  } = useListPokemonQuery(multiSelectSearchTerm);

  return (
    <AwForm
      form={form}
      className="w-sm"
      onSubmit={values => {
        appLogger.debug("values", values);
      }}>
      <AwSelectInput
        name="single-select-demo"
        control={form.control}
        labelI18nKey="sandbox:select.singleSelectLabel"
        placeholderI18nKey="sandbox:select.singleSelectPlaceholder"
        options={OPTIONS}
      />

      <AwSelectInput
        name="multi-select-demo"
        control={form.control}
        labelI18nKey="sandbox:select.multiSelectLabel"
        placeholderI18nKey="sandbox:select.multiSelectPlaceholder"
        options={OPTIONS}
        isMultiSelect
      />

      <AwSelectInput
        name="async-single-select-demo"
        control={form.control}
        labelI18nKey="sandbox:select.asyncSingleSelectLabel"
        placeholderI18nKey="sandbox:select.asyncSingleSelectPlaceholder"
        options={singleSelectPokemonOptions ?? []}
        isLoading={isSingleSelectPokemonLoading}
        isUsingAsyncData
        onInputChange={setSingleSelectSearchTerm}
      />

      <AwSelectInput
        name="async-multi-select-demo"
        control={form.control}
        labelI18nKey="sandbox:select.asyncMultiSelectLabel"
        placeholderI18nKey="sandbox:select.asyncMultiSelectPlaceholder"
        options={multiSelectPokemonOptions ?? []}
        isUsingAsyncData
        isMultiSelect
        isLoading={isMultiSelectPokemonLoading}
        onInputChange={setMultiSelectSearchTerm}
      />

      <AwSelectInput
        name="disabled-select-demo"
        control={form.control}
        labelI18nKey="sandbox:select.disabled"
        placeholderI18nKey="sandbox:select.singleSelectPlaceholder"
        options={OPTIONS}
        isDisabled
      />
    </AwForm>
  );
};

const useListPokemonQuery = (searchTerm: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["pokemon", "list", searchTerm],
    queryFn: async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?limit=151`,
      );
      const data = (await response.json()) as { results: { name: string }[] };

      return (
        data.results
          .filter(p => p.name.startsWith(searchTerm))
          .map(p => ({
            label: p.name.charAt(0).toUpperCase() + p.name.slice(1),
            value: p.name.toUpperCase(),
          })) ?? []
      );
    },
  });

  return { data, isLoading };
};
