import { components } from './components'
import { base } from './base'
import type { Preset } from '@/types'

const defaultPreset: () => Preset = () => {
  return {
    base,
    components
  }
}

export default defaultPreset
