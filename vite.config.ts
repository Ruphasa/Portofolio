import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// Minimal config like your friend's, plus alias support for "@" imports
export default defineConfig({
  // IMPORTANT: Must match your GitHub Pages project name for correct asset URLs
  // This repo is "rizqi-fauzan-persona-showcase", so the base should be:
  base: "/rizqi-fauzan-persona-showcase/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});