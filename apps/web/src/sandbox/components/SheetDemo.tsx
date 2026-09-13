import { useForm } from "react-hook-form";

import { AwButton } from "@/components/AwButton/AwButton";
import { AwForm } from "@/components/AwForm";
import {
  AwSheet,
  AwSheetClose,
  AwSheetContent,
  AwSheetDescription,
  AwSheetFooter,
  AwSheetHeader,
  AwSheetTitle,
  AwSheetTrigger,
} from "@/components/AwSheet";
import { AwText } from "@/components/AwText/AwText";
import { AwTextInput } from "@/components/AwTextInput/AwTextInput";
import { appLogger } from "@/utils/logger";

const SHEET_SIDES = ["top", "right", "bottom", "left"] as const;

export const SheetDemo = () => {
  const form = useForm();

  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <AwSheet>
        <AwSheetTrigger
          render={<AwButton variant="outline" i18nKey="common:open" />}
        />
        <AwSheetContent>
          <AwSheetHeader>
            <AwSheetTitle i18nKey="sandbox:sheet.editProfile.title" />
            <AwSheetDescription i18nKey="sandbox:sheet.editProfile.description" />
          </AwSheetHeader>
          <AwForm
            form={form}
            className="grid flex-1 auto-rows-min gap-6 px-4"
            onSubmit={values => {
              appLogger.debug("values", values);
            }}>
            <AwTextInput
              name="sheet-demo-name"
              labelI18nKey="sandbox:sheet.editProfile.nameLabel"
              control={form.control}
              defaultValue="Coral Bot"
            />
            <AwTextInput
              name="sheet-demo-username"
              labelI18nKey="sandbox:sheet.editProfile.usernameLabel"
              control={form.control}
              defaultValue="@coral-bot"
            />
          </AwForm>
          <AwSheetFooter>
            <AwButton type="submit" i18nKey="common:saveChanges" />
            <AwSheetClose
              render={<AwButton variant="outline" i18nKey="common:cancel" />}
            />
          </AwSheetFooter>
        </AwSheetContent>
      </AwSheet>
      <div className="flex gap-2">
        {SHEET_SIDES.map(side => (
          <AwSheet key={side}>
            <AwSheetTrigger
              render={<AwButton variant="outline" className="capitalize" />}>
              {side}
            </AwSheetTrigger>
            <AwSheetContent side={side}>
              <AwSheetHeader>
                <AwSheetTitle i18nKey="sandbox:sheet.editProfile.title" />
                <AwSheetDescription i18nKey="sandbox:sheet.editProfile.description" />
              </AwSheetHeader>
              <div className="overflow-y-auto px-4 text-sm">
                <AwText variant="headerThree">Lorem Ipsum</AwText>
                {Array.from({ length: 10 }).map((_, index) => (
                  <AwText key={index} className="mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </AwText>
                ))}
              </div>
              <AwSheetFooter>
                <AwButton type="submit" i18nKey="common:saveChanges" />
                <AwSheetClose
                  render={
                    <AwButton variant="outline" i18nKey="common:cancel" />
                  }
                />
              </AwSheetFooter>
            </AwSheetContent>
          </AwSheet>
        ))}
      </div>
    </div>
  );
};
