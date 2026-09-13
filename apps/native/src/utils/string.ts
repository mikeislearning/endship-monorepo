import { createDefaultMaskGenerator, mask } from "react-hook-mask";

export const phoneNumberMask = createDefaultMaskGenerator("(999) 999-9999");

export const getMaskedPhoneNumber = (value: string): string => {
  return mask(value, phoneNumberMask);
};
