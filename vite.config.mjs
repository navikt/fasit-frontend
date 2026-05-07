import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [
    react({
      include: /\.[jt]sx?$/,
      babel: {
        presets: ["@babel/preset-react"],
      },
    }),
  ],
  test: {
    environment: "jsdom",
    include: ["test/new/components/**/*.js"],
    exclude: ["test/**/testHelper.js"],
    setupFiles: ["./test/vitest-setup.js"],
  },
  root: ".",
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        entryFileNames: "assets/fasit.js",
      },
    },
  },
  server: {
    port: 4242,
    proxy: {
      "/mockapi": {
        target: "http://localhost:6969",
        changeOrigin: true,
      },
      "/config": {
        target: "http://localhost:6969",
        changeOrigin: true,
      },
      "/isalive": {
        target: "http://localhost:6969",
        changeOrigin: true,
      },
    },
  },
})
