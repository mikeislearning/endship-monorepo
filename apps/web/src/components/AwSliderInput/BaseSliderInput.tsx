import { Slider as SliderPrimitive } from "@base-ui/react/slider";

import { cn } from "@/utils/tailwind";

export type BaseSliderInputPropsType = SliderPrimitive.Root.Props;

export const BaseSliderInput = ({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: BaseSliderInputPropsType) => {
  const parsedValues = (() => {
    const candidateValues = Array.isArray(value)
      ? value
      : Array.isArray(defaultValue)
        ? defaultValue
        : [min, max];

    const numericValues = candidateValues.filter(
      (candidateValue): candidateValue is number =>
        typeof candidateValue === "number",
    );

    return numericValues.length > 0 ? numericValues : [min, max];
  })();

  const isControlled = Array.isArray(value);
  const sliderValue = isControlled ? parsedValues : undefined;
  const sliderDefaultValue = isControlled ? undefined : parsedValues;

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={sliderDefaultValue}
      value={sliderValue}
      min={min}
      max={max}
      thumbAlignment="edge"
      className={cn("data-horizontal:w-full data-vertical:h-full", className)}
      {...props}>
      <SliderPrimitive.Control className="relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-44 data-vertical:w-auto data-vertical:flex-col">
        <SliderPrimitive.Track
          data-slot="slider-track"
          className="relative grow overflow-hidden rounded-full bg-muted data-horizontal:h-1.5 data-horizontal:w-full data-vertical:h-full data-vertical:w-1.5">
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            className="bg-primary data-horizontal:h-full data-vertical:w-full"
          />
        </SliderPrimitive.Track>
        {Array.from({ length: parsedValues.length }, (_, index) => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            key={index}
            className="block size-4 shrink-0 rounded-full border border-primary bg-background shadow-sm ring-ring/50 transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
};
