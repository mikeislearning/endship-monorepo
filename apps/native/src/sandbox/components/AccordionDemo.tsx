import {
  AnAccordion,
  AnAccordionContent,
  AnAccordionItem,
  AnAccordionTrigger,
} from "@/components/AnAccordion";
import { AnBox } from "@/components/AnBox";
import { AnText } from "@/components/AnText/AnText";

export const AccordionDemo = () => {
  return (
    <AnBox className="w-full max-w-xl gap-4">
      <AnAccordion type="single" collapsible className="w-full">
        <AnAccordionItem value="item-1">
          <AnAccordionTrigger>
            <AnText variant="mdMedium" i18nKey="sandbox:accordion.triggerOne" />
          </AnAccordionTrigger>
          <AnAccordionContent>
            <AnText i18nKey="sandbox:accordion.contentOne" />
          </AnAccordionContent>
        </AnAccordionItem>
        <AnAccordionItem value="item-2">
          <AnAccordionTrigger>
            <AnText variant="mdMedium" i18nKey="sandbox:accordion.triggerTwo" />
          </AnAccordionTrigger>
          <AnAccordionContent>
            <AnText i18nKey="sandbox:accordion.contentTwo" />
          </AnAccordionContent>
        </AnAccordionItem>
        <AnAccordionItem value="item-3">
          <AnAccordionTrigger>
            <AnText
              variant="mdMedium"
              i18nKey="sandbox:accordion.triggerThree"
            />
          </AnAccordionTrigger>
          <AnAccordionContent>
            <AnText i18nKey="sandbox:accordion.contentThree" />
          </AnAccordionContent>
        </AnAccordionItem>
      </AnAccordion>
    </AnBox>
  );
};
