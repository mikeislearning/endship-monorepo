import { toast } from "sonner";

import { i18n, I18nKeyType } from "@/i18n";

type ToastOptionsType = Omit<
  NonNullable<Parameters<typeof toast.success>[1]>,
  "id" | "type" | "title" | "jsx" | "promise" | "variant"
> & {
  id?: string | number;
};

type ToastParamsType = {
  i18nKey: I18nKeyType;
  message?: string;
  options?: ToastOptionsType;
};

export const regularToast = ({
  i18nKey,
  message,
  options,
}: ToastParamsType) => {
  const title = message ?? i18n.t(i18nKey);
  toast(title, options);
};

export const successToast = ({
  i18nKey,
  message,
  options,
}: ToastParamsType) => {
  const title = message ?? i18n.t(i18nKey);
  toast.success(title, options);
};

export const errorToast = ({ i18nKey, message, options }: ToastParamsType) => {
  const title = message ?? i18n.t(i18nKey);
  toast.error(title, options);
};

export const infoToast = ({ i18nKey, message, options }: ToastParamsType) => {
  const title = message ?? i18n.t(i18nKey);
  toast.info(title, options);
};

export const warningToast = ({
  i18nKey,
  message,
  options,
}: ToastParamsType) => {
  const title = message ?? i18n.t(i18nKey);
  toast.warning(title, options);
};

export const dismissToast = (id: string | number) => {
  toast.dismiss(id);
};
