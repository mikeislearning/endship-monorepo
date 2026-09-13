import { FlashList as NFlashList } from "@shopify/flash-list";
import { CircleSlash2Icon } from "lucide-react-native";

import { AnBox } from "@/components/AnBox";
import { AnLoadingSpinner } from "@/components/AnLoadingSpinner";

import { AnIcon } from "./AnIcon";
import { AnText } from "./AnText/AnText";

type AnListPropType = {
  isLoading: boolean;
};

export const AnList = NFlashList;

export const AnEmptyList = ({ isLoading }: AnListPropType) => {
  return (
    <AnBox className="min-h-[400px] flex-1 items-center justify-center">
      {!isLoading ? (
        <AnBox>
          <AnIcon
            as={CircleSlash2Icon}
            size={40}
            className="text-muted-foreground"
          />
          <AnText className="pt-4 text-center" i18nKey="common:list.empty" />
        </AnBox>
      ) : (
        <AnLoadingSpinner />
      )}
    </AnBox>
  );
};
