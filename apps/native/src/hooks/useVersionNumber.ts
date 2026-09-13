import { getPhoneDeviceVersion } from "@/utils/version";

export const useVersionNumber = () => {
  const versionNumber = `${getPhoneDeviceVersion()}`;

  return { versionNumber };
};
