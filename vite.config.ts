import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png"],
      manifest: {
        name: "Katswiri",
        short_name: "Katswiri",
        start_url: "./",
        scope: "./",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/images/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/images/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "document",
            handler: "NetworkFirst",
          },
          {
            urlPattern: ({ request }) =>
              ["style", "script", "worker"].includes(request.destination),
            handler: "StaleWhileRevalidate",
          },
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "images",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60,
              },
            },
          },
        ],
      },
    }),
  ],
  build: {
    outDir: "dist",
    sourcemap: false,
    rollupOptions: {
      input: path.resolve(__dirname, "index.html"),
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
  server: {
    // REMOVE this in SSR setup
    // Your express server handles API locally
    middlewareMode: true, // optional, clarifies you're using Vite with SSR
  },
});
