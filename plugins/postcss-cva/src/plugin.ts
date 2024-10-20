import type { PluginCreator } from 'postcss'
import type { UserDefineOption } from './types'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { defuOverrideArray } from '@icestack/shared'
import createFilter from './createFilter'
import extract from './extract'
import { generateCva } from './generator'
import { ensureDir } from './utils'

const creator: PluginCreator<Partial<UserDefineOption>> = (opts) => {
  // @ts-ignore
  const { outdir, prefix, importFrom, dryRun, cwd, format, remove, exclude, include, exports } = defuOverrideArray<UserDefineOption, Partial<UserDefineOption>[]>(opts, {
    cwd: process.cwd(),
    outdir: 'cva',
    importFrom: 'class-variance-authority',
    dryRun: false,
    format: 'ts',
    remove: true,
    exclude: [/node_modules/],
    exports: {
      base: true,
      variants: true,
      compoundVariants: true,
      defaultVariants: true,
    },
  })
  const filter = createFilter(include, exclude)
  const extractPlugin = extract({
    prefix,
    process(res) {
      if (res) {
        const filename = res.meta.path // ?? res.file
        if (filename && !dryRun) {
          const isRelative = filename.startsWith('.')
          const targetFormat = <'js' | 'ts'>res.meta.format ?? format
          const { code } = generateCva({
            ...res,
            format: targetFormat,
            importFrom,
            exports,
          })
          const extname = path.extname(filename)
          if (isRelative) {
            if (res.file) {
              const filepath = path.resolve(path.dirname(res.file), filename)
              ensureDir(path.dirname(filepath))
              let file = filepath
              if (!extname) {
                file = `${filepath}.${targetFormat}`
              }
              fs.writeFileSync(file, code, 'utf8')
            }
          }
          else {
            const filepath = path.resolve(cwd, outdir, filename)
            ensureDir(path.dirname(filepath))
            let file = filepath
            if (!extname) {
              file = `${filepath}.${targetFormat}`
            }
            fs.writeFileSync(file, code, 'utf8')
          }
        }
      }
    },
    remove,
    filter,
  })
  return {
    postcssPlugin: 'postcss-cva',
    plugins: [extractPlugin],
  }
}

creator.postcss = true

export default creator
