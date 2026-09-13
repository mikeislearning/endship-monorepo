import { useEffect, useState } from "react";

import { AwProgress } from "@/components/AwProgress";

export const ProgressDemo = () => {
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return <AwProgress value={progress} className="w-[60%]" />;
};
