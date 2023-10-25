import fs from 'node:fs/promises'
import path from 'node:path'
import * as sass from 'sass'
import { compileString } from '@icestack/css2js'
import { createFunctions } from './functions'
import { ensureDir } from '@/utils'
import { getCssPath, getJsPath, scssDir, getCssResolvedpath } from '@/dirs'
import { CodegenOptions, IBuildScssOptions } from '@/types'
import { resolveTailwindcss, initConfig } from '@/postcss/compile/tailwindcss'
import { addVarPrefix } from '@/postcss/custom-property-prefixer'

// 1. scss
// 2. add var prefix
export function compileScss(filename: string, opts: CodegenOptions) {
  const sassOptions: sass.Options<'sync'> = {
    functions: createFunctions(opts)
  }
  const result = sass.compile(filename, sassOptions)
  return addVarPrefix(result.css)
}

export async function buildScss(options: IBuildScssOptions) {
  const { filename, resolveConfig, stats = await fs.stat(filename), outdir } = options
  if (stats && stats.isFile() && /\.scss$/.test(filename)) {
    const cssOutput = await compileScss(filename, options.options)

    const relPath = path.relative(scssDir, filename)
    const cssPath = getCssPath(relPath, outdir)
    const jsPath = getJsPath(relPath, outdir)
    const cssResolvedPath = getCssResolvedpath(relPath, outdir)

    await ensureDir(path.dirname(cssPath))
    await ensureDir(path.dirname(jsPath))
    await ensureDir(path.dirname(cssResolvedPath))

    const config = initConfig()

    resolveConfig?.(config)

    // scss -> css
    await fs.writeFile(cssPath, cssOutput, 'utf8')
    const css = await resolveTailwindcss({
      css: cssOutput,
      config
    })

    await fs.writeFile(cssResolvedPath, css, 'utf8')
    const data =
      'module.exports = ' +
      JSON.stringify(
        await compileString({
          css
        }),
        null,
        2
      )
    // css -> js
    await fs.writeFile(jsPath, data, 'utf8')
  }
}
