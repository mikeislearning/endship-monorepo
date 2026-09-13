import { ArrowRightIcon, SendIcon } from "lucide-react-native";

import { AnBox } from "@/components/AnBox";
import { AnButton } from "@/components/AnButton/AnButton";

export const ButtonDemo = () => {
  return (
    <AnBox className="gap-6">
      <AnBox className="native::justify-center web:flex-row web:flex-wrap items-center gap-2 md:flex-row">
        <AnButton i18nKey="sandbox:button.default" />
        <AnButton variant="outline" i18nKey="sandbox:button.outline" />
        <AnButton variant="ghost" i18nKey="sandbox:button.ghost" />
        <AnButton variant="destructive" i18nKey="sandbox:button.destructive" />
        <AnButton variant="secondary" i18nKey="sandbox:button.secondary" />
        <AnButton variant="link" i18nKey="sandbox:button.link" />
        <AnButton
          variant="outline"
          IconComponent={SendIcon}
          i18nKey="sandbox:button.send"
        />
        <AnButton
          variant="outline"
          i18nKey="sandbox:button.learnMore"
          IconComponent={ArrowRightIcon}
          iconPosition="right"
        />
        <AnButton
          variant="outline"
          i18nKey="sandbox:button.loading"
          isLoading
        />
      </AnBox>
      <AnBox className="native:justify-center web:flex-row web:flex-wrap items-center gap-2 md:flex-row">
        <AnButton size="sm" i18nKey="sandbox:button.small" />
        <AnButton
          variant="outline"
          size="sm"
          i18nKey="sandbox:button.outline"
        />
        <AnButton variant="ghost" size="sm" i18nKey="sandbox:button.ghost" />
        <AnButton
          variant="destructive"
          size="sm"
          i18nKey="sandbox:button.destructive"
        />
        <AnButton
          variant="secondary"
          size="sm"
          i18nKey="sandbox:button.secondary"
        />
        <AnButton variant="link" size="sm" i18nKey="sandbox:button.link" />
        <AnButton
          variant="outline"
          size="sm"
          i18nKey="sandbox:button.send"
          IconComponent={SendIcon}
        />
        <AnButton
          variant="outline"
          size="sm"
          i18nKey="sandbox:button.learnMore"
          IconComponent={ArrowRightIcon}
          iconPosition="right"
        />
        <AnButton
          size="sm"
          variant="outline"
          i18nKey="sandbox:button.loading"
          isLoading
        />
      </AnBox>
      <AnBox className="native:justify-center web:flex-row web:flex-wrap items-center gap-2 md:flex-row">
        <AnButton size="lg" i18nKey="sandbox:button.large" />
        <AnButton
          variant="outline"
          size="lg"
          i18nKey="sandbox:button.outline"
        />
        <AnButton variant="ghost" size="lg" i18nKey="sandbox:button.ghost" />
        <AnButton
          variant="destructive"
          size="lg"
          i18nKey="sandbox:button.destructive"
        />
        <AnButton
          variant="secondary"
          size="lg"
          i18nKey="sandbox:button.secondary"
        />
        <AnButton variant="link" size="lg" i18nKey="sandbox:button.link" />
        <AnButton
          variant="outline"
          size="lg"
          i18nKey="sandbox:button.send"
          IconComponent={SendIcon}
        />
        <AnButton
          variant="outline"
          size="lg"
          i18nKey="sandbox:button.learnMore"
          IconComponent={ArrowRightIcon}
          iconPosition="right"
        />
        <AnButton
          size="lg"
          variant="outline"
          i18nKey="sandbox:button.loading"
          isLoading
        />
      </AnBox>
    </AnBox>
  );
};
