import {
  AnAvatar,
  AnAvatarFallback,
  AnAvatarImage,
} from "@/components/AnAvatar";
import { AnBox } from "@/components/AnBox";

export const AvatarDemo = () => {
  return (
    <AnBox className="native:justify-center web:flex-row web:flex-wrap w-full items-center gap-2">
      <AnAvatar className="h-20 w-20" alt="@PaintingWithCode">
        <AnAvatarImage
          source={{ uri: "https://github.com/PaintingWithCode.png" }}
        />
        <AnAvatarFallback>AM</AnAvatarFallback>
      </AnAvatar>
      <AnAvatar className="h-20 w-20" alt="@PaintingWithCode">
        <AnAvatarFallback>AM</AnAvatarFallback>
      </AnAvatar>
    </AnBox>
  );
};
