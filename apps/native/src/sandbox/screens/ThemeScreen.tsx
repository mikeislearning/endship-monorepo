import { ScreenLayout } from "@/blocks/ScreenLayout";
import { AnBox } from "@/components/AnBox";
import { AnText } from "@/components/AnText/AnText";
import { useAppTheme } from "@/hooks/useAppTheme";
import { SandboxContainer } from "@/sandbox/SandboxContainer";

export const ThemeScreen = () => {
  const { resolvedColors } = useAppTheme();

  return (
    <ScreenLayout>
      <AnBox className="mt-safe-offset-10 web:mt-6 mb-6 gap-4">
        <SandboxContainer
          titleI18nKey="sandbox:theme.paletteTitle"
          descriptionI18nKey="sandbox:theme.blurb">
          <AnBox className="flex flex-row flex-wrap justify-between gap-x-2 gap-y-8 p-4 pb-2">
            {Object.keys(resolvedColors).map(name => (
              <AnBox
                key={name}
                className="web:basis-[30%] web:md:basis-[24%] flex basis-[45%] flex-col items-center gap-2">
                <AnBox
                  className="border-1 shadow-foreground/5 h-12 w-12 rounded-full shadow-sm"
                  style={{
                    backgroundColor:
                      resolvedColors[name as keyof typeof resolvedColors],
                  }}
                />
                <AnBox className="flex flex-col items-center justify-center text-center">
                  <AnText className="text-center opacity-90" variant="mdMedium">
                    {name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()}
                  </AnText>
                  <AnText className="text-muted-foreground font-mono">
                    {resolvedColors[name as keyof typeof resolvedColors]}
                  </AnText>
                </AnBox>
              </AnBox>
            ))}
          </AnBox>
        </SandboxContainer>
      </AnBox>
    </ScreenLayout>
  );
};
