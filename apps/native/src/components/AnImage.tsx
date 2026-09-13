import { Image, ImageProps } from "expo-image";

export const AnImage = ({ contentFit = "cover", ...props }: ImageProps) => {
  return <Image contentFit={contentFit} {...props} />;
};
