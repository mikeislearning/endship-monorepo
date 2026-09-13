import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";

import {
  AwAlert,
  AwAlertDescription,
  AwAlertTitle,
} from "@/components/AwAlert/AwAlert";
import { AwButton } from "@/components/AwButton/AwButton";
import { AwText } from "@/components/AwText/AwText";

export const AlertDemo = () => {
  return (
    <div className="grid max-w-xl items-start gap-4">
      <AwAlert>
        <CheckCircle2Icon />
        <AwAlertTitle i18nKey="sandbox:alert.successTitle" />
        <AwAlertDescription i18nKey="sandbox:alert.successDescription" />
      </AwAlert>
      <AwAlert>
        <AlertCircleIcon />
        <AwAlertTitle i18nKey="sandbox:alert.extendedTitle" />
        <AwAlertDescription i18nKey="sandbox:alert.extendedDescription" />
      </AwAlert>
      <AwAlert variant="destructive">
        <AlertCircleIcon />
        <AwAlertTitle i18nKey="sandbox:alert.errorTitle" />
        <AwAlertDescription>
          <AwText
            as="div"
            i18nKey="sandbox:alert.errorDescription"
            i18nProps={{
              components: {
                ul: <ul className="list-inside list-disc text-sm" />,
                li: <li />,
              },
            }}
          />
        </AwAlertDescription>
      </AwAlert>
      <AwAlert>
        <CheckCircle2Icon />
        <AwAlertTitle
          className="max-w-[calc(100%-4rem)] text-ellipsis"
          i18nKey="sandbox:alert.actionTitle"
        />
        <AwButton
          size="sm"
          variant="outline"
          className="absolute top-2.5 right-3 h-6 shadow-none"
          i18nKey="sandbox:alert.actionCta"
        />
      </AwAlert>
    </div>
  );
};
