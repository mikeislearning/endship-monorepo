import { AnBox } from "@/components/AnBox";
import { AnLabel } from "@/components/AnLabel";

export const LabelDemo = () => {
  return (
    <AnBox className="gap-3">
      <AnLabel i18nKey="sandbox:label.username" />
      <AnLabel i18nKey="sandbox:label.disabled" disabled />
    </AnBox>
  );
};
