import { components } from './components'
import type { Preset } from '@/types'

const defaultPreset: () => Preset = () => {
  return {
    components
  }
}

export default defaultPreset
