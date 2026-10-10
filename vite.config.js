import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // em desenvolvimento (npm run dev), repassa /api para o Express em :3000
  server: {
    proxy: { '/api': 'http://localhost:3000' }
  }
})
