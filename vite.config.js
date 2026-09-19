import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss() // <--- Tambahkan plugin tailwind di sini
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [vue()],
  server: {
    allowedHosts: [
      '.ngrok-free.dev',
      '.ngrok-free.app'
    ]
  }
})