import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// Minimal config like your friend's, plus alias support for "@" imports
export default defineConfig({
  // Keep this matching your Pages repo name. If this repo is "Portofolio", this is correct.
  // If you're deploying this repo (rizqi-fauzan-persona-showcase), set it to "/rizqi-fauzan-persona-showcase/".
  base: "/Portofolio/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "/src"),
    },
  },
});