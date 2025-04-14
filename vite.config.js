import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        // manualChunks(id) {
        //   console.log('ddd', id)
        //   console.log(path.parse(id))
        //   console.log(path.relative(path.resolve(__dirname, 'src'), id))
        //   if (id.includes('src/config') && id.endsWith('.ts')) {
        //     return path.relative(path.resolve(__dirname, 'src'), id)
        //   }
        //   if (id.includes('node_modules')) {
        //     return id.toString().split('node_modules/')[1].split('/')[0].toString()
        //   }
        // }
      }
    }
  }
})
