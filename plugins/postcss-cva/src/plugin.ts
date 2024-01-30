import fs from 'node:fs'
import path from 'node:path'
import type { PluginCreator } from 'postcss'
import { defuOverrideArray } from '@icestack/shared'
import extract from './extract'
import { generateCva } from './generator'
import { ensureDir } from './utils'
import type { UserDefineOption } from './types'
import createFilter from './createFilter'

const creator: PluginCreator<Partial<UserDefineOption>> = (opts) => {
  // @ts-ignore
  const { outdir, prefix, importFrom, dryRun, cwd, format, remove, exclude, include } = defuOverrideArray<UserDefineOption, Partial<UserDefineOption>[]>(opts, {
    cwd: process.cwd(),
    outdir: 'cva',
    importFrom: 'class-variance-authority',
    dryRun: false,
    format: 'ts',
    remove: true,
    exclude: [/node_modules/]
  })
  const filter = createFilter(include, exclude)
  const extractPlugin = extract({
    prefix,
    process(res) {
      if (res) {
        const filename = res.meta.path // ?? res.file
        if (filename && !dryRun) {
          const targetFormat = <'js' | 'ts'>res.meta.format ?? format
          const { code } = generateCva({
            ...res,
            format: targetFormat,
            importFrom
          })
          const filepath = path.resolve(cwd, outdir, filename)
          ensureDir(path.dirname(filepath))
          const extname = path.extname(filename)
          let file = filepath
          if (!extname) {
            file = filepath + '.' + targetFormat
          }
          fs.writeFileSync(file, code, 'utf8')
        }
      }
    },
    remove,
    filter
  })
  return {
    postcssPlugin: 'postcss-cva',
    plugins: [extractPlugin]
  }
}

creator.postcss = true

export default creator
