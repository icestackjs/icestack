import { components } from './components'
import type { Preset } from '@/types'

const mockupPreset: () => Preset = () => {
  return {
    components
  }
}

export default mockupPreset
