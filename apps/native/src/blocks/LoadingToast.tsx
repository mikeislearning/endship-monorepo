import { Fragment } from "react";
import { Modal } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FullWindowOverlay as RNFullWindowOverlay } from "react-native-screens";

import { AnBox } from "@/components/AnBox";
import { AnLoadingSpinner } from "@/components/AnLoadingSpinner";
import { AnText } from "@/components/AnText/AnText";
import { usePlatformOS } from "@/hooks/usePlatformOS";
import { cn } from "@/utils/tailwind";

/** Extra space below status bar / notch so the card clears system UI. */
const TOP_INSET_GAP = 12;

type LoadingToastPropsType = {
  message: string;
};

export const LoadingToast = ({ message }: LoadingToastPropsType) => {
  const { isAndroid, isIOS, isWeb } = usePlatformOS();
  const FullWindowOverlay = isIOS ? RNFullWindowOverlay : Fragment;
  const { top } = useSafeAreaInsets();
  const paddingTop = top + TOP_INSET_GAP;

  const card = (
    <AnBox className="border-border bg-card shadow-foreground/10 w-full flex-row items-center gap-4 rounded-sm border p-4 shadow-lg">
      <AnLoadingSpinner size={32} />
      <AnText variant="mdMedium" className="flex-1 text-wrap">
        {message}
      </AnText>
    </AnBox>
  );

  const overlayPadClassName = "justify-start bg-black/70 px-8";

  if (isAndroid) {
    return (
      <Modal
        transparent
        statusBarTranslucent
        animationType="fade"
        visible
        onRequestClose={() => undefined}>
        <AnBox
          className={`flex-1 ${overlayPadClassName}`}
          style={{ paddingTop }}>
          {card}
        </AnBox>
      </Modal>
    );
  }

  return (
    <FullWindowOverlay>
      <AnBox
        className={cn(
          "absolute bottom-0 left-0 right-0 top-0 z-50",
          isWeb && "fixed",
          overlayPadClassName,
        )}
        style={{ paddingTop }}>
        {card}
      </AnBox>
    </FullWindowOverlay>
  );
};
