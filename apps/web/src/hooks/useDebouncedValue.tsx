import { useEffect, useState } from "react";

import { DEFAULT_DEBOUNCE_IN_MS } from "@/domain/constants";

export const useDebouncedValue = <T,>({
  value,
  delay = DEFAULT_DEBOUNCE_IN_MS,
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
