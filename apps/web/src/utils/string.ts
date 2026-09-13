export const convertEnumToCapitalizedString = (enumValue: string): string => {
  const normalizedValue = enumValue.replace(/_/g, " ").toLowerCase();

  return (
    normalizedValue.charAt(0).toUpperCase() +
    normalizedValue.slice(1).toLowerCase()
  );
};
