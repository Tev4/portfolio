import { copyFileSync } from "node:fs";
import { fileURLToPath, URL } from "node:url";

import { defineConfig, type Plugin } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import Components from "unplugin-vue-components/vite";
import { BootstrapVueNextResolver } from "bootstrap-vue-next/resolvers";

// GitHub Pages serves 404.html for any unknown path, so the built index.html is
// copied there as well. This lets the SPA router handle direct visits to deep
// links such as /portfolio/fr/ or /portfolio/en/projects/:id.
const githubPagesSpaFallback = (): Plugin => ({
  name: "github-pages-spa-fallback",
  apply: "build",
  closeBundle() {
    const distDir = fileURLToPath(new URL("./dist", import.meta.url));
    copyFileSync(`${distDir}/index.html`, `${distDir}/404.html`);
  },
});

// https://vite.dev/config/
export default defineConfig({
  base: "/portfolio/",
  plugins: [
    vue(),
    vueDevTools(),
    Components({
      resolvers: [BootstrapVueNextResolver()],
    }),
    githubPagesSpaFallback(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
