import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// Minimal config like your friend's, plus alias support for "@" imports
export default defineConfig({
  // IMPORTANT: Must match your GitHub Pages project name for correct asset URLs
  // Your GitHub repository is "Portofolio", so the base must be:
  base: "/Portofolio/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});