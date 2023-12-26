import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "/src/main.tsx": "/src/main.jsx",
    },
  },
  server: {
    host: true,
  },
  build: {
    rollupOptions: {
      external: [
        "react-icons/fa",
        "antd",
        "react-redux",
        "@reduxjs/toolkit",
        "axios",
        "express",
        "mongoose",
        "multer",
        "react",
        "react-dom",
        "react-router",
        "react-slick",
        "slick-carousel",
        "uuidv4",
        "react-icons/fa6",
        "react",
        "@react-dom/client",
        "@react",
      ],
    },
  },
});
