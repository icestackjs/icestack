import { UserDefinedOptions } from './types'
export * from './types'
export { colors as extendColors } from './colors'
export { default as tailwindcssPlugin } from './tailwindcss'
export function defineConfig(options: UserDefinedOptions) {
  return options
}
