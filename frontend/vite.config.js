// Since you are using vite.config.js (not .cjs), Node treats it as an ESM file by default (because Vite enforces ESM configs). In ESM, __dirname does not exist → hence your __dirname is not defined error.

// import path from "path"
// import react from "@vitejs/plugin-react"
// import { defineConfig } from "vite"

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// })


// import path from "path";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";
// import { defineConfig } from "vite";

// export default defineConfig({
//   plugins: [react() , tailwindcss()],
//   resolve: {
//     alias: {
//       "@": path.resolve(new URL("./src", import.meta.url).pathname),
//     },
//   },
// });



import path from "path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // ✅ now works
    },
  },
});


