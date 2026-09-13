import { useState } from "react";
import { t } from "i18next";

import { AnBox } from "@/components/AnBox";
import { AnButton } from "@/components/AnButton/AnButton";
import { AnText } from "@/components/AnText/AnText";
import {
  errorToast,
  infoToast,
  regularToast,
  successToast,
  warningToast,
} from "@/utils/toast";

const allTypes = [
  {
    name: "Default",
    action: () =>
      regularToast({
        i18nKey: "sandbox:toast.default",
      }),
  },
  {
    name: "Description",
    action: () =>
      regularToast({
        i18nKey: "sandbox:toast.default",
        options: {
          description: t("sandbox:toast.description"),
        },
      }),
  },
  {
    name: "Success",
    action: () => successToast({ i18nKey: "sandbox:toast.default" }),
  },
  {
    name: "Info",
    action: () => infoToast({ i18nKey: "sandbox:toast.info" }),
  },
  {
    name: "Warning",
    action: () => warningToast({ i18nKey: "sandbox:toast.warning" }),
  },
  {
    name: "Error",
    action: () => errorToast({ i18nKey: "sandbox:toast.error" }),
  },
];

export const ToastDemo = () => {
  const [activeType, setActiveType] = useState(allTypes[0]);

  return (
    <AnBox className="flex-wrap content-center items-center justify-center gap-4 md:flex-row md:justify-start">
      {allTypes.map(type => (
        <AnButton
          variant="ghost"
          data-active={activeType?.name === type.name}
          onPress={() => {
            type.action();
            setActiveType(type);
          }}
          key={type.name}>
          <AnText variant="button">{type.name}</AnText>
        </AnButton>
      ))}
    </AnBox>
  );
};
