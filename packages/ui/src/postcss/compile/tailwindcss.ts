import postcss from 'postcss'
import tailwindcss, { type Config } from 'tailwindcss'

export async function resolveTailwindcss(options: { css: string; config: Config }) {
  const { config, css: cssOutput } = options
  const tw = tailwindcss(config)
  const res = await postcss([tw])
    // @tailwind base;\n
    // @ts-ignore
    .process('@tailwind components;\n@tailwind utilities;\n' + cssOutput, {
      from: undefined
    })
    .async()
  return res
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
