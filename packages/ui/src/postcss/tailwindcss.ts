import postcss from 'postcss'
import tailwindcss, { type Config } from 'tailwindcss'
export function resolveTailwindcss(options: { css: string; config: Config }) {
  const { config, css } = options
  const tw = tailwindcss(config)
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
    content: [{ raw: '' }],
    theme: {
      extend: {}
    },
    corePlugins: {
      preflight: false
    }
  }
  return config
}
