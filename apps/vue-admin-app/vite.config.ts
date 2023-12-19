import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [VueRouter({
    dts: 'src/typed-router.d.ts',
  }), vue(),
  AutoImport({
    imports: [
      'vue',
      'vue-i18n',
      '@vueuse/head',
      '@vueuse/core',
      VueRouterAutoImports,
      {
        // add any other imports you were relying on
        'vue-router/auto': ['useLink'],
      },
    ],
    dts: 'src/auto-imports.d.ts',
    dirs: [
      'src/composables',
      'src/stores',
    ],
    vueTemplate: true,
  }),

  // https://github.com/antfu/unplugin-vue-components
  Components({
    // allow auto load markdown components under `./src/components/`
    extensions: ['vue', 'md'],
    // allow auto import and register components used in markdown
    include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    dts: 'src/components.d.ts',
  }),],
})
