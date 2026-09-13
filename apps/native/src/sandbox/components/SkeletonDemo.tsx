import { AnBox } from "@/components/AnBox";
import { AnCard, AnCardContent, AnCardHeader } from "@/components/AnCard";
import { AnSkeleton } from "@/components/AnSkeleton";

export const SkeletonDemo = () => {
  return (
    <AnBox className="w-full flex-wrap items-start gap-6">
      <AnBox className="flex-row items-center gap-4">
        <AnSkeleton className="h-10 w-10 shrink-0 rounded-full" />
        <AnBox className="gap-2">
          <AnSkeleton className="h-4 w-[150px]" />
          <AnSkeleton className="h-4 w-[100px]" />
        </AnBox>
      </AnBox>
      <AnCard className="w-full lg:w-1/3">
        <AnCardHeader>
          <AnSkeleton className="h-4 w-2/3" />
          <AnSkeleton className="h-4 w-1/2" />
        </AnCardHeader>
        <AnCardContent>
          <AnSkeleton className="aspect-square w-full" />
        </AnCardContent>
      </AnCard>
    </AnBox>
  );
};
