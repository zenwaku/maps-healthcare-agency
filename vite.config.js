import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: process.env.VITE_BASE_PATH || "/maps-healthcare-agency/",
  plugins: [react()],
  build: {
    sourcemap: false,
    assetsInlineLimit: 4096
  }
});
