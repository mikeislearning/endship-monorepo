import { AwLabel } from "@/components/AwLabel";
import { AwText } from "@/components/AwText/AwText";

import { TEXT_VARIANTS } from "../helpers";

export const TextDemo = () => {
  return (
    <div className="grid gap-4">
      {TEXT_VARIANTS.map(({ name, variant }) => (
        <div className="grid" key={name}>
          <AwLabel className="text-muted-foreground">{name}</AwLabel>
          <AwText variant={variant} i18nKey="sandbox:text.copy" />
        </div>
      ))}
    </div>
  );
};
