import { registerRootComponent } from "expo";
import Constants from "expo-constants";
import { ExpoRoot } from "expo-router";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";

// Disable Reanimated strict mode warnings
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

// Required to expose env vars to expo-router (https://github.com/expo/expo/issues/23812#issuecomment-1703902385)
// It might be tempting to move this into a function in envVariables, but for some reason that breaks the fix above.
Object.entries(Constants.expoConfig?.extra?.env).forEach(([key, value]) => {
  if (!key.startsWith("EXPO_PUBLIC_") || key in process.env) return;
  process.env[key] = `${value}`;
});

// https://docs.expo.dev/router/reference/troubleshooting/#expo_router_app_root-not-defined
// Must be exported or Fast Refresh won't update the context
export function App() {
  const ctx = require.context("./src/app");
  return <ExpoRoot context={ctx} />;
}

registerRootComponent(App);
