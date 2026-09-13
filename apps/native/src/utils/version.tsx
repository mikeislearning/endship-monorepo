import * as Application from "expo-application";
import { Platform } from "react-native";

export const getPhoneDeviceVersion = (): string => {
  if (Platform.OS === "web") {
    return "1";
  }

  const id = Application.nativeApplicationVersion;
  const version = Application.nativeBuildVersion;

  return `${id} - ${version}`;
};

export const getBundleId = (): string | null => {
  if (Platform.OS === "web") {
    return "2";
  }

  return Application.applicationId;
};
