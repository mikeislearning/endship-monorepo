import { useState } from "react";

import { AnBox } from "@/components/AnBox";
import { AnSegmentedControl } from "@/components/AnSegmentedControl";

type PeriodType = "day" | "week" | "month";

export const SegmentedControlDemo = () => {
  const [period, setPeriod] = useState<PeriodType>("week");

  return (
    <AnBox className="w-full">
      <AnSegmentedControl<PeriodType>
        value={period}
        onChange={setPeriod}
        options={[
          { i18nKey: "sandbox:segmentedControl.day", value: "day" },
          { i18nKey: "sandbox:segmentedControl.week", value: "week" },
          { i18nKey: "sandbox:segmentedControl.month", value: "month" },
        ]}
      />
    </AnBox>
  );
};
