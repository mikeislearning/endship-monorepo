import {
  AnAlertDialog,
  AnAlertDialogAction,
  AnAlertDialogCancel,
  AnAlertDialogContent,
  AnAlertDialogDescription,
  AnAlertDialogFooter,
  AnAlertDialogHeader,
  AnAlertDialogTitle,
  AnAlertDialogTrigger,
} from "@/components/AnAlertDialog";
import { AnButton } from "@/components/AnButton/AnButton";

export const AlertDialogDemo = () => {
  return (
    <AnAlertDialog>
      <AnAlertDialogTrigger asChild>
        <AnButton
          variant="outline"
          className="web:w-fit"
          i18nKey="sandbox:alertDialog.trigger"
        />
      </AnAlertDialogTrigger>
      <AnAlertDialogContent>
        <AnAlertDialogHeader>
          <AnAlertDialogTitle i18nKey="sandbox:alertDialog.title" />
          <AnAlertDialogDescription i18nKey="sandbox:alertDialog.description" />
        </AnAlertDialogHeader>
        <AnAlertDialogFooter>
          <AnAlertDialogCancel i18nKey="common:cancel" />
          <AnAlertDialogAction i18nKey="common:continue" />
        </AnAlertDialogFooter>
      </AnAlertDialogContent>
    </AnAlertDialog>
  );
};
