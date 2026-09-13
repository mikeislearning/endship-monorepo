import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react";

import {
  AwNavigationMenu,
  AwNavigationMenuContent,
  AwNavigationMenuItem,
  AwNavigationMenuLink,
  AwNavigationMenuList,
  AwNavigationMenuTrigger,
} from "@/components/AwNavigationMenu/AwNavigationMenu";
import { navigationMenuTriggerVariants } from "@/components/AwNavigationMenu/variants";
import { AwText } from "@/components/AwText/AwText";
import { useTranslator } from "@/hooks/useTranslate";

export const NavigationMenuDemo = () => {
  const { t } = useTranslator();

  return (
    <div className="hidden w-full flex-col items-center justify-center gap-6 @xl:flex">
      <AwNavigationMenu>
        <AwNavigationMenuList>
          <AwNavigationMenuItem>
            <AwNavigationMenuLink
              className={navigationMenuTriggerVariants()}
              i18nKey="sandbox:navigationMenu.documentation"
            />
          </AwNavigationMenuItem>
          <AwNavigationMenuItem>
            <AwNavigationMenuTrigger i18nKey="sandbox:navigationMenu.list" />
            <AwNavigationMenuContent>
              <ul className="grid w-75 gap-4">
                <li>
                  <AwNavigationMenuLink>
                    <AwText
                      variant="mdMedium"
                      i18nKey="sandbox:navigationMenu.components"
                    />
                    <AwText
                      className="text-muted-foreground"
                      i18nKey="sandbox:navigationMenu.componentsDescription"
                    />
                  </AwNavigationMenuLink>
                  <AwNavigationMenuLink>
                    <AwText
                      variant="mdMedium"
                      i18nKey="sandbox:navigationMenu.documentation"
                    />
                    <AwText
                      className="text-muted-foreground"
                      i18nKey="sandbox:navigationMenu.documentationDescription"
                    />
                  </AwNavigationMenuLink>
                  <AwNavigationMenuLink>
                    <AwText
                      variant="mdMedium"
                      i18nKey="sandbox:navigationMenu.blog"
                    />
                    <AwText
                      className="text-muted-foreground"
                      i18nKey="sandbox:navigationMenu.blogDescription"
                    />
                  </AwNavigationMenuLink>
                </li>
              </ul>
            </AwNavigationMenuContent>
          </AwNavigationMenuItem>
          <AwNavigationMenuItem>
            <AwNavigationMenuTrigger i18nKey="sandbox:navigationMenu.simpleList" />
            <AwNavigationMenuContent>
              <ul className="grid w-50 gap-4">
                <li>
                  <AwNavigationMenuLink i18nKey="sandbox:navigationMenu.components" />
                  <AwNavigationMenuLink i18nKey="sandbox:navigationMenu.documentation" />
                  <AwNavigationMenuLink i18nKey="sandbox:navigationMenu.blog" />
                </li>
              </ul>
            </AwNavigationMenuContent>
          </AwNavigationMenuItem>
          <AwNavigationMenuItem>
            <AwNavigationMenuTrigger i18nKey="sandbox:navigationMenu.withIcons" />
            <AwNavigationMenuContent>
              <ul className="grid w-50 gap-4">
                <li className="flex flex-col items-start">
                  <AwNavigationMenuLink className="flex-row items-center gap-2">
                    <CircleHelpIcon />
                    {t("sandbox:navigationMenu.backlog")}
                  </AwNavigationMenuLink>
                  <AwNavigationMenuLink className="flex-row items-center gap-2">
                    <CircleIcon />
                    {t("sandbox:navigationMenu.toDo")}
                  </AwNavigationMenuLink>
                  <AwNavigationMenuLink className="flex-row items-center gap-2">
                    <CircleCheckIcon />
                    {t("sandbox:navigationMenu.done")}
                  </AwNavigationMenuLink>
                </li>
              </ul>
            </AwNavigationMenuContent>
          </AwNavigationMenuItem>
        </AwNavigationMenuList>
      </AwNavigationMenu>
    </div>
  );
};
