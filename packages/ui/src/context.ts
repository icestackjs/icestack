import fs from 'node:fs'
import path from 'node:path'
import { set, get } from 'lodash'
import * as sass from 'sass'
import postcssJs, { CssInJs } from 'postcss-js'
import postcss, { Root, AcceptedPlugin } from 'postcss'
import defu from 'defu'
import { Value } from 'sass'
import { CodegenOptions, IBuildScssOptions } from './types'
import { generateIndexCode } from './js/generate'
import { getColors } from './colors'
import { transformJsToSass } from './sass/utils'
import { createDefaultTailwindcssExtends } from './defaults'
import { logger } from './log'
import { resolveJsDir, getCssPath, getJsPath, getCssResolvedPath, scssTemplate } from '@/dirs'
import { stages } from '@/constants'
import { ensureDirSync } from '@/utils'
import { resolveTailwindcss, initConfig } from '@/postcss/tailwindcss'
import { getPlugin as getCssVarsPrefixerPlugin } from '@/postcss/custom-property-prefixer'
import prefixer from '@/postcss/prefixer'
import { CreatePresetOptions, handleOptions } from '@/components/shared'
import { componentsMap, componentsNames } from '@/components'
import { utilitiesNames, utilitiesMap } from '@/utilities'
import * as base from '@/base'
import { ComponentsValue } from '@/types'

export function createContext(options: CodegenOptions) {
  const { outdir, dryRun, prefix, varPrefix, mode, components, log } = options
  logger.logFlag = log
  const { allTypes, presets: basePresets } = base.calcBase(options)

  function getComponentOptions(name: string): Partial<ComponentsValue> {
    return defu(get(components, name, {}), { mode })
  }

  function createPreset(opts: CreatePresetOptions): Record<(typeof componentsNames)[number], any> {
    return Object.entries(componentsMap).reduce<Record<string, object>>((acc, [name, lib]) => {
      const comOpt = getComponentOptions(name)
      acc[name] = handleOptions(
        lib?.options({
          ...opts,
          selector: comOpt.selector!
        }),
        comOpt
      )
      return acc
    }, {})
  }

  const presets = createPreset({
    types: allTypes
  })

  function compileScss(filename: string, defaultPath?: string) {
    const functions = {}
    set(functions, "inject($path:'')", (args: Value[]) => {
      const ppp = (args[0].assertString().text || defaultPath) ?? ''
      const sign = ppp.indexOf('.')
      const t = ppp.slice(0, Math.max(0, sign))
      const p = ppp.slice(Math.max(0, sign + 1))
      switch (t) {
        case 'components': {
          const map = get(presets, p, {})
          return transformJsToSass(map)
        }
        case 'base': {
          return transformJsToSass(basePresets)
        }
        case 'utilities': {
          const { options } = get(utilitiesMap, p, {
            options: () => {}
          })
          const map = options?.()
          return transformJsToSass(map)
        }
        // No default
      }
    })

    const sassOptions: sass.Options<'sync'> = {
      functions
    }

    const result = sass.compile(filename, sassOptions)
    const plugins: AcceptedPlugin[] = [getCssVarsPrefixerPlugin(varPrefix)]
    if (typeof prefix === 'string') {
      plugins.push(
        prefixer({
          prefix,
          ignore: []
        })
      )
    } else if (typeof prefix === 'object') {
      plugins.push(prefixer(prefix))
    }
    // @ts-ignore
    return postcss(plugins).process(result.css, {
      from: undefined
    })
  }

  async function buildComponents(opts: IBuildScssOptions) {
    const { resolveConfig } = opts

    const res: Record<string, Record<string, CssInJs>> = {}
    for (const componentName of componentsNames) {
      for (const stage of stages) {
        const { css: cssOutput } = compileScss(scssTemplate, `components.${componentName}.defaults.${stage}`)
        const relPath = `components/${componentName}/${stage}.scss`
        const cssPath = getCssPath(relPath, outdir)
        const jsPath = getJsPath(relPath, outdir)
        const cssResolvedPath = getCssResolvedPath(relPath, outdir)

        if (!dryRun) {
          ensureDirSync(path.dirname(cssPath))
          ensureDirSync(path.dirname(jsPath))
          ensureDirSync(path.dirname(cssResolvedPath))
        }

        const config = initConfig()

        resolveConfig?.(config)

        // scss -> css
        !dryRun && fs.writeFileSync(cssPath, cssOutput, 'utf8')
        const { root, css } = await resolveTailwindcss({
          css: cssOutput,
          config,
          options
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

  async function buildUtilities(opts: IBuildScssOptions) {
    const { resolveConfig } = opts

    const res: Record<string, Record<string, CssInJs>> = {}
    for (const utilityName of utilitiesNames) {
      const { css: cssOutput } = compileScss(scssTemplate, `utilities.${utilityName}`)
      const relPath = `utilities/${utilityName}.scss`
      const cssPath = getCssPath(relPath, outdir)
      const jsPath = getJsPath(relPath, outdir)
      const cssResolvedPath = getCssResolvedPath(relPath, outdir)

      if (!dryRun) {
        ensureDirSync(path.dirname(cssPath))
        ensureDirSync(path.dirname(jsPath))
        ensureDirSync(path.dirname(cssResolvedPath))
      }

      const config = initConfig()

      resolveConfig?.(config)

      // scss -> css
      !dryRun && fs.writeFileSync(cssPath, cssOutput, 'utf8')
      const { root, css } = await resolveTailwindcss({
        css: cssOutput,
        config,
        options
      })

      !dryRun && fs.writeFileSync(cssResolvedPath, css, 'utf8')
      const cssJsObj = postcssJs.objectify(root as Root)

      if (!dryRun) {
        const data = 'module.exports = ' + JSON.stringify(cssJsObj, null, 2)
        // css -> js
        fs.writeFileSync(jsPath, data, 'utf8')
      }
      set(res, `${utilityName}`, cssJsObj)
    }
    return res
  }

  async function buildBase(opts: IBuildScssOptions) {
    const { resolveConfig } = opts

    // const name = path.basename(filename, '.scss')
    const { dryRun, tailwindcssConfig } = options
    const { css: cssOutput } = compileScss(scssTemplate, 'base.index')
    const relPath = `base/index.scss`
    const cssPath = getCssPath(relPath, outdir)
    const jsPath = getJsPath(relPath, outdir)
    const cssResolvedPath = getCssResolvedPath(relPath, outdir)

    if (!dryRun) {
      ensureDirSync(path.dirname(cssPath))
      ensureDirSync(path.dirname(jsPath))
      ensureDirSync(path.dirname(cssResolvedPath))
    }

    const config = defu(tailwindcssConfig, initConfig())

    resolveConfig?.(config)

    // scss -> css
    !dryRun && fs.writeFileSync(cssPath, cssOutput, 'utf8')
    const { root, css } = await resolveTailwindcss({
      css: cssOutput,
      config,
      options
    })

    !dryRun && fs.writeFileSync(cssResolvedPath, css, 'utf8')
    const cssJsObj = postcssJs.objectify(root as Root)

    if (!dryRun) {
      const data = 'module.exports = ' + JSON.stringify(cssJsObj, null, 2)
      // css -> js
      fs.writeFileSync(jsPath, data, 'utf8')
    }

    return cssJsObj
  }

  async function generate(outSideLayerCss: 'base' | 'utilities' | 'components') {
    const colors = getColors(options)
    switch (outSideLayerCss) {
      case 'base': {
        return await buildBase({})
      }
      case 'utilities': {
        const res = await buildUtilities({
          resolveConfig(config) {
            set(config, 'theme.extend.colors', colors)
          }
        })

        if (!dryRun) {
          const outputPath = path.resolve(resolveJsDir(outdir), 'utilities')
          const code = generateIndexCode(utilitiesNames, 'utilities')
          fs.writeFileSync(path.resolve(outputPath, 'index.js'), code, 'utf8')
        }

        return res
      }
      case 'components': {
        const res = await buildComponents({
          resolveConfig: (config) => {
            set(config, 'theme.extend', {
              ...createDefaultTailwindcssExtends({ varPrefix }),
              colors
            })
          }
        })

        if (!dryRun) {
          const componentsJsOutputPath = path.resolve(resolveJsDir(outdir), 'components')
          const code = generateIndexCode(componentsNames, 'components')
          fs.writeFileSync(path.resolve(componentsJsOutputPath, 'index.js'), code, 'utf8')
        }

        return res
      }
      default:
    }
  }

  return {
    options,
    generate,
    buildBase,
    buildComponents,
    compileScss,
    createPreset,
    getComponentOptions
  }
}

export type IContext = ReturnType<typeof createContext>
