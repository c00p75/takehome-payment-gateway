import { defineConfig } from 'vite'
import commonjs from 'vite-plugin-commonjs';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  },
  plugins: [
    react(),
    commonjs(),
  ]
})
