import { transformCss2Js } from '@icestack/shared'
import type { ComponentsOptions, DeepPartial, CodegenOptions } from '@icestack/types'

const components: DeepPartial<ComponentsOptions> = {}

const preset: () => DeepPartial<CodegenOptions> = () => {
  return {
    components
  }
}

export default preset
