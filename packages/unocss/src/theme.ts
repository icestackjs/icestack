import { requireLib } from './utils'

export function getTheme(loadDirectory: string) {
  const config = requireLib('js/unocss/config.cjs', loadDirectory)
  return {
    colors: {
      ...config.theme.colors
    }
  }
}
