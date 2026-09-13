import { useState } from "react";
import { t } from "i18next";

import { AwButton } from "@/components/AwButton/AwButton";
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
    action: () => regularToast({ i18nKey: "sandbox:toast.default" }),
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

export const SonnerDemo = () => {
  const [activeType, setActiveType] = useState(allTypes[0]);

  return (
    <div className="flex flex-wrap gap-4">
      {allTypes.map(type => (
        <AwButton
          variant="ghost"
          data-active={activeType?.name === type.name}
          onClick={() => {
            type.action();
            setActiveType(type);
          }}
          key={type.name}>
          {type.name}
        </AwButton>
      ))}
    </div>
  );
};
