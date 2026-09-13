import { AwBadge } from "@/components/AwBadge/AwBadge";

export const BadgeDemo = () => {
  return (
    <div className="flex w-full flex-wrap gap-2">
      <AwBadge i18nKey="sandbox:badge.default" />
      <AwBadge variant="secondary" i18nKey="sandbox:badge.secondary" />
      <AwBadge variant="destructive" i18nKey="sandbox:badge.destructive" />
      <AwBadge variant="outline" i18nKey="sandbox:badge.outline" />
    </div>
  );
};
