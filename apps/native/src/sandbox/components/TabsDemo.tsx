import { useState } from "react";
import { useForm } from "react-hook-form";

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
import { AnForm } from "@/components/AnForm";
import {
  AnTabs,
  AnTabsContent,
  AnTabsList,
  AnTabsTrigger,
} from "@/components/AnTabs";
import { AnTextInput } from "@/components/AnTextInput/AnTextInput";

export const TabsDemo = () => {
  const form = useForm();

  const [selectedTab, setSelectedTab] = useState("account");

  return (
    <AnBox className="web:flex-row web:flex-wrap w-full">
      <AnTabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="web:w-[400px]">
        <AnTabsList className="w-full">
          <AnTabsTrigger
            className="w-1/2"
            value="account"
            i18nKey="sandbox:tabs.account"
          />
          <AnTabsTrigger
            className="w-1/2"
            value="password"
            i18nKey="sandbox:tabs.password"
          />
        </AnTabsList>
        <AnTabsContent value="account">
          <AnCard>
            <AnCardHeader>
              <AnCardTitle i18nKey="sandbox:tabs.account" />
              <AnCardDescription i18nKey="sandbox:tabs.accountDescription" />
            </AnCardHeader>
            <AnCardContent>
              <AnForm
                form={form}
                onSubmit={values => {
                  form.reset(values);
                }}>
                <AnTextInput
                  name="tabs-demo-name"
                  control={form.control}
                  defaultValue="Coral Bot"
                  labelI18nKey="sandbox:tabs.nameLabel"
                />
                <AnTextInput
                  name="tabs-demo-username"
                  control={form.control}
                  defaultValue="@coral-bot"
                  labelI18nKey="sandbox:tabs.usernameLabel"
                />
              </AnForm>
            </AnCardContent>
            <AnCardFooter>
              <AnButton className="w-full" i18nKey="common:saveChanges" />
            </AnCardFooter>
          </AnCard>
        </AnTabsContent>

        <AnTabsContent value="password">
          <AnCard>
            <AnCardHeader>
              <AnCardTitle i18nKey="sandbox:tabs.password" />
              <AnCardDescription i18nKey="sandbox:tabs.passwordDescription" />
            </AnCardHeader>
            <AnCardContent>
              <AnForm
                form={form}
                onSubmit={() => {
                  form.reset();
                }}>
                <AnTextInput
                  name="tabs-demo-current"
                  control={form.control}
                  secureTextEntry
                  labelI18nKey="sandbox:tabs.currentPasswordLabel"
                />
                <AnTextInput
                  name="tabs-demo-new"
                  control={form.control}
                  secureTextEntry
                  labelI18nKey="sandbox:tabs.newPasswordLabel"
                />
              </AnForm>
            </AnCardContent>
            <AnCardFooter>
              <AnButton
                className="w-full"
                i18nKey="sandbox:tabs.savePasswordCta"
              />
            </AnCardFooter>
          </AnCard>
        </AnTabsContent>
      </AnTabs>
    </AnBox>
  );
};
