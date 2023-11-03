import postcss from 'postcss'
import tailwindcss, { type Config } from 'tailwindcss'
import { CodegenOptions } from '..'
import gloablPostcss from './global'
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
  // delete process.env.JEST_WORKER_ID
  return result
}

export function initConfig() {
  const config: Config = {
    content: [{ raw: 'hidden' }],
    theme: {
      extend: {}
    },
    corePlugins: {
      preflight: false
    }
  }
  return config
}
