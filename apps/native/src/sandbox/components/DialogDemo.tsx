import { AnButton } from "@/components/AnButton/AnButton";
import {
  AnDialog,
  AnDialogClose,
  AnDialogContent,
  AnDialogDescription,
  AnDialogFooter,
  AnDialogHeader,
  AnDialogTitle,
  AnDialogTrigger,
} from "@/components/AnDialog";

export const DialogDemo = () => {
  return (
    <AnDialog>
      <AnDialogTrigger asChild>
        <AnButton
          variant="outline"
          className="web:w-fit"
          i18nKey="sandbox:dialog.form.trigger"
        />
      </AnDialogTrigger>
      <AnDialogContent>
        <AnDialogHeader>
          <AnDialogTitle i18nKey="sandbox:dialog.form.title" />
          <AnDialogDescription i18nKey="sandbox:dialog.form.description" />
        </AnDialogHeader>
        <AnDialogFooter>
          <AnDialogClose asChild>
            <AnButton variant="outline" i18nKey="common:cancel" />
          </AnDialogClose>
          <AnButton i18nKey="common:continue" />
        </AnDialogFooter>
      </AnDialogContent>
    </AnDialog>
  );
};
