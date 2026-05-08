import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    include: ["test/new/components/**/*.{js,jsx}"],
    exclude: ["test/**/testHelper.{js,jsx}"],
    setupFiles: ["./test/vitest-setup.js"],
  },
  root: ".",
  build: {
    outDir: "dist",
    rolldownOptions: {
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
