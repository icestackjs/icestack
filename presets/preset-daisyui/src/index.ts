import type { DeepPartial, CodegenOptions } from '@icestack/types'

const components = {}

const daisyui: () => DeepPartial<CodegenOptions> = () => {
  return {
    components
  }
}

export default daisyui
