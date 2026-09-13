import { AppWindowIcon, CodeIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import { AwButton } from "@/components/AwButton/AwButton";
import {
  AwCard,
  AwCardContent,
  AwCardDescription,
  AwCardFooter,
  AwCardHeader,
  AwCardTitle,
} from "@/components/AwCard";
import { AwForm } from "@/components/AwForm";
import {
  AwTabs,
  AwTabsContent,
  AwTabsList,
  AwTabsTrigger,
} from "@/components/AwTabs/AwTabs";
import { AwTextInput } from "@/components/AwTextInput/AwTextInput";
import { useTranslator } from "@/hooks/useTranslate";
import { appLogger } from "@/utils/logger";

export const TabsDemo = () => {
  const form = useForm();
  const { t } = useTranslator();

  return (
    <div className="flex flex-col gap-6">
      <AwTabs defaultValue="account" className="max-w-100">
        <AwTabsList className="grid w-full grid-cols-2">
          <AwTabsTrigger value="account" i18nKey="sandbox:tabs.account" />
          <AwTabsTrigger value="password" i18nKey="sandbox:tabs.password" />
        </AwTabsList>
        <AwTabsContent value="account">
          <AwCard>
            <AwCardHeader>
              <AwCardTitle i18nKey="sandbox:tabs.account" />
              <AwCardDescription i18nKey="sandbox:tabs.accountDescription" />
            </AwCardHeader>
            <AwCardContent>
              <AwForm
                form={form}
                onSubmit={values => {
                  appLogger.debug("values", values);
                }}>
                <AwTextInput
                  name="tabs-demo-name"
                  control={form.control}
                  defaultValue="Coral Bot"
                  labelI18nKey="sandbox:tabs.nameLabel"
                />
                <AwTextInput
                  name="tabs-demo-username"
                  control={form.control}
                  defaultValue="@coral-bot"
                  labelI18nKey="sandbox:tabs.usernameLabel"
                />
              </AwForm>
            </AwCardContent>
            <AwCardFooter>
              <AwButton i18nKey="common:saveChanges" />
            </AwCardFooter>
          </AwCard>
        </AwTabsContent>
        <AwTabsContent value="password">
          <AwCard>
            <AwCardHeader>
              <AwCardTitle i18nKey="sandbox:tabs.password" />
              <AwCardDescription i18nKey="sandbox:tabs.passwordDescription" />
            </AwCardHeader>
            <AwCardContent>
              <AwForm
                form={form}
                onSubmit={values => {
                  appLogger.debug("values", values);
                }}>
                <AwTextInput
                  name="tabs-demo-current"
                  control={form.control}
                  type="password"
                  labelI18nKey="sandbox:tabs.currentPasswordLabel"
                />
                <AwTextInput
                  name="tabs-demo-new"
                  control={form.control}
                  type="password"
                  labelI18nKey="sandbox:tabs.newPasswordLabel"
                />
              </AwForm>
            </AwCardContent>
            <AwCardFooter>
              <AwButton i18nKey="sandbox:tabs.savePasswordCta" />
            </AwCardFooter>
          </AwCard>
        </AwTabsContent>
      </AwTabs>
      <AwTabs defaultValue="home">
        <AwTabsList>
          <AwTabsTrigger value="home" i18nKey="sandbox:tabs.home" />
          <AwTabsTrigger value="settings" i18nKey="sandbox:tabs.settings" />
        </AwTabsList>
      </AwTabs>
      <AwTabs defaultValue="home">
        <AwTabsList>
          <AwTabsTrigger value="home" i18nKey="sandbox:tabs.home" />
          <AwTabsTrigger
            value="settings"
            disabled
            i18nKey="sandbox:tabs.disabled"
          />
        </AwTabsList>
      </AwTabs>
      <AwTabs defaultValue="preview">
        <AwTabsList>
          <AwTabsTrigger value="preview">
            <AppWindowIcon />
            {t("sandbox:tabs.preview")}
          </AwTabsTrigger>
          <AwTabsTrigger value="code">
            <CodeIcon />
            {t("sandbox:tabs.code")}
          </AwTabsTrigger>
        </AwTabsList>
      </AwTabs>
    </div>
  );
};
