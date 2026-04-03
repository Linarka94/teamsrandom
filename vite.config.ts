import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const resolveBase = (): string => {
  const raw = process.env.BASE_PATH?.trim();
  if (!raw || raw === "/") return "/";
  const withLeading = raw.startsWith("/") ? raw : `/${raw}`;
  return withLeading.endsWith("/") ? withLeading : `${withLeading}/`;
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: resolveBase(),
});
