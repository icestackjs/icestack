import { createUnplugin } from 'unplugin'

export const unplugin = createUnplugin(() => {
  return {
    name: 'icestack:unplugin'
  }
})

// export const vitePlugin = unplugin.vite
// export const rollupPlugin = unplugin.rollup
// export const webpackPlugin = unplugin.webpack
// export const rspackPlugin = unplugin.rspack
// export const esbuildPlugin = unplugin.esbuild
