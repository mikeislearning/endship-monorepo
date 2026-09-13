import { AwCard, AwCardContent } from "@/components/AwCard";
import { AwLoadingSpinner } from "@/components/AwLoadingSpinner";

import { FullLogo } from "./FullLogo";

export const AuthLoading = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background">
      <div className="-mt-6 grid w-sm gap-6">
        <FullLogo className="mx-20" />
        <AwCard>
          <AwCardContent className="flex h-28 items-center justify-center">
            <AwLoadingSpinner />
          </AwCardContent>
        </AwCard>
      </div>
    </div>
  );
};
