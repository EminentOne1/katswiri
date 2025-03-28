import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png"],
      manifest: {
        id: "Katswiri v 1.0",
        name: "Katswiri",
        short_name: "Katswiri",
        description: "Katswiri web App by Wongani Chakaka Nyirenda",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/images/android-launchericon-192-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/images/android-launchericon-512-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        screenshots: [
          {
            src: "/images/mobile.png",
            sizes: "432x960",
            type: "image/png",
          },
          {
            src: "/images/wide-desktop.png",
            sizes: "2102x1080",
            type: "image/png",
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
  resolve: {
    alias: {
      "react-router-dom/server": path.resolve(
        __dirname,
        "node_modules/react-router-dom/server.js"
      ),
    },
  },
  build: {
    ssr: "src/entry-server.tsx",
    outDir: "dist/server",
  },
  ssr: {
    noExternal: ["react-router-dom"],
  },
});
