import { useEffect, useState } from "react";
import { Stack } from "expo-router";

import { LoadingScreen } from "@/blocks/LoadingScreen";
import { ScreenLayout } from "@/blocks/ScreenLayout";
import { AnBox } from "@/components/AnBox";
import { AnLink } from "@/components/AnLink";
import { AnText } from "@/components/AnText/AnText";

export default function NotFoundScreen() {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <ScreenLayout>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <AnBox className="gap-2">
            <AnText i18nKey="native:notFound.description" />
            <AnLink href="/" i18nKey="native:notFound.cta" />
          </AnBox>
        )}
      </ScreenLayout>
    </>
  );
}
