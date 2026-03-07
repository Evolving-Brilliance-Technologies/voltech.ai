import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import { tanstackRouter } from "@tanstack/router-plugin/vite"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa"

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
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      pwaAssets: {
        disabled: false,
        config: true,
      },
      manifest: {
        name: `Voltech AI - ${target.charAt(0).toUpperCase() + target.slice(1)}`,
        short_name: target.charAt(0).toUpperCase() + target.slice(1),
        description: `Voltech AI ${target} Portal`,
        theme_color: '#10b981',
        background_color: '#020617',
        display: 'standalone',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true
      },
      devOptions: {
        enabled: true
      }
    })
  ],

  define: {
    'import.meta.env.VITE_APP_TARGET': JSON.stringify(target),
  },
})
