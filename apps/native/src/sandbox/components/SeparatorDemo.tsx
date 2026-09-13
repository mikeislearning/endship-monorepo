import { AnBox } from "@/components/AnBox";
import { AnSeparator } from "@/components/AnSeparator";
import { AnText } from "@/components/AnText/AnText";

export const SeparatorDemo = () => {
  return (
    <AnBox>
      <AnBox className="gap-1">
        <AnText
          variant="mdMedium"
          className="leading-none"
          i18nKey="sandbox:separator.title"
        />
        <AnText
          className="text-muted-foreground"
          i18nKey="sandbox:separator.description"
        />
      </AnBox>
      <AnSeparator className="my-4" />
      <AnBox className="h-5 flex-row items-center gap-4">
        <AnText i18nKey="sandbox:separator.blog" />
        <AnSeparator orientation="vertical" />
        <AnText i18nKey="sandbox:separator.docs" />
        <AnSeparator orientation="vertical" />
        <AnText i18nKey="sandbox:separator.source" />
      </AnBox>
    </AnBox>
  );
};
