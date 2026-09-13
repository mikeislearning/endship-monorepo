import path from "node:path";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import tanstackRouter from "@tanstack/router-plugin/vite";
import legacy from "@vitejs/plugin-legacy";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { barrel } from "vite-plugin-barrel";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
      routeFileIgnorePattern:
        process.env.VITE_ENVIRONMENT === "production" ? "_sandbox" : undefined,
    }),
    react(),
    babel({
      presets: [reactCompilerPreset()],
    }),
    legacy({
      targets: [
        "defaults",
        "not dead",
        "not ie 11",
        "not op_mini all",
        "> 0.2%",
      ],
      modernPolyfills: true,
    }),
    svgr(),
    barrel({
      // Only include the used icons in build (reduces final bundle size)
      packages: ["lucide-react"],
    }),
    tailwindcss(),
    // TODO: Uncomment and add proper values to enable Sentry
    // sentryVitePlugin({
    //   org: "",
    //   project: "",
    //   authToken: process.env.SENTRY_AUTH_TOKEN,
    // }),
  ],
  envDir: "../..",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: id => {
          if (id.includes("node_modules/@sentry")) {
            return "sentry";
          }
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/")
          ) {
            return "react";
          }
          if (id.includes("node_modules/@supabase")) {
            return "supabase";
          }
        },
      },
    },
  },
});
