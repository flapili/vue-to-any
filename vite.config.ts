import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({ insertTypesEntry: true }),
  ],
  build: {
    lib: {
      entry: 'index.ts',
      name: 'Vue-to-any',
      fileName: 'index',
    },
    rollupOptions: {
      external: [
        'vue',
        'defu',
        'html2canvas',
        'uuid',
        'vue-component-type-helpers',
      ],
      output: {
        globals: {
          vue: 'Vue',
          defu: 'defu',
          html2canvas: 'html2canvas',
          uuid: 'uuid',
        },
      },
    },
  },
})
