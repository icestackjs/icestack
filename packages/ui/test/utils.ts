import postcss from 'postcss'
import tailwindcss from 'tailwindcss'
import type { Config } from 'tailwindcss'
import { defu } from '@icestack/shared'

export async function getCss(config?: Partial<Config> & { css?: string }) {
  const res = await postcss([
    tailwindcss(
      defu<Config, Config[]>(config, {
        content: [{ raw: '' }],
        corePlugins: {
          preflight: false
        }
      })
    )
    // @ts-ignore
  ]).process('@tailwind base;@tailwind components;@tailwind utilities;' + (typeof config?.css === 'string' ? config.css : ''), {
    from: undefined
  })
  return res
}
