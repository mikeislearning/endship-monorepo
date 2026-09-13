import { Bold } from "lucide-react";

import { AwToggle } from "@/components/AwToggle/AwToggle";

export const ToggleDemo = () => {
  return (
    <AwToggle aria-label="Toggle italic">
      <Bold className="h-4 w-4" />
    </AwToggle>
  );
};
