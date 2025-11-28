import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslintPlugin from 'vite-plugin-eslint'

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    eslintPlugin(),
    react(),
  ],
  build: {
    outDir: 'build',
  },
})
