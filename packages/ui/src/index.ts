import { Config } from './types'

export * from './types'
// export { colors as extendColors } from './colors'
// export { default as tailwindcssPlugin } from './tailwindcss'
export function defineConfig(options?: Config) {
  return options
}

export { buildAll as build } from './generate'

export { transformCss2Js } from './components/shared'
