import { FontSource, useFonts as useExpoFonts } from "expo-font";

export const useLoadWebFonts = () => {
  useExpoFonts({
    "Inter-Regular":
      require("../../assets/fonts/Inter-Regular.ttf") as FontSource,
    "Inter-Medium":
      require("../../assets/fonts/Inter-Medium.ttf") as FontSource,
    "Inter-SemiBold":
      require("../../assets/fonts/Inter-SemiBold.ttf") as FontSource,
  });
};
