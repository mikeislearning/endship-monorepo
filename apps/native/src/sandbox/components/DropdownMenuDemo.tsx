import {
  MoreHorizontalIcon,
  PencilIcon,
  ShareIcon,
  TrashIcon,
} from "lucide-react-native";

import { AnBox } from "@/components/AnBox";
import { AnButton } from "@/components/AnButton/AnButton";
import {
  AnDropdownMenu,
  AnDropdownMenuContent,
  AnDropdownMenuGroup,
  AnDropdownMenuItem,
  AnDropdownMenuSeparator,
  AnDropdownMenuTrigger,
} from "@/components/AnDropdownMenu";
import { AnIcon } from "@/components/AnIcon";
import { AnText } from "@/components/AnText/AnText";

export const DropdownMenuDemo = () => {
  return (
    <AnBox className="native:justify-center web:flex-row web:flex-wrap w-full items-center gap-2">
      <AnDropdownMenu>
        <AnDropdownMenuTrigger asChild>
          <AnButton variant="ghost" size="icon">
            <AnIcon as={MoreHorizontalIcon} />
          </AnButton>
        </AnDropdownMenuTrigger>
        <AnDropdownMenuContent>
          <AnDropdownMenuGroup>
            <AnDropdownMenuItem>
              <AnIcon as={PencilIcon} />
              <AnText i18nKey="common:edit" />
            </AnDropdownMenuItem>
            <AnDropdownMenuItem>
              <AnIcon as={ShareIcon} />
              <AnText i18nKey="common:share" />
            </AnDropdownMenuItem>
            <AnDropdownMenuSeparator />
            <AnDropdownMenuItem variant="destructive">
              <AnIcon as={TrashIcon} className="text-destructive" />
              <AnText i18nKey="common:delete" />
            </AnDropdownMenuItem>
          </AnDropdownMenuGroup>
        </AnDropdownMenuContent>
      </AnDropdownMenu>
    </AnBox>
  );
};
