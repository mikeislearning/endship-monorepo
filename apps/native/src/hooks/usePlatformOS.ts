import { Platform } from "react-native";

export const usePlatformOS = () => {
  return {
    isWeb: Platform.OS === "web",
    isIOS: Platform.OS === "ios",
    isAndroid: Platform.OS === "android",
    isNative: ["ios", "android"].includes(Platform.OS),
  };
};
