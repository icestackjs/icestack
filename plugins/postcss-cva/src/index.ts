import fs from 'node:fs'
import path from 'node:path'
import type { PluginCreator } from 'postcss'
import { defu } from '@icestack/shared'
import extract from './extract'
import { generateCva } from './generator'
import { ensureDir } from './utils'

const creator: PluginCreator<Partial<{ outdir: string; prefix: string }>> = (opts) => {
  const { outdir, prefix } = defu(opts, {
    outdir: 'cva'
  })
  const cwd = process.cwd()
  const extractPlugin = extract({
    prefix,
    process(res) {
      if (res) {
        const { code } = generateCva(res)
        const filepath = path.resolve(cwd, outdir, res.file ?? '')
        ensureDir(filepath)
        fs.writeFileSync(filepath, code, 'utf8')
      }
    }
  })
  return {
    postcssPlugin: 'postcss-cva',
    plugins: [extractPlugin]
  }
}

creator.postcss = true

export default creator
