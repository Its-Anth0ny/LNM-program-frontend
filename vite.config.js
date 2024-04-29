import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
//import react from "@vitejs/plugin-react-swc"; *for swc install
const __dirname = path.dirname("./src");

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname),
        },
    },
});
