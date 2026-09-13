import { KeyboardEvent, useEffect, useRef, useState } from "react";
import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  size,
  useFloating,
} from "@floating-ui/react";
import { Command as CommandPrimitive } from "cmdk";
import { CheckIcon, ChevronDown, Search, XIcon } from "lucide-react";

import { AwBadge } from "@/components/AwBadge/AwBadge";
import { AwButton } from "@/components/AwButton/AwButton";
import {
  AwCommandEmpty,
  AwCommandGroup,
  AwCommandInput,
  AwCommandItem,
  AwCommandList,
  AwCommandLoading,
} from "@/components/AwCommand";
import { NumberOptionType, OptionType } from "@/domain/common";
import { useFuseSearch } from "@/hooks/useFuseSearch";
import { useTranslate } from "@/hooks/useTranslate";
import { cn } from "@/utils/tailwind";

import { BaseTextSelectPropsType } from "./BaseTextSelect";

type BaseMultiTextSelectPropsType = BaseTextSelectPropsType & {
  values: string[];
  onSelectionChange: (values: (string | number)[]) => void;
};

export const BaseMultiTextSelect = ({
  values,
  options,
  placeholderI18nKey,
  placeholderI18nOptions,
  emptyI18nKey,
  emptyI18nOptions,
  isLoading,
  isDisabled,
  onSelectionChange,
  onInputChange,
  isUsingAsyncData,
}: BaseMultiTextSelectPropsType) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles } = useFloating({
    open: isOpen,
    placement: "bottom-start",
    middleware: [
      offset(4),
      flip(),
      size({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
          });
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });
  const [selectedOptions, setSelectedOptions] = useState<
    (OptionType | NumberOptionType)[]
  >(
    values
      ?.map(value => options.find(o => o.value === value))
      .filter(Boolean) as OptionType[],
  );
  const [inputValue, setInputValue] = useState<string>("");

  // Need to use Fuse for client side filtering to fix issue with list not updating when a selection is made and the input value is reset
  const { results: filterResults, onSearch } = useFuseSearch<
    OptionType | NumberOptionType
  >({
    list: options,
    options: {
      keys: ["label"],
    },
    isEnabled: !isUsingAsyncData,
  });

  const placeholder = useTranslate(placeholderI18nKey, placeholderI18nOptions);
  const emptyMessage = useTranslate(
    emptyI18nKey ?? "common:noResults",
    emptyI18nOptions,
  );

  // When input value is changed, trigger the filtering with Fuse
  useEffect(() => {
    onSearch(inputValue);
  }, [inputValue, onSearch]);

  // Handle the case when the value is changed from the outside, like foAb.setValue
  useEffect(() => {
    onSelectionChange(selectedOptions.map(o => o.value));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOptions]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current;
    if (!input) {
      return;
    }

    // Keep the options displayed when the user is typing
    if (!isOpen) {
      setIsOpen(true);
    }

    // Select the option if the user presses Enter
    if (e.key === "Delete" || e.key === "Backspace") {
      if (input.value === "") {
        setSelectedOptions(prev => {
          const newSelectedOptions = [...prev];
          newSelectedOptions.pop();
          return newSelectedOptions;
        });
      }
    }
    // This is not a default behaviour of the <input /> field
    if (e.key === "Escape") {
      input.blur();
    }
  };

  const handleInputChange = (value: string) => {
    onInputChange?.(value);
    setInputValue(value);
  };

  const handleBlur = () => {
    setIsOpen(false);
    if (selectedOptions.length === 0) {
      setInputValue("");
    }
  };

  const handleSelectOption = (option: OptionType | NumberOptionType) => {
    setInputValue("");
    setSelectedOptions(prev => [...prev, option]);
  };

  const handleUnselectOption = (option: OptionType | NumberOptionType) => {
    setSelectedOptions(prev => prev.filter(s => s.value !== option.value));
  };

  const shouldShowList = isUsingAsyncData ? Boolean(inputValue) : true;

  const filteredOptions = (() => {
    if (isUsingAsyncData || (!inputValue && !filterResults)) {
      return options;
    }
    return filterResults?.map(r => r.item) ?? [];
  })();

  return (
    <CommandPrimitive
      data-slot="command"
      shouldFilter={false}
      className="overflow-visible bg-background">
      <div
        ref={node => {
          refs.setReference(node);
        }}
        className={cn(
          "flex min-h-9 w-full min-w-0 flex-wrap items-center gap-1 rounded-md border border-input bg-background px-3 py-1.25 text-base shadow-xs ring-ring/50 transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground dark:bg-input/30",
          {
            "ring-3": isOpen,
            "gap-y-1": selectedOptions.length > 0,
          },
        )}
        onClick={() => !isDisabled && inputRef.current?.focus()}>
        {isUsingAsyncData && (
          <Search
            className={cn(
              "mr-1.75 -ml-1.25 size-4 shrink-0 text-muted-foreground",
              {
                "mr-0.75": selectedOptions.length > 0,
              },
            )}
          />
        )}
        {selectedOptions.map(option => {
          return (
            <AwBadge
              key={option.value}
              className="h-6 first:mr-0 last-of-type:mr-1">
              <div className="inline-flex items-center gap-1">
                {option.label}
                <AwButton
                  type="button"
                  size="icon"
                  className="size-3 cursor-pointer text-muted-foreground hover:text-muted-foreground/50"
                  onKeyDown={e => {
                    if (e.key === "Enter") {
                      handleUnselectOption(option);
                    }
                  }}
                  onMouseDown={e => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={e => {
                    handleUnselectOption(option);
                    e.preventDefault();
                    e.stopPropagation();
                  }}>
                  <XIcon className="size-3 shrink-0" />
                </AwButton>
              </div>
            </AwBadge>
          );
        })}
        <AwCommandInput
          ref={inputRef}
          value={inputValue}
          onValueChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onFocus={() => setIsOpen(true)}
          placeholder={selectedOptions.length > 0 ? "" : placeholder}
          disabled={isDisabled}
          className="h-5 min-w-32 rounded-none border-0 p-0 shadow-none focus-visible:ring-0 dark:bg-transparent"
          rightIcon={
            isUsingAsyncData ? undefined : (
              <ChevronDown className="-mr-6.5 size-4 shrink-0" />
            )
          }
        />
      </div>
      {isOpen && shouldShowList && (
        <FloatingPortal>
          <div
            ref={node => {
              refs.setFloating(node);
            }}
            style={floatingStyles}
            className="z-50 overflow-hidden rounded-md bg-popover text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10">
            <AwCommandList>
              {filteredOptions &&
                (isLoading ? (
                  <AwCommandLoading />
                ) : (
                  <AwCommandGroup>
                    {filteredOptions.map(option => (
                      <AwCommandItem
                        key={option.value}
                        disabled={option.isDisabled}
                        onMouseDown={event => {
                          event.preventDefault();
                          event.stopPropagation();
                        }}
                        onSelect={() => {
                          if (
                            selectedOptions.some(
                              so => so.value === option.value,
                            )
                          ) {
                            handleUnselectOption(option);
                          } else {
                            handleSelectOption(option);
                          }
                        }}
                        className={cn("flex w-full items-center")}>
                        <span className="truncate pr-4">{option.label}</span>
                        {selectedOptions.some(
                          so => so.value === option.value,
                        ) && (
                          <div className="absolute top-0 right-2 bottom-0 flex w-4 items-center justify-center">
                            <CheckIcon className="size-4 shrink-0" />
                          </div>
                        )}
                      </AwCommandItem>
                    ))}
                  </AwCommandGroup>
                ))}
              {!isLoading ? (
                <AwCommandEmpty>{emptyMessage}</AwCommandEmpty>
              ) : null}
            </AwCommandList>
          </div>
        </FloatingPortal>
      )}
    </CommandPrimitive>
  );
};
