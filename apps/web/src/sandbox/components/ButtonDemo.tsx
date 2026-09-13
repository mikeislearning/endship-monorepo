import { ArrowRightIcon, SendIcon } from "lucide-react";

import { AwButton } from "@/components/AwButton/AwButton";

export const ButtonDemo = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-2 md:flex-row">
        <AwButton i18nKey="sandbox:button.default" />
        <AwButton variant="outline" i18nKey="sandbox:button.outline" />
        <AwButton variant="ghost" i18nKey="sandbox:button.ghost" />
        <AwButton variant="destructive" i18nKey="sandbox:button.destructive" />
        <AwButton variant="secondary" i18nKey="sandbox:button.secondary" />
        <AwButton variant="link" i18nKey="sandbox:button.link" />
        <AwButton
          variant="outline"
          iconComponent={<SendIcon />}
          i18nKey="sandbox:button.send"
        />
        <AwButton
          variant="outline"
          i18nKey="sandbox:button.learnMore"
          iconComponent={<ArrowRightIcon />}
          iconPosition="right"
        />
        <AwButton
          variant="outline"
          i18nKey="sandbox:button.loading"
          isLoading
        />
      </div>
      <div className="flex flex-wrap items-center gap-2 md:flex-row">
        <AwButton size="sm" i18nKey="sandbox:button.small" />
        <AwButton
          variant="outline"
          size="sm"
          i18nKey="sandbox:button.outline"
        />
        <AwButton variant="ghost" size="sm" i18nKey="sandbox:button.ghost" />
        <AwButton
          variant="destructive"
          size="sm"
          i18nKey="sandbox:button.destructive"
        />
        <AwButton
          variant="secondary"
          size="sm"
          i18nKey="sandbox:button.secondary"
        />
        <AwButton variant="link" size="sm" i18nKey="sandbox:button.link" />
        <AwButton
          variant="outline"
          size="sm"
          i18nKey="sandbox:button.send"
          iconComponent={<SendIcon />}
        />
        <AwButton
          variant="outline"
          size="sm"
          i18nKey="sandbox:button.learnMore"
          iconComponent={<ArrowRightIcon />}
          iconPosition="right"
        />
        <AwButton
          size="sm"
          variant="outline"
          i18nKey="sandbox:button.loading"
          isLoading
        />
      </div>
      <div className="flex flex-wrap items-center gap-2 md:flex-row">
        <AwButton size="lg" i18nKey="sandbox:button.large" />
        <AwButton
          variant="outline"
          size="lg"
          i18nKey="sandbox:button.outline"
        />
        <AwButton variant="ghost" size="lg" i18nKey="sandbox:button.ghost" />
        <AwButton
          variant="destructive"
          size="lg"
          i18nKey="sandbox:button.destructive"
        />
        <AwButton
          variant="secondary"
          size="lg"
          i18nKey="sandbox:button.secondary"
        />
        <AwButton variant="link" size="lg" i18nKey="sandbox:button.link" />
        <AwButton
          variant="outline"
          size="lg"
          i18nKey="sandbox:button.send"
          iconComponent={<SendIcon />}
        />
        <AwButton
          variant="outline"
          size="lg"
          i18nKey="sandbox:button.learnMore"
          iconComponent={<ArrowRightIcon />}
          iconPosition="right"
        />
        <AwButton
          size="lg"
          variant="outline"
          i18nKey="sandbox:button.loading"
          isLoading
        />
      </div>
    </div>
  );
};
