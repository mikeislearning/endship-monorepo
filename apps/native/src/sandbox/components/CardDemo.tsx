import { AnBox } from "@/components/AnBox";
import { AnButton } from "@/components/AnButton/AnButton";
import {
  AnCard,
  AnCardContent,
  AnCardDescription,
  AnCardFooter,
  AnCardHeader,
  AnCardTitle,
} from "@/components/AnCard";
import { AnText } from "@/components/AnText/AnText";
import { usePlatformOS } from "@/hooks/usePlatformOS";

export const CardDemo = () => {
  const { isNative } = usePlatformOS();

  return (
    <AnBox className="w-full gap-4">
      <AnCard>
        <AnCardHeader>
          <AnCardTitle i18nKey="sandbox:card.meetingNotes.title" />
          <AnCardDescription i18nKey="sandbox:card.meetingNotes.description" />
        </AnCardHeader>
        <AnCardContent>
          <AnText>
            Client requested dashboard redesign with focus on mobile
            responsiveness.
          </AnText>
          <AnBox className="web:pl-6 mt-4 flex flex-col gap-2 pl-2.5">
            <AnText>1. New analytics widgets for daily/weekly metrics</AnText>
            <AnText>2. Simplified navigation menu</AnText>
            <AnText>3. Dark mode support</AnText>
            <AnText>4. Timeline: 6 weeks</AnText>
            <AnText>5. Follow-up meeting scheduled for next Tuesday</AnText>
          </AnBox>
        </AnCardContent>
        <AnCardFooter className="justify-between gap-2 sm:justify-end">
          <AnButton
            variant="outline"
            className="flex-1 sm:w-24 sm:flex-none"
            size={isNative ? "default" : "sm"}
            i18nKey="common:cancel"
          />
          <AnButton
            className="flex-1 sm:w-24 sm:flex-none"
            size={isNative ? "default" : "sm"}
            i18nKey="common:save"
          />
        </AnCardFooter>
      </AnCard>
      <AnCard>
        <AnCardHeader>
          <AnCardTitle i18nKey="sandbox:card.meta.headerOnlyTitle" />
          <AnCardDescription i18nKey="sandbox:card.meta.headerOnlyDescription" />
        </AnCardHeader>
      </AnCard>
      <AnCard>
        <AnCardContent>
          <AnText i18nKey="sandbox:card.meta.contentOnly" />
        </AnCardContent>
      </AnCard>
    </AnBox>
  );
};
