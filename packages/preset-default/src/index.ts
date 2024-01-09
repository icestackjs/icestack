import { components } from './components'
import { base } from './base'
import { utilities } from './utilities'
import type { Preset } from '@/types'

const defaultPreset: () => Preset = () => {
  return {
    base,
    components,
    utilities
  }
}

export default defaultPreset
