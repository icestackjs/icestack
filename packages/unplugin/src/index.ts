import { createUnplugin } from 'unplugin'

export interface UserOptions {}

export const unplugin = createUnplugin((options: UserOptions) => {
  return {
    name: 'icestack:unplugin',

    transformInclude(id) {
      return id.endsWith('.vue')
    },
    transform(code) {}
  }
})

export const vitePlugin = unplugin.vite
export const rollupPlugin = unplugin.rollup
export const webpackPlugin = unplugin.webpack
export const rspackPlugin = unplugin.rspack
export const esbuildPlugin = unplugin.esbuild
