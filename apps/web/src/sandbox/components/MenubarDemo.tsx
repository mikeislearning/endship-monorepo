import {
  AwMenubar,
  AwMenubarCheckboxItem,
  AwMenubarContent,
  AwMenubarItem,
  AwMenubarMenu,
  AwMenubarRadioGroup,
  AwMenubarRadioItem,
  AwMenubarSeparator,
  AwMenubarShortcut,
  AwMenubarSub,
  AwMenubarSubContent,
  AwMenubarSubTrigger,
  AwMenubarTrigger,
} from "@/components/AwMenubar";

export const MenubarDemo = () => {
  return (
    <AwMenubar>
      <AwMenubarMenu>
        <AwMenubarTrigger i18nKey="sandbox:menubar.file" />
        <AwMenubarContent>
          <AwMenubarItem i18nKey="sandbox:menubar.fileMenu.newTab">
            <AwMenubarShortcut>⌘T</AwMenubarShortcut>
          </AwMenubarItem>
          <AwMenubarItem i18nKey="sandbox:menubar.fileMenu.newWindow">
            <AwMenubarShortcut>⌘N</AwMenubarShortcut>
          </AwMenubarItem>
          <AwMenubarItem
            disabled
            i18nKey="sandbox:menubar.fileMenu.newIncognitoWindow"
          />
          <AwMenubarSeparator />
          <AwMenubarSub>
            <AwMenubarSubTrigger i18nKey="sandbox:menubar.fileMenu.share" />
            <AwMenubarSubContent>
              <AwMenubarItem i18nKey="sandbox:menubar.fileMenu.shareOptions.emailLink" />
              <AwMenubarItem i18nKey="sandbox:menubar.fileMenu.shareOptions.messages" />
              <AwMenubarItem i18nKey="sandbox:menubar.fileMenu.shareOptions.notes" />
            </AwMenubarSubContent>
          </AwMenubarSub>
          <AwMenubarSeparator />
          <AwMenubarItem i18nKey="sandbox:menubar.fileMenu.print">
            <AwMenubarShortcut>⌘P</AwMenubarShortcut>
          </AwMenubarItem>
        </AwMenubarContent>
      </AwMenubarMenu>
      <AwMenubarMenu>
        <AwMenubarTrigger i18nKey="sandbox:menubar.edit" />
        <AwMenubarContent>
          <AwMenubarItem i18nKey="sandbox:menubar.editMenu.undo">
            <AwMenubarShortcut>⌘Z</AwMenubarShortcut>
          </AwMenubarItem>
          <AwMenubarItem i18nKey="sandbox:menubar.editMenu.redo">
            <AwMenubarShortcut>⇧⌘Z</AwMenubarShortcut>
          </AwMenubarItem>
          <AwMenubarSeparator />
          <AwMenubarSub>
            <AwMenubarSubTrigger i18nKey="sandbox:menubar.editMenu.find" />
            <AwMenubarSubContent>
              <AwMenubarItem i18nKey="sandbox:menubar.editMenu.findOptions.searchWeb" />
              <AwMenubarSeparator />
              <AwMenubarItem i18nKey="sandbox:menubar.editMenu.findOptions.find" />
              <AwMenubarItem i18nKey="sandbox:menubar.editMenu.findOptions.findNext" />
              <AwMenubarItem i18nKey="sandbox:menubar.editMenu.findOptions.findPrevious" />
            </AwMenubarSubContent>
          </AwMenubarSub>
          <AwMenubarSeparator />
          <AwMenubarItem i18nKey="sandbox:menubar.editMenu.cut" />
          <AwMenubarItem i18nKey="sandbox:menubar.editMenu.copy" />
          <AwMenubarItem i18nKey="sandbox:menubar.editMenu.paste" />
        </AwMenubarContent>
      </AwMenubarMenu>
      <AwMenubarMenu>
        <AwMenubarTrigger i18nKey="sandbox:menubar.view" />
        <AwMenubarContent>
          <AwMenubarCheckboxItem i18nKey="sandbox:menubar.viewMenu.alwaysShowBookmarksBar" />
          <AwMenubarCheckboxItem
            checked
            i18nKey="sandbox:menubar.viewMenu.alwaysShowFullUrls"
          />
          <AwMenubarSeparator />
          <AwMenubarItem inset i18nKey="sandbox:menubar.viewMenu.reload">
            <AwMenubarShortcut>⌘R</AwMenubarShortcut>
          </AwMenubarItem>
          <AwMenubarItem
            disabled
            inset
            i18nKey="sandbox:menubar.viewMenu.forceReload">
            <AwMenubarShortcut>⇧⌘R</AwMenubarShortcut>
          </AwMenubarItem>
          <AwMenubarSeparator />
          <AwMenubarItem
            inset
            i18nKey="sandbox:menubar.viewMenu.toggleFullscreen"
          />
          <AwMenubarSeparator />
          <AwMenubarItem inset i18nKey="sandbox:menubar.viewMenu.hideSidebar" />
        </AwMenubarContent>
      </AwMenubarMenu>
      <AwMenubarMenu>
        <AwMenubarTrigger i18nKey="sandbox:menubar.profiles" />
        <AwMenubarContent>
          <AwMenubarRadioGroup value="benoit">
            <AwMenubarRadioItem
              value="andy"
              i18nKey="sandbox:menubar.profilesMenu.andy"
            />
            <AwMenubarRadioItem
              value="benoit"
              i18nKey="sandbox:menubar.profilesMenu.benoit"
            />
            <AwMenubarRadioItem
              value="Luis"
              i18nKey="sandbox:menubar.profilesMenu.luis"
            />
          </AwMenubarRadioGroup>
          <AwMenubarSeparator />
          <AwMenubarItem inset i18nKey="sandbox:menubar.profilesMenu.edit" />
          <AwMenubarSeparator />
          <AwMenubarItem
            inset
            i18nKey="sandbox:menubar.profilesMenu.addProfile"
          />
        </AwMenubarContent>
      </AwMenubarMenu>
    </AwMenubar>
  );
};
