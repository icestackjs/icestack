import type { Preset } from '@/types'
import { defu } from '@icestack/shared'
import { base } from './base'
import { components } from './components'
import { createDefaultTailwindcssExtends } from './tailwindcss'
import { utilities } from './utilities'

const defaultPreset: (opts: { varPrefix?: string }) => Preset = (opts) => {
  const { varPrefix } = defu(opts, {})
  return {
    base,
    components,
    utilities,
    tailwindcssConfig: {
      theme: createDefaultTailwindcssExtends({ varPrefix }),
    },
  }
}

export default defaultPreset
