import { AnBox } from "@/components/AnBox";
import { AnLabel } from "@/components/AnLabel";
import { AnText } from "@/components/AnText/AnText";
import { TextVariantType } from "@/components/AnText/variants";

const TEXT_VARIANTS: {
  name: string;
  variant: TextVariantType;
}[] = [
  { name: "Title", variant: "title" },
  { name: "Header 1", variant: "headerOne" },
  { name: "Header 2", variant: "headerTwo" },
  { name: "Header 3", variant: "headerThree" },
  { name: "Large", variant: "lg" },
  { name: "Large (Medium)", variant: "lgMedium" },
  { name: "Large (Bold)", variant: "lgBold" },
  { name: "Medium", variant: "md" },
  { name: "Medium (Medium)", variant: "mdMedium" },
  { name: "Medium (Bold)", variant: "mdBold" },
  { name: "Small", variant: "sm" },
  { name: "Small (Medium)", variant: "smMedium" },
  { name: "Small (Bold)", variant: "smBold" },
];

export const TextDemo = () => {
  return (
    <AnBox className="gap-4">
      {TEXT_VARIANTS.map(({ name, variant }) => (
        <AnBox key={name}>
          <AnLabel className="text-muted-foreground">{name}</AnLabel>
          <AnText variant={variant} i18nKey="sandbox:text.copy" />
        </AnBox>
      ))}
    </AnBox>
  );
};
