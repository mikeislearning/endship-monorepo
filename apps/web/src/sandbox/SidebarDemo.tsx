import {
  AwSidebar,
  AwSidebarContent,
  AwSidebarFooter,
  AwSidebarGroup,
  AwSidebarGroupLabel,
  AwSidebarHeader,
  AwSidebarMenu,
  AwSidebarMenuButton,
  AwSidebarMenuItem,
} from "@/components/AwSidebar";
import { AwText } from "@/components/AwText/AwText";

import { COMPONENTS, getComponentId } from "./helpers";
import { NavUser } from "./NavUser";

export const SidebarDemo = () => {
  return (
    <AwSidebar>
      <AwSidebarHeader>
        <AwSidebarMenu className="p-2 pb-0">
          <AwSidebarMenuItem className="flex flex-row items-center gap-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <img
                src="https://github.com/mindsea.png"
                alt="MindSea"
                className="rounded-lg"
              />
            </div>
            <AwText as="span" variant="mdBold" i18nKey="sandbox:orgName" />
          </AwSidebarMenuItem>
        </AwSidebarMenu>
      </AwSidebarHeader>
      <AwSidebarContent>
        <AwSidebarGroup className="group-data-[collapsible=icon]:hidden">
          <AwSidebarGroupLabel i18nKey="sandbox:components.title" />
          <AwSidebarMenu>
            {COMPONENTS.map(item => (
              <AwSidebarMenuItem key={item.name}>
                <AwSidebarMenuButton
                  render={
                    <a
                      href={`/sandbox#${getComponentId(item.name)}`}
                      className="flex-1">
                      <span>{item.name}</span>
                    </a>
                  }
                />
              </AwSidebarMenuItem>
            ))}
          </AwSidebarMenu>
        </AwSidebarGroup>
      </AwSidebarContent>
      <AwSidebarFooter>
        <NavUser
          user={{
            name: "PaintingWithCode",
            email: "pwc@example.com",
            avatar: "https://github.com/PaintingWithCode.png",
          }}
        />
      </AwSidebarFooter>
    </AwSidebar>
  );
};
