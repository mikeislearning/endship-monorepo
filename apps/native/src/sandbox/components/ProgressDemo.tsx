import { useEffect, useState } from "react";

import { AnProgress } from "@/components/AnProgress";

export const ProgressDemo = () => {
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnProgress
      value={progress}
      className="native:w-full w-full self-center md:w-[60%] md:self-start"
    />
  );
};
