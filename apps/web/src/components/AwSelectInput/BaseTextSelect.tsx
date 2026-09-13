import { KeyboardEvent, useRef, useState } from "react";
import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  size,
  useFloating,
} from "@floating-ui/react";
import { Command as CommandPrimitive } from "cmdk";
import { CheckIcon, ChevronDown, Search } from "lucide-react";

import {
  AwCommandEmpty,
  AwCommandGroup,
  AwCommandInput,
  AwCommandItem,
  AwCommandList,
  AwCommandLoading,
} from "@/components/AwCommand";
import { NumberOptionType, OptionType } from "@/domain/common";
import { useTranslate } from "@/hooks/useTranslate";
import { I18nKeyType } from "@/i18n";
import { cn } from "@/utils/tailwind";

export type BaseTextSelectPropsType = {
  value?: string | number;
  onValueChange?: (value?: OptionType | NumberOptionType) => void;
  emptyI18nKey?: I18nKeyType;
  emptyI18nOptions?: object;
  isLoading?: boolean;
  isDisabled?: boolean;
  placeholderI18nKey?: I18nKeyType;
  placeholderI18nOptions?: object;
  isUsingAsyncData?: boolean;
  onInputChange?: (value: string) => void;
  isInputReadOnly?: boolean;
  shouldAutoSelectOptionOnInputChange?: boolean;
  isClearable?: boolean;
} & (
  | {
      isNumberValue?: false | undefined;
      options: OptionType[];
    }
  | {
      isNumberValue: true;
      options: NumberOptionType[];
    }
);

export const BaseTextSelect = ({
  options,
  placeholderI18nKey,
  placeholderI18nOptions,
  emptyI18nKey,
  emptyI18nOptions,
  value,
  onValueChange,
  onInputChange,
  isDisabled,
  isLoading = false,
  isUsingAsyncData,
  isInputReadOnly,
  shouldAutoSelectOptionOnInputChange = true,
  isClearable = true,
}: BaseTextSelectPropsType) => {
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
  const [selectedOption, setSelectedOption] = useState<
    OptionType | NumberOptionType | undefined
  >(options.find(option => option.value === value));
  const [inputValue, setInputValue] = useState<string>(
    options.find(option => option.value === value)?.label ?? "",
  );

  const placeholder = useTranslate(placeholderI18nKey, placeholderI18nOptions);
  const emptyMessage = useTranslate(
    emptyI18nKey ?? "common:noResults",
    emptyI18nOptions,
  );

  // Sync when value changes from outside (without useEffect to avoid cascading renders)
  const [prevValue, setPrevValue] = useState(value);
  if (prevValue !== value) {
    const option = options.find(o => o.value === value);
    setPrevValue(value);
    setSelectedOption(option);
    setInputValue(option?.label ?? "");
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current;
    if (!input) {
      return;
    }

    // Keep the options displayed when the user is typing
    if (!isOpen) {
      setIsOpen(true);
    }

    // Select the option if the user presses Enter
    if (event.key === "Enter" && input.value !== "") {
      const optionToSelect = options.find(
        option => option.label === input.value,
      );
      if (optionToSelect) {
        setSelectedOption(optionToSelect);
        onValueChange?.(optionToSelect);
      }
    }

    // This is not a default behaviour of the <input /> field
    if (event.key === "Escape") {
      input.blur();
    }
  };

  const handleBlur = () => {
    setIsOpen(false);
    if (!selectedOption) {
      setInputValue("");
      onValueChange?.(selectedOption);
    } else {
      setInputValue(selectedOption.label);
    }
  };

  const handleSelectOption = (
    selectedOptionOption: OptionType | NumberOptionType,
  ) => {
    setInputValue(selectedOptionOption.label);

    setSelectedOption(selectedOptionOption);
    onValueChange?.(selectedOptionOption);

    // This is a hack to prevent the input from being focused after the user selects an option
    // We can call this hack: "The next tick"
    setTimeout(() => {
      inputRef?.current?.blur();
    }, 0);
  };

  const handleInputChange = (value: string) => {
    onInputChange?.(value);
    setInputValue(value);
    if (shouldAutoSelectOptionOnInputChange || !value) {
      const newOption = options.find(option => option.label === value);

      if (!newOption && !isClearable) {
        return;
      }
      setSelectedOption(newOption);
    }
  };

  const shouldShowList = isUsingAsyncData ? Boolean(inputValue) : true;

  return (
    <CommandPrimitive
      shouldFilter={!isUsingAsyncData}
      className="overflow-visible rounded-md bg-background">
      <div
        ref={node => {
          refs.setReference(node);
        }}
        onClick={() => !isDisabled && setIsOpen(true)}>
        <AwCommandInput
          ref={inputRef}
          value={inputValue}
          onValueChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          disabled={isDisabled}
          readOnly={isInputReadOnly}
          leftIcon={
            isUsingAsyncData ? (
              <Search className="size-4 shrink-0" />
            ) : undefined
          }
          rightIcon={
            isUsingAsyncData ? undefined : (
              <ChevronDown className="size-4 shrink-0" />
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
              {isLoading ? (
                <AwCommandLoading />
              ) : (
                <AwCommandGroup>
                  {options.map(option => (
                    <AwCommandItem
                      key={option.value}
                      value={option.label}
                      disabled={option.isDisabled}
                      onMouseDown={event => {
                        event.preventDefault();
                        event.stopPropagation();
                      }}
                      onSelect={() => handleSelectOption(option)}
                      className={cn("flex w-full items-center")}>
                      <span className="truncate pr-4">{option.label}</span>
                      {selectedOption?.value === option.value && (
                        <div className="absolute top-0 right-2 bottom-0 flex w-4 items-center justify-center">
                          <CheckIcon className="size-4 shrink-0" />
                        </div>
                      )}
                    </AwCommandItem>
                  ))}
                </AwCommandGroup>
              )}
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
