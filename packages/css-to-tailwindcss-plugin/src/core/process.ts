import fs from 'node:fs/promises'
import postcss from 'postcss'
import { createContext } from './context'
import { IProcessOptions } from '@/types'

export async function getCss(entry: string, options: IProcessOptions = {}) {
  const ctx = createContext(options)
  const plugins = await ctx.getPlugins()

  const css = await fs.readFile(entry, 'utf8')

  const res = await postcss(plugins).process(css, {
    from: undefined
  })
  return res.css
}
