import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

export default defineConfig(({ mode }) => {
  const isServer = process.env.BUILD_TARGET === "server";
  const isClient = process.env.BUILD_TARGET === "client";

  return {
    plugins: [
      react(),
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: ["favicon.ico", "apple-touch-icon.png"],
        manifest: {
          name: "Katswiri",
          short_name: "Katswiri",
          start_url: ".",
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
      }),
     
    ],
    build: {
      outDir: isServer ? "dist/server" : "dist/client",
      sourcemap: mode !== "production",
      emptyOutDir: isClient, // Clears output dir only for client builds
      rollupOptions: {
        input: isClient
          ? path.resolve(__dirname, "index.html")
          : path.resolve(__dirname, "src", "entry-server.tsx"),
      },
      ssr: isServer
        ? path.resolve(__dirname, "src", "entry-server.tsx")
        : false,
    },
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:3000",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
          onError(err, req, res) {
            console.error("Proxy error:", err.message);
            if (res.writeHead) {
              res.writeHead(500, { "Content-Type": "text/plain" });
            }
            res.end("Proxy error occurred. Please check the target server.");
          },
        },
      },
    },
    ssr: {
      noExternal: ["react", "react-dom"],
      external: ["react-router-dom"],
    },
  };
});
