import {
  BellIcon,
  CheckIcon,
  HeartIcon,
  HomeIcon,
  SearchIcon,
  SettingsIcon,
  StarIcon,
  UserIcon,
  XIcon,
  ZapIcon,
} from "lucide-react-native";

import { AnBox } from "@/components/AnBox";
import { AnIcon } from "@/components/AnIcon";

export const IconDemo = () => {
  return (
    <AnBox className="flex-row flex-wrap gap-4">
      <AnIcon as={HomeIcon} size={24} />
      <AnIcon as={SearchIcon} size={24} />
      <AnIcon as={BellIcon} size={24} />
      <AnIcon as={SettingsIcon} size={24} />
      <AnIcon as={UserIcon} size={24} />
      <AnIcon as={HeartIcon} size={24} className="text-destructive" />
      <AnIcon as={StarIcon} size={24} className="text-chart-4" />
      <AnIcon as={CheckIcon} size={24} className="text-chart-1" />
      <AnIcon as={XIcon} size={24} className="text-destructive" />
      <AnIcon as={ZapIcon} size={24} className="text-primary" />
    </AnBox>
  );
};
