import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  // server:{
  //   proxy:{
  //     "/imgur-proxy":{
  //       target:"https://i.imgur.com",
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/imgur-proxy/, '')
  //     }
  //   }
  // }
})
