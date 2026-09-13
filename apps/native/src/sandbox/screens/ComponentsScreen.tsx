import { ScreenLayout } from "@/blocks/ScreenLayout";
import { AnBox } from "@/components/AnBox";

import { COMPONENTS } from "../helpers";
import { SandboxContainer } from "../SandboxContainer";

export const ComponentsScreen = () => {
  return (
    <ScreenLayout>
      <AnBox className="mt-safe-offset-10 web:mt-6 mb-6 gap-4">
        {COMPONENTS.map(({ i18nKey, descriptionI18nKey, DemoComponent }) => (
          <SandboxContainer
            key={i18nKey}
            titleI18nKey={i18nKey}
            descriptionI18nKey={descriptionI18nKey}>
            <DemoComponent />
          </SandboxContainer>
        ))}
      </AnBox>
    </ScreenLayout>
  );
};
