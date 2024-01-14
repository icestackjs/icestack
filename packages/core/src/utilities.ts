import type { CssValue } from '@icestack/types'
const utilitiesMap = {
  index: (value: CssValue) => {
    if (Array.isArray(value)) {
      return value.join('\n')
    }
    return value
  }
} as unknown as Record<string, () => string>

const utilitiesNames = Object.keys(utilitiesMap) as (keyof typeof utilitiesMap)[]
export { utilitiesMap, utilitiesNames }
