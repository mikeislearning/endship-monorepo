import { AwCard, AwCardContent, AwCardHeader } from "@/components/AwCard";
import { AwSkeleton } from "@/components/AwSkeleton";

export const SkeletonDemo = () => {
  return (
    <div className="flex w-full flex-wrap items-start gap-4">
      <div className="flex items-center gap-4">
        <AwSkeleton className="size-10 shrink-0 rounded-full" />
        <div className="grid gap-2">
          <AwSkeleton className="h-4 w-37.5" />
          <AwSkeleton className="h-4 w-25" />
        </div>
      </div>
      <div className="flex w-full flex-wrap items-start gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <AwCard key={index} className="w-full @md:w-auto @md:min-w-sm">
            <AwCardHeader>
              <AwSkeleton className="h-4 w-2/3" />
              <AwSkeleton className="h-4 w-1/2" />
            </AwCardHeader>
            <AwCardContent>
              <AwSkeleton className="aspect-square w-full" />
            </AwCardContent>
          </AwCard>
        ))}
      </div>
    </div>
  );
};
