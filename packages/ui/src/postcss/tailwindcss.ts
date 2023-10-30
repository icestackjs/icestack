import postcss from 'postcss'
import tailwindcss, { type Config } from 'tailwindcss'
export function resolveTailwindcss(options: { css: string; config: Config }) {
  const { config, css } = options
  const tw = tailwindcss(config)
  // https://github.com/tailwindlabs/tailwindcss/blob/28e96baf3ac000f6ddca814a40ad402dbcf6a6a5/src/util/validateConfig.js#L7
  const result = postcss([tw])
    // @tailwind base;\n
    // @ts-ignore
    .process('@tailwind components;\n@tailwind utilities;\n' + css, {
      from: undefined
    })

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
