import fs from 'node:fs/promises'
import path from 'node:path'
import * as sass from 'sass'
import { compileString } from '@icestack/css2js'
import { merge } from 'merge'
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

export async function buildScss(opts: IBuildScssOptions) {
  const { filename, resolveConfig, stats = await fs.stat(filename), outdir, options, outSideLayerCss } = opts
  if (stats && stats.isFile() && /\.scss$/.test(filename)) {
    const name = path.basename(filename, '.scss')
    const cssOutput = await compileScss(filename, options)

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
    const cssJsObj = await compileString({
      css
    })

    if (outSideLayerCss === 'utilities') {
      // @ts-ignore
      const hit = options?.components?.[name]
      if (hit && Array.isArray(hit.append)) {
        merge(cssJsObj, ...hit.append)
      }
    }

    const data = 'module.exports = ' + JSON.stringify(cssJsObj, null, 2)
    // css -> js
    await fs.writeFile(jsPath, data, 'utf8')
  }
}
