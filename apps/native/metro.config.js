const path = require("node:path");
const { getSentryExpoConfig } = require("@sentry/react-native/metro");
const { withNativeWind } = require("nativewind/metro");

const config = getSentryExpoConfig(__dirname);

const { transformer, resolver } = config;

// Find the project and workspace directories
const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, "../..");

require("@expo/env").loadProjectEnv(monorepoRoot, {
  force: true,
  // The following line is required for both deployment and local development to find the environment variabeles
  mode: process.env.EXPO_PUBLIC_ENVIRONMENT || "development.local",
});

config.transformer = {
  ...transformer,
  _expoRelativeProjectRoot: __dirname,
  babelTransformerPath: require.resolve("react-native-svg-transformer/expo"),
};

config.resolver = {
  ...resolver,
  assetExts: resolver.assetExts.filter(ext => ext !== "svg"),
  sourceExts: [...resolver.sourceExts, "svg"],
  unstable_conditionNames: ["browser", "require", "react-native"],
};

module.exports = withNativeWind(config, {
  input: "./global.css",
  inlineRem: 16,
});
