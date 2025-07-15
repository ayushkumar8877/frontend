import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist'
  },
  server: {
    cors: true,
    port: 5173
  },
  preview: {
    port: 5173,
    allowedHosts: ['frontend-j6i2.onrender.com']
  }
})
