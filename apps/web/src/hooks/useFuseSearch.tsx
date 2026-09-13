import { ChangeEvent, KeyboardEvent, useState } from "react";
import Fuse, { IFuseOptions } from "fuse.js";

export const useFuseSearch = <T,>({
  list,
  options,
  isEnabled = true,
}: {
  list: T[];
  options: IFuseOptions<T>;
  isEnabled?: boolean;
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const fuse = new Fuse(list, {
    threshold: 0.25,
    shouldSort: false,
    ...options,
  });

  const results =
    isEnabled && searchTerm.length > 0 ? fuse.search(searchTerm) : undefined;

  const onSearch = (
    eventOrValue:
      ChangeEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement> | string,
  ) => {
    if (typeof eventOrValue === "string") {
      setSearchTerm(eventOrValue.trim());
    } else {
      const target = eventOrValue.target as HTMLInputElement;
      setSearchTerm(target.value.trim());
    }
  };

  return { results, onSearch };
};
