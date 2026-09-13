import { ExpoConfig } from "expo/config";

import { version } from "./package.json";

const APP_ENV = process.env.APP_ENV ?? "local";
const EAS_PROJECT_ID =
  process.env.EXPO_PUBLIC_EAS_PROJECT_ID ?? "<YOUR_PROJECT_ID>";
const dynamicParams = {
  name: "Template",
  bundleIdentifier: "com.rnbp.template",
};

const appIconBadgeConfig = {
  enabled: APP_ENV !== "production",
  badges: [
    {
      text: APP_ENV,
      type: "banner",
      color: "white",
    },
    {
      text: version,
      type: "ribbon",
      color: "white",
    },
  ],
};

switch (process.env.APP_ENV) {
  case "development":
  case "local":
  case undefined:
    dynamicParams.name = "Template Dev";
    dynamicParams.bundleIdentifier = "com.rnbp.template.dev";
    break;

  case "staging":
    dynamicParams.name = "Template Beta";
    dynamicParams.bundleIdentifier = "com.rnbp.template.staging";
    break;
}

const env = Object.fromEntries(
  Object.entries(process.env).filter(([key]) => key.startsWith("EXPO_PUBLIC_")),
);

export default ({ config }: { config: ExpoConfig }) => ({
  ...config,
  name: dynamicParams.name,
  slug: "expo-template",
  version,
  runtimeVersion: {
    policy: "appVersion",
  },
  updates: {
    enabled: true,
    checkAutomatically: "ON_LOAD",
    fallbackToCacheTimeout: 0,
    url: `https://u.expo.dev/${EAS_PROJECT_ID}`,
  },
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "expo-template",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#0B1931",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: dynamicParams.bundleIdentifier,
  },
  android: {
    package: dynamicParams.bundleIdentifier,
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#0B1931",
    },
  },
  web: {
    bundler: "metro",
    output: "single",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    "expo-image",
    "expo-localization",
    "expo-splash-screen",
    "expo-status-bar",
    "expo-web-browser",
    ["app-icon-badge", appIconBadgeConfig],
    [
      "@sentry/react-native/expo",
      {
        url: "https://sentry.io/",
        project: "expo-template", // TODO: Replace with project Sentry slug
        organization: "ryocode", // TODO: Replace with project Sentry organization
      },
    ],
    [
      "expo-font",
      {
        fonts: [
          "./assets/fonts/Inter-Regular.ttf",
          "./assets/fonts/Inter-Medium.ttf",
          "./assets/fonts/Inter-SemiBold.ttf",
        ],
      },
    ],
    ["expo-build-properties", { android: { usePrecompiledHeaders: true } }],
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
  extra: {
    env,
    eas: {
      projectId: EAS_PROJECT_ID,
    },
  },
});
