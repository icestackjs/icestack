import postcss from 'postcss'
import tailwindcss, { type Config } from 'tailwindcss'
import gloablPostcss from './global'
import type { CodegenOptions, DeepPartial } from '@/types'
import { defuOverrideArray } from '@/utils'
export function resolveTailwindcss(opts: { css: string; config: Config; options: CodegenOptions }) {
  const { config, css, options } = opts

  // process.env.JEST_WORKER_ID = 'mock'
  // https://github.com/tailwindlabs/tailwindcss/blob/28e96baf3ac000f6ddca814a40ad402dbcf6a6a5/src/util/validateConfig.js#L7
  const result = postcss([tailwindcss(config), gloablPostcss(options)]) //
    // @tailwind base;\n
    // @ts-ignore
    // '@tailwind components;\n@tailwind utilities;\n' +
    .process(css, {
      from: undefined
    })
    .async()
  // delete process.env.JEST_WORKER_ID
  return result
}

export function initTailwindcssConfig(config?: DeepPartial<Config>, ...defaults: DeepPartial<Config>[]) {
  const defus = defaults ?? []
  const cfg = defuOverrideArray<DeepPartial<Config>, DeepPartial<Config>[]>(config!, ...defus, {
    content: [{ raw: 'hidden' }],
    theme: {
      extend: {}
    },
    corePlugins: {
      preflight: false
    }
  })
  return cfg as Config
}
