import {
  AwAccordion,
  AwAccordionContent,
  AwAccordionItem,
  AwAccordionTrigger,
} from "@/components/AwAccordion";
import { AwText } from "@/components/AwText/AwText";

export const AccordionDemo = () => {
  return (
    <div className="grid w-full max-w-xl gap-4">
      <AwAccordion defaultValue={["item-1"]} className="w-full">
        <AwAccordionItem value="item-1">
          <AwAccordionTrigger>
            <AwText variant="mdMedium" i18nKey="sandbox:accordion.triggerOne" />
          </AwAccordionTrigger>
          <AwAccordionContent>
            <AwText i18nKey="sandbox:accordion.contentOne" />
          </AwAccordionContent>
        </AwAccordionItem>
        <AwAccordionItem value="item-2">
          <AwAccordionTrigger>
            <AwText variant="mdMedium" i18nKey="sandbox:accordion.triggerTwo" />
          </AwAccordionTrigger>
          <AwAccordionContent>
            <AwText i18nKey="sandbox:accordion.contentTwo" />
          </AwAccordionContent>
        </AwAccordionItem>
        <AwAccordionItem value="item-3">
          <AwAccordionTrigger>
            <AwText
              variant="mdMedium"
              i18nKey="sandbox:accordion.triggerThree"
            />
          </AwAccordionTrigger>
          <AwAccordionContent>
            <AwText i18nKey="sandbox:accordion.contentThree" />
          </AwAccordionContent>
        </AwAccordionItem>
      </AwAccordion>
    </div>
  );
};
