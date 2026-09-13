import {
  AwAlertDialog,
  AwAlertDialogAction,
  AwAlertDialogCancel,
  AwAlertDialogContent,
  AwAlertDialogDescription,
  AwAlertDialogFooter,
  AwAlertDialogHeader,
  AwAlertDialogTitle,
  AwAlertDialogTrigger,
} from "@/components/AwAlertDialog";
import { AwButton } from "@/components/AwButton/AwButton";

export const AlertDialogDemo = () => {
  return (
    <AwAlertDialog>
      <AwAlertDialogTrigger
        render={
          <AwButton variant="outline" i18nKey="sandbox:alertDialog.trigger" />
        }
      />
      <AwAlertDialogContent>
        <AwAlertDialogHeader>
          <AwAlertDialogTitle i18nKey="sandbox:alertDialog.title" />
          <AwAlertDialogDescription i18nKey="sandbox:alertDialog.description" />
        </AwAlertDialogHeader>
        <AwAlertDialogFooter>
          <AwAlertDialogCancel i18nKey="common:cancel" />
          <AwAlertDialogAction i18nKey="common:continue" />
        </AwAlertDialogFooter>
      </AwAlertDialogContent>
    </AwAlertDialog>
  );
};
