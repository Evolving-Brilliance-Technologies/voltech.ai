import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import { tanstackRouter } from "@tanstack/router-plugin/vite"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"

// Targets: landing, impactmaker, changemaker, verifier, gov, partner, admin
const target = process.env.APP_TARGET || 'impactmaker';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      '@route-tree': path.resolve(__dirname, `./src/routeTree.${target}.gen.ts`),
    },
  },
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
      routesDirectory: `./src/routes/${target}`,
      generatedRouteTree: `./src/routeTree.${target}.gen.ts`,
      quoteStyle: "double",
      semicolons: true,
    }),
    react(),
    tailwindcss(),
  ],

  define: {
    'import.meta.env.VITE_APP_TARGET': JSON.stringify(target),
  },
})
