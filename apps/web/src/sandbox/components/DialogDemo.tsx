import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { AwButton } from "@/components/AwButton/AwButton";
import {
  AwDialog,
  AwDialogClose,
  AwDialogContent,
  AwDialogDescription,
  AwDialogFooter,
  AwDialogHeader,
  AwDialogTitle,
  AwDialogTrigger,
} from "@/components/AwDialog";
import { AwForm } from "@/components/AwForm";
import { AwTextInput } from "@/components/AwTextInput/AwTextInput";
import { appLogger } from "@/utils/logger";

export const DialogDemo = () => {
  return (
    <div className="flex flex-col items-start gap-4 md:flex-row">
      <DialogWithForm />
      <DialogScrollableContent />
      <DialogWithStickyFooter />
    </div>
  );
};

const DialogWithForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm();
  const { reset } = form;

  useEffect(() => {
    // Reset the form when the dialog is closed
    if (!isOpen) {
      reset();
    }
  }, [reset, isOpen]);

  return (
    <AwDialog open={isOpen} onOpenChange={setIsOpen}>
      <AwForm
        form={form}
        onSubmit={values => {
          appLogger.debug("values", values);
        }}>
        <AwDialogTrigger
          render={
            <AwButton variant="outline" i18nKey="sandbox:dialog.form.trigger" />
          }
        />
        <AwDialogContent className="sm:max-w-106.25">
          <AwDialogHeader>
            <AwDialogTitle i18nKey="sandbox:dialog.form.title" />
            <AwDialogDescription i18nKey="sandbox:dialog.form.description" />
          </AwDialogHeader>
          <div className="grid gap-4">
            <AwTextInput
              name="name"
              control={form.control}
              labelI18nKey="sandbox:dialog.form.nameLabel"
            />
            <AwTextInput
              name="username"
              control={form.control}
              labelI18nKey="sandbox:dialog.form.usernameLabel"
            />
          </div>
          <AwDialogFooter>
            <AwDialogClose
              render={<AwButton variant="outline" i18nKey="common:cancel" />}
            />
            <AwButton type="submit" i18nKey="common:saveChanges" />
          </AwDialogFooter>
        </AwDialogContent>
      </AwForm>
    </AwDialog>
  );
};

const DialogScrollableContent = () => {
  return (
    <AwDialog>
      <AwDialogTrigger
        render={
          <AwButton
            variant="outline"
            i18nKey="sandbox:dialog.scrollableContent.trigger"
          />
        }
      />
      <AwDialogContent className="sm:max-w-106.25">
        <AwDialogHeader>
          <AwDialogTitle i18nKey="sandbox:dialog.scrollableContent.title" />
          <AwDialogDescription i18nKey="sandbox:dialog.scrollableContent.description" />
        </AwDialogHeader>
        <div className="-mx-6 max-h-125 overflow-y-auto px-6 text-sm">
          <h4 className="mb-4 text-lg leading-none font-medium">Lorem Ipsum</h4>
          {Array.from({ length: 10 }).map((_, index) => (
            <p key={index} className="mb-4 leading-normal">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          ))}
        </div>
      </AwDialogContent>
    </AwDialog>
  );
};

const DialogWithStickyFooter = () => {
  return (
    <AwDialog>
      <AwDialogTrigger
        render={
          <AwButton
            variant="outline"
            i18nKey="sandbox:dialog.stickyFooter.trigger"
          />
        }
      />
      <AwDialogContent className="sm:max-w-lg">
        <AwDialogHeader>
          <AwDialogTitle i18nKey="sandbox:dialog.stickyFooter.title" />
          <AwDialogDescription i18nKey="sandbox:dialog.stickyFooter.description" />
        </AwDialogHeader>
        <div className="-mx-6 max-h-125 overflow-y-auto px-6 text-sm">
          <h4 className="mb-4 text-lg leading-none font-medium">Lorem Ipsum</h4>
          {Array.from({ length: 10 }).map((_, index) => (
            <p key={index} className="mb-4 leading-normal">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          ))}
        </div>
        <AwDialogFooter>
          <AwDialogClose
            render={<AwButton variant="outline" i18nKey="common:close" />}
          />
        </AwDialogFooter>
      </AwDialogContent>
    </AwDialog>
  );
};
