import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // função para o projeto ser reconhecido e funcional ao lançar/abrir no github pages
  base: '/devtask-cp4-web-development/',
  plugins: [react(), tailwindcss()],
})
