import type { Config } from './types'

export { createContext } from './context'
// export { colors as extendColors } from './colors'
// export { default as tailwindcssPlugin } from './tailwindcss'
export function defineConfig(options?: Config) {
  return options
}

export type { IContext } from './context'
export { Config } from './types'

export { css } from '@/shared'
