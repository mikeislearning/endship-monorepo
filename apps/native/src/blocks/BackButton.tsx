import { useRouter } from "expo-router";
import { ArrowLeftIcon } from "lucide-react-native";
import { Pressable } from "react-native";

import { AnIcon } from "@/components/AnIcon";
import { cn } from "@/utils/tailwind";

type BackButtonPropsType = {
  className?: string;
};

export const BackButton = ({ className }: BackButtonPropsType) => {
  const router = useRouter();

  return (
    <Pressable className={cn(className)} onPress={() => router.back()}>
      <AnIcon as={ArrowLeftIcon} size={20} />
    </Pressable>
  );
};
