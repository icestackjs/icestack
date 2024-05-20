import type { Config } from './types'

export { Config } from './types'
// export { colors as extendColors } from './colors'
// export { default as tailwindcssPlugin } from './tailwindcss'
export function defineConfig(options?: Config) {
  return options
}

export { createContext } from './context'
export type { IContext } from './context'

export { css } from '@/shared'
