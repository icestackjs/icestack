import fs from 'node:fs'
import path from 'node:path'
import * as sass from 'sass'
import { merge } from 'merge'
import postcssJs, { CssInJs } from 'postcss-js'
import postcss, { Root, AcceptedPlugin } from 'postcss'
import { set } from 'lodash'
import { createFunctions } from './functions'
import { transformJsToSass } from './utils'
import { ensureDirSync } from '@/utils'
import { getCssPath, getJsPath, scssDir, getCssResolvedpath } from '@/dirs'
import { CodegenOptions, IBuildScssOptions } from '@/types'
import { resolveTailwindcss, initConfig } from '@/postcss/tailwindcss'
import { getPlugin as getCssVarsPrefixerPlugin } from '@/postcss/custom-property-prefixer'
import prefixer from '@/postcss/prefixer'
import allComponents from '@/allComponents'
// 1. scss
// 2. add var prefix
export function compileScss(filename: string, opts: CodegenOptions, functions: Record<string, sass.CustomFunction<'sync'>> = {}) {
  const sassOptions: sass.Options<'sync'> = {
    functions: {
      ...createFunctions(opts),
      ...functions
    }
  }
  const result = sass.compile(filename, sassOptions)
  const plugins: AcceptedPlugin[] = [getCssVarsPrefixerPlugin(opts.varPrefix)]
  if (typeof opts.prefix === 'string') {
    plugins.push(
      prefixer({
        prefix: opts.prefix,
        ignore: []
      })
    )
  } else if (typeof opts.prefix === 'object') {
    plugins.push(prefixer(opts.prefix))
  }
  // console.log(filename)
  // @ts-ignore
  return postcss(plugins).process(result.css, {
    from: undefined
  }) // addVarPrefix(result.css)
}

export function buildScss(opts: IBuildScssOptions<CodegenOptions>) {
  const { filename, resolveConfig, outdir, options, outSideLayerCss } = opts

  const name = path.basename(filename, '.scss')
  const { dryRun } = options
  const { css: cssOutput } = compileScss(filename, options)

  const relPath = path.relative(scssDir, filename)
  const cssPath = getCssPath(relPath, outdir)
  const jsPath = getJsPath(relPath, outdir)
  const cssResolvedPath = getCssResolvedpath(relPath, outdir)

  if (!dryRun) {
    ensureDirSync(path.dirname(cssPath))
    ensureDirSync(path.dirname(jsPath))
    ensureDirSync(path.dirname(cssResolvedPath))
  }

  const config = initConfig()

  resolveConfig?.(config)

  // scss -> css
  !dryRun && fs.writeFileSync(cssPath, cssOutput, 'utf8')
  const { root, css } = resolveTailwindcss({
    css: cssOutput,
    config
  })

  !dryRun && fs.writeFileSync(cssResolvedPath, css, 'utf8')
  const cssJsObj = postcssJs.objectify(root as Root)

  if (outSideLayerCss === 'utilities') {
    // @ts-ignore
    // eslint-disable-next-line unicorn/consistent-destructuring
    const hit = options?.components?.[name]
    if (hit && Array.isArray(hit.append)) {
      merge(cssJsObj, ...hit.append)
    }
  }
  if (!dryRun) {
    const data = 'module.exports = ' + JSON.stringify(cssJsObj, null, 2)
    // css -> js
    fs.writeFileSync(jsPath, data, 'utf8')
  }

  return cssJsObj
}

export function buildComponents(opts: IBuildScssOptions<CodegenOptions>) {
  const { resolveConfig, outdir, options } = opts
  const { dryRun } = options
  const filename = path.resolve(scssDir, 'components/t.scss')
  const res: Record<string, Record<string, CssInJs>> = {}
  for (const componentName of allComponents) {
    for (const stage of ['base', 'styled', 'utils']) {
      const { css: cssOutput } = compileScss(filename, options, {
        'cp()': () => {
          return transformJsToSass(`${componentName}.defaults.${stage}`)
        }
      })
      const relPath = `components/${componentName}/${stage}.scss`
      const cssPath = getCssPath(relPath, outdir)
      const jsPath = getJsPath(relPath, outdir)
      const cssResolvedPath = getCssResolvedpath(relPath, outdir)

      if (!dryRun) {
        ensureDirSync(path.dirname(cssPath))
        ensureDirSync(path.dirname(jsPath))
        ensureDirSync(path.dirname(cssResolvedPath))
      }

      const config = initConfig()

      resolveConfig?.(config)

      // scss -> css
      !dryRun && fs.writeFileSync(cssPath, cssOutput, 'utf8')
      const { root, css } = resolveTailwindcss({
        css: cssOutput,
        config
      })

      !dryRun && fs.writeFileSync(cssResolvedPath, css, 'utf8')
      const cssJsObj = postcssJs.objectify(root as Root)

      if (!dryRun) {
        const data = 'module.exports = ' + JSON.stringify(cssJsObj, null, 2)
        // css -> js
        fs.writeFileSync(jsPath, data, 'utf8')
      }
      set(res, `${componentName}.${stage}`, cssJsObj)
      // res[componentName][stage] = cssJsObj
    }
  }
  return res
}
