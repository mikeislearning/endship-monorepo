import { useEffect, useState } from "react";

const DEFAULT_DELAY = 300;

export const useDebouncedValue = <T>({
  value,
  delay = DEFAULT_DELAY,
}: {
  value: T;
  delay?: number;
}): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Reset timeout if the value changes
    return () => {
      if (handler) {
        clearTimeout(handler);
      }
    };
  }, [value, delay]);

  return debouncedValue;
};
