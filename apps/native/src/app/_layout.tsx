import "../../global.css";

import { useEffect, useState } from "react";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { PortalHost } from "@rn-primitives/portal";
import * as Sentry from "@sentry/react-native";
import { QueryClientProvider } from "@tanstack/react-query";
import {
  ErrorBoundaryProps,
  Slot,
  useNavigationContainerRef,
} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ErrorFallback } from "@/blocks/ErrorFallback";
import { AnToaster } from "@/components/AnToaster";
import { ThemeProvider } from "@/context/ThemeProvider";
import { useLoadWebFonts } from "@/hooks/useLoadWebFonts";
import { initSentry, navigationIntegration } from "@/services/sentry";
import { queryClient } from "@/utils/queryClient";
import { setupSvgStyling } from "@/utils/svg";

// Prevent the splash screen from auto-hiding before asset loading is complete.
void SplashScreen.preventAutoHideAsync();
// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

initSentry();
setupSvgStyling();

const usePlatformSpecificSetup = Platform.select({
  web: useLoadWebFonts,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  default: () => {},
});

function RootLayout() {
  const ref = useNavigationContainerRef();
  usePlatformSpecificSetup();

  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    if (ref) {
      navigationIntegration.registerNavigationContainer(ref);
    }
  }, [ref]);

  useEffect(() => {
    const initializeApp = () => {
      if (isAppReady) {
        return;
      }

      // await refreshAuthState();
      setIsAppReady(true);
    };

    void initializeApp();
  }, [isAppReady]);

  useEffect(() => {
    if (isAppReady) {
      void SplashScreen.hideAsync();
    }
  }, [isAppReady]);

  return (
    <ThemeProvider>
      <GestureHandlerRootView>
        <SafeAreaProvider>
          <KeyboardProvider>
            <QueryClientProvider client={queryClient}>
              <BottomSheetModalProvider>
                <Slot />
                <AnToaster />
                <PortalHost />
              </BottomSheetModalProvider>
            </QueryClientProvider>
          </KeyboardProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}

// Catch any errors in the root layout and display a fallback UI
export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return <ErrorFallback error={error} resetError={retry} />;
}

export default Sentry.wrap(RootLayout);
