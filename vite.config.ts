import { defineConfig } from 'vite'
import commonjs from 'vite-plugin-commonjs';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000, // Run project on port 3000
  },
  plugins: [
    react(),
    commonjs(),
  ]
})
