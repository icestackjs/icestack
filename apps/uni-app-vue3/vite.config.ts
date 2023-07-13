import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-vue-components/vite'
// 假如要加载一些 commonjs 模块，需要引入这个插件，很多地图的sdk都是 commonjs，假如引用报错需要引入它并添加到 `plugins` 里
// import commonjs from "@rollup/plugin-commonjs";
import { UnifiedViteWeappTailwindcssPlugin as uvtw } from 'weapp-tailwindcss/vite'
import rem2px from 'postcss-rem-to-responsive-pixel'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
const isH5 = process.env.UNI_PLATFORM === 'h5'
const isApp = process.env.UNI_PLATFORM === 'app'
const WeappTailwindcssDisabled = isH5 || isApp

const postcssPlugins = [tailwindcss(), autoprefixer()]

if (!WeappTailwindcssDisabled) {
  postcssPlugins.push(
    rem2px({
      rootValue: 32,
      propList: ['*'],
      transformUnit: 'rpx'
    })
  )
}
// https://vitejs.dev/config/
export default defineConfig({
  // uvtw 一定要放在 uni 后面
  plugins: [
    uni(),
    uvtw({
      disabled: WeappTailwindcssDisabled
    }),
    AutoImport({
      imports: ['vue', 'uni-app', 'pinia'],
      dts: './src/auto-imports.d.ts',
      eslintrc: {
        enabled: true
      }
    })
    // uni-app vite 中不起作用，不知道为啥
    // Components({
    //   dts: './src/components.d.ts'
    // })
  ],
  // 内联 postcss 注册 tailwindcss
  css: {
    postcss: {
      plugins: postcssPlugins
    }
  }
})
