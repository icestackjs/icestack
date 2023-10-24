import path from 'node:path'
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['./src/index', './src/tailwindcss', './src/unocss.ts', './src/cli.ts'],
  rollup: {
    // 内联，相当于 nodeResolve
    inlineDependencies: true,
    // cjs
    emitCJS: true,
    // 添加 cjs 注入
    cjsBridge: true,
    dts: {
      // https://github.com/unjs/unbuild/issues/135
      respectExternal: false
    },
    commonjs: {
      ignore: (id) => {
        return id.startsWith('../assets/')
      }
    }
    // resolve: {
    //   resolveOnly: (module) => !module.startsWith('../assets/')
    // }
    // output: {
    //   manualChunks(id) {
    //     if (id.includes('node_modules')) {
    //       return 'vendor'
    //     }
    //   }
    // }
  },
  alias: {
    // 别名
    '@': path.resolve(__dirname, './src')
  },
  // dts
  declaration: true,
  externals: [/^tailwindcss/, /^\.\.\/assets\//, /^unocss/]
})
