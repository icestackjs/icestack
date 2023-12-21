import { transformCss2Js } from '@icestack/shared'
import type { ComponentsOptions, DeepPartial, Preset } from '@icestack/types'

const components: DeepPartial<ComponentsOptions> = {}

const preset: () => Preset = () => {
  return {
    components
  }
}

export default preset
