import { AnBadge } from "@/components/AnBadge/AnBadge";
import { AnBox } from "@/components/AnBox";

export const BadgeDemo = () => {
  return (
    <AnBox className="native:justify-center web:flex-row web:flex-wrap w-full items-center gap-2">
      <AnBadge i18nKey="sandbox:badge.default" />
      <AnBadge variant="secondary" i18nKey="sandbox:badge.secondary" />
      <AnBadge variant="destructive" i18nKey="sandbox:badge.destructive" />
      <AnBadge variant="outline" i18nKey="sandbox:badge.outline" />
    </AnBox>
  );
};
