import { AwSeparator } from "@/components/AwSeparator";
import { AwText } from "@/components/AwText/AwText";

export const SeparatorDemo = () => {
  return (
    <div>
      <div className="flex flex-col gap-1">
        <AwText
          variant="mdMedium"
          className="leading-none font-medium"
          i18nKey="sandbox:separator.title"
        />
        <AwText
          className="text-muted-foreground"
          i18nKey="sandbox:separator.description"
        />
      </div>
      <AwSeparator className="my-4" />
      <div className="flex h-5 items-center gap-4">
        <AwText i18nKey="sandbox:separator.blog" />
        <AwSeparator orientation="vertical" />
        <AwText i18nKey="sandbox:separator.docs" />
        <AwSeparator orientation="vertical" />
        <AwText i18nKey="sandbox:separator.source" />
      </div>
    </div>
  );
};
