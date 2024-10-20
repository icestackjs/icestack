import type { Config } from 'tailwindcss'
import { Root } from '@/postcss'
import { defu } from '@icestack/shared'
import { cloneDeepWith } from 'lodash'
import postcss from 'postcss'

import tailwindcss from 'tailwindcss'

export async function getCss(config?: Partial<Config> & { css?: string }) {
  const res = await postcss([
    tailwindcss(
      defu<Config, Config[]>(config, {
        content: [{ raw: '' }],
        corePlugins: {
          preflight: false,
        },
      }),
    ),
    // @ts-ignore
  ]).process(`@tailwind base;@tailwind components;@tailwind utilities;${typeof config?.css === 'string' ? config.css : ''}`, {
    from: undefined,
  })
  return res
}

export function omitRoot(obj?: object) {
  return cloneDeepWith(obj, (v) => {
    if (v instanceof Root) {
      return null
    }
  })
}
