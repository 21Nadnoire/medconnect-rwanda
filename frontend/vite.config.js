import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    fs: {
      allow: [
        path.resolve(__dirname),
        path.resolve(__dirname, '../node_modules')
      ]
    },
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Replace 5000 with your backend port if different
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
