import fs from 'node:fs/promises'
import fss from 'node:fs'
import path from 'node:path'
import * as sass from 'sass'
import { merge } from 'merge'
import postcssJs from 'postcss-js'
import { Root } from 'postcss'
import deasync from 'deasync'
import Fiber from 'fibers'
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
    const { css: cssOutput } = compileScss(filename, options)

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
    const { root, css } = await resolveTailwindcss({
      css: cssOutput,
      config
    })

    await fs.writeFile(cssResolvedPath, css, 'utf8')
    const cssJsObj = postcssJs.objectify(root as Root)

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

export function extractScss(opts: IBuildScssOptions) {
  const { filename, resolveConfig, options, outSideLayerCss } = opts
  const name = path.basename(filename, '.scss')
  const { css } = compileScss(filename, options)
  const config = initConfig()
  resolveConfig?.(config)
  const { root } = resolveTailwindcss({
    css,
    config
  })
  const cssJsObj = postcssJs.objectify(root as Root)
  if (outSideLayerCss === 'utilities') {
    // @ts-ignore
    const hit = options?.components?.[name]
    if (hit && Array.isArray(hit.append)) {
      merge(cssJsObj, ...hit.append)
    }
  }
  return cssJsObj
}
