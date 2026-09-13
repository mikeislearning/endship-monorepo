import { ComponentProps } from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { useAtomValue } from "jotai";

import {
  AwAlertDialog,
  AwAlertDialogAction,
  AwAlertDialogCancel,
  AwAlertDialogContent,
  AwAlertDialogDescription,
  AwAlertDialogFooter,
  AwAlertDialogHeader,
  AwAlertDialogTitle,
} from "@/components/AwAlertDialog";
import { useTranslator } from "@/hooks/useTranslate";
import { I18nKeyType } from "@/i18n";
import { discardChangesAtom } from "@/stores/atoms";

type DiscardFormChangesDialogType = ComponentProps<
  typeof AlertDialogPrimitive.Root
> & {
  titleI18nKey?: I18nKeyType;
  descriptionI18nKey?: I18nKeyType;
  cancelButtonI18nKey?: I18nKeyType;
  confirmButtonI18nKey?: I18nKeyType;
  isOpen?: boolean;
  onConfirm: () => void;
};

export const DiscardFormChangesDialog = ({
  titleI18nKey = "common:discardFormChangesDialog.title",
  descriptionI18nKey = "common:discardFormChangesDialog.description",
  cancelButtonI18nKey = "common:discardFormChangesDialog.cancelButton",
  confirmButtonI18nKey = "common:discardFormChangesDialog.confirmButton",
  isOpen,
  onConfirm,
  ...rest
}: DiscardFormChangesDialogType) => {
  const { t } = useTranslator();

  const discardChangesValues = useAtomValue(discardChangesAtom);

  return (
    <AwAlertDialog {...rest}>
      <AwAlertDialogContent>
        <AwAlertDialogHeader>
          <AwAlertDialogTitle i18nKey={titleI18nKey} />
          <AwAlertDialogDescription
            i18nKey={descriptionI18nKey}
            i18nOptions={{
              entity: t(
                discardChangesValues?.entityI18nKeyType ??
                  "common:discardFormChangesDialog.entity",
              ),
              action: t(
                discardChangesValues?.action === "UPDATE"
                  ? "common:discardFormChangesDialog.updating"
                  : "common:discardFormChangesDialog.creating",
              ),
            }}
          />
        </AwAlertDialogHeader>
        <AwAlertDialogFooter>
          <AwAlertDialogCancel i18nKey={cancelButtonI18nKey} />
          <AwAlertDialogAction
            i18nKey={confirmButtonI18nKey}
            onClick={onConfirm}
          />
        </AwAlertDialogFooter>
      </AwAlertDialogContent>
    </AwAlertDialog>
  );
};
