import { compile } from '@icestack/css2js'
import type { Config } from 'tailwindcss'
import postcss from 'postcss'

export async function process(
  entry: string,
  options: {
    tailwindcssConfig?:
      | string
      | Config
      | {
          config: string | Config
        }
      | undefined
  } = {}
) {
  const { tailwindcssConfig } = options

  const plugins: postcss.AcceptedPlugin[] = []
  if (tailwindcssConfig) {
    const { default: tailwindcss } = await import('tailwindcss')
    plugins.push(tailwindcss(tailwindcssConfig))
  }
  const res = await compile({
    path: entry,
    plugins
  })
  return res
}
