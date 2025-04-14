import { defineConfig } from 'vite'

export default defineConfig({
  base: '/joky-deck-dataset-balatro',
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name].js',
        manualChunks(id) {
          if (id.includes('src/config/index.ts')) {
            return 'config'
          }
        }
      }
    }
  }
})
