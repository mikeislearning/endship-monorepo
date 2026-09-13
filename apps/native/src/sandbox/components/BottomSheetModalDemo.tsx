import { useRef } from "react";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";

import { AnBottomSheetModal } from "@/components/AnBottomSheetModal";
import { AnButton } from "@/components/AnButton/AnButton";
import { AnText } from "@/components/AnText/AnText";

export const BottomSheetModalDemo = () => {
  const bottomSheetRef = useRef<BottomSheetModal<unknown>>(null);

  return (
    <>
      <AnButton
        variant="outline"
        className="web:w-fit"
        i18nKey="sandbox:bottomSheetModal.trigger"
        onPress={() => {
          bottomSheetRef.current?.present();
        }}
      />
      <AnBottomSheetModal
        ref={bottomSheetRef}
        i18nKey="sandbox:bottomSheetModal.title"
        subtitleI18nKey="sandbox:bottomSheetModal.subtitle">
        <BottomSheetScrollView contentContainerClassName="p-4 pb-safe-or-8">
          {Array.from({ length: 10 }).map((_, index) => (
            <AnText key={index} className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </AnText>
          ))}
        </BottomSheetScrollView>
      </AnBottomSheetModal>
    </>
  );
};
