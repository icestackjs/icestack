import fs from 'node:fs/promises'
import postcss from 'postcss'
import tailwindcss from 'tailwindcss'
import type { Config } from 'tailwindcss'
import defu from 'defu'

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
  ]).process('@tailwind base;@tailwind components;@tailwind utilities;' + (typeof config?.css === 'string' ? config.css : ''))
  return res
}

export async function ensureDir(p: string) {
  try {
    await fs.access(p)
  } catch {
    await fs.mkdir(p, {
      recursive: true
    })
  }
}
