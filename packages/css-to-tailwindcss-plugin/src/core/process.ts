import fs from 'node:fs/promises'
import type { Config } from 'tailwindcss'
import type { AcceptedPlugin } from 'postcss'
import postcss from 'postcss'
import { markLayerPlugin, extractLayerPlugin } from './extract-layer'

export interface IProcessOptions {
  tailwindcssConfig?:
    | string
    | Config
    | {
        config: string | Config
      }
    | undefined
}

export async function getPlugins(options: IProcessOptions = {}) {
  const { tailwindcssConfig } = options

  const plugins: AcceptedPlugin[] = [markLayerPlugin()]
  if (tailwindcssConfig) {
    const { default: tailwindcss } = await import('tailwindcss')
    plugins.push(tailwindcss(tailwindcssConfig))
  }
  plugins.push(extractLayerPlugin())
  return plugins
}

export async function getCss(entry: string, options: IProcessOptions = {}) {
  const plugins = await getPlugins(options)
  const css = await fs.readFile(entry, 'utf8')
  // @ts-ignore
  const res = await postcss(plugins).process(css)
  return res.css
}
