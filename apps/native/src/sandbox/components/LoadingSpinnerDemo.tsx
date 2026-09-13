import { AnBox } from "@/components/AnBox";
import { AnLoadingSpinner } from "@/components/AnLoadingSpinner";

export const LoadingSpinnerDemo = () => {
  return (
    <AnBox className="native:justify-center web:flex-row items-center gap-6">
      <AnLoadingSpinner size={16} />
      <AnLoadingSpinner size={24} />
      <AnLoadingSpinner size={32} />
    </AnBox>
  );
};
