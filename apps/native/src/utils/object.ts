export const removeNullValues = <T extends object>(obj: T) =>
  Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== null));
