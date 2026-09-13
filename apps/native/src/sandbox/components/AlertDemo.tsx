import {
  AlertCircleIcon,
  CheckCircle2Icon,
  TerminalIcon,
} from "lucide-react-native";

import {
  AnAlert,
  AnAlertDescription,
  AnAlertTitle,
} from "@/components/AnAlert";
import { AnBox } from "@/components/AnBox";
import { AnText } from "@/components/AnText/AnText";

export const AlertDemo = () => {
  return (
    <AnBox className="max-w-xl items-start gap-4">
      <AnAlert icon={CheckCircle2Icon}>
        <AnAlertTitle i18nKey="sandbox:alert.successTitle" />
        <AnAlertDescription i18nKey="sandbox:alert.successDescription" />
      </AnAlert>
      <AnAlert icon={TerminalIcon}>
        <AnAlertTitle i18nKey="sandbox:alert.noDescTitle" />
      </AnAlert>
      <AnAlert variant="destructive" icon={AlertCircleIcon}>
        <AnAlertTitle i18nKey="sandbox:alert.errorTitle" />
        <AnAlertDescription
          className="text-destructive"
          i18nKey="sandbox:alert.errorDescriptionNative"
        />
        <AnBox role="list" className="ml-0.5 pb-2 pl-6">
          <AnText role="listitem" className="text-sm">
            <AnText className="web:pr-2">•</AnText> Check your card details
          </AnText>
          <AnText role="listitem" className="text-sm">
            <AnText className="web:pr-2">•</AnText> Ensure sufficient funds
          </AnText>
          <AnText role="listitem" className="text-sm">
            <AnText className="web:pr-2">•</AnText> Verify billing address
          </AnText>
        </AnBox>
      </AnAlert>
    </AnBox>
  );
};
