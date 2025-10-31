import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Minimal, friend-like Vite config with correct GitHub Pages base
export default defineConfig({
  base: "/rizqi-fauzan-persona-showcase/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "::",
    port: 8080,
  },
});