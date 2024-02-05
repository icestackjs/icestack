import { defu } from '@icestack/shared'
import { components } from './components'
import { base } from './base'
import { utilities } from './utilities'
import { createDefaultTailwindcssExtends } from './tailwindcss'
import type { Preset } from '@/types'

const defaultPreset: (opts: { varPrefix?: string }) => Preset = (opts) => {
  const { varPrefix } = defu(opts, {})
  return {
    base,
    components,
    utilities,
    tailwindcssConfig: {
      theme: createDefaultTailwindcssExtends({ varPrefix })
    }
  }
}

export default defaultPreset
