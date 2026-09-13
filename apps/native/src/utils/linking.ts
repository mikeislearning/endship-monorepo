import * as WebBrowser from "expo-web-browser";
import { Linking } from "react-native";

import { appLogger } from "./logger";

/**
 * Opens a URL in the external browser if it can be opened.
 * This is useful for links that should open in the user's default web browser.
 *
 * @param url - The URL to open.
 */
export async function openLinkInExternalBrowser(url: string): Promise<void> {
  try {
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    } else {
      appLogger.warn(`Can't open URL: ${url}`);
    }
  } catch (error) {
    appLogger.error({
      message: `Failed to open URL: ${url}`,
      error,
    });
  }
}

/**
 * Opens a URL in an in-app browser using Expo's WebBrowser module.
 * This is useful for links that should open within the app's context.
 *
 * On Android, it uses ChromeCustomTabs and on iOS, it uses SFSafariViewController.
 *
 * Note: This is different from rendering a web view within the app.
 *
 * @param url - The URL to open.
 */
export async function openLinkInInternalBrowser(url: string): Promise<void> {
  try {
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await WebBrowser.openBrowserAsync(url);
    } else {
      appLogger.warn(`Can't open URL: ${url}`);
    }
  } catch (error) {
    appLogger.error({
      message: `Failed to open URL: ${url}`,
      error,
    });
  }
}
