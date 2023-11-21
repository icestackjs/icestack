import fs from 'node:fs'
import path from 'node:path'
import { set, get } from 'lodash'
import * as sass from 'sass'
import postcssJs, { CssInJs } from 'postcss-js'
import postcss, { Root, AcceptedPlugin } from 'postcss'
import defu from 'defu'
import { Value } from 'sass'
import { CodegenOptions, DeepPartial } from './types'
import { generateIndexCode } from './js/generate'
import { getColors } from './colors'
import { transformJsToSass } from './sass/utils'
import { createDefaultTailwindcssExtends } from './defaults'
import { logger } from './log'
import { getCodegenOptions } from '@/options'
import { resolveJsDir, getCssPath, getJsPath, getCssResolvedPath, scssTemplate } from '@/dirs'
import { stages } from '@/constants'
import { JSONStringify, ensureDirSync } from '@/utils'
import { resolveTailwindcss, initConfig } from '@/postcss/tailwindcss'
import { getPlugin as getCssVarsPrefixerPlugin } from '@/postcss/custom-property-prefixer'
import prefixer from '@/postcss/prefixer'
import { CreatePresetOptions, handleOptions } from '@/components/shared'
import { schemaMap, names as componentsNames } from '@/components'
import { utilitiesNames, utilitiesMap } from '@/utilities'
import * as base from '@/base'

export function createContext(opts?: DeepPartial<CodegenOptions>) {
  const options = getCodegenOptions(opts)
  const { outdir, dryRun, prefix, varPrefix, mode: globalMode, components, log } = options
  logger.logFlag = log
  const { allTypes, presets: basePresets } = base.calcBase(options)

  function createPreset(opts: CreatePresetOptions): Record<(typeof componentsNames)[number], object> {
    return Object.entries(components).reduce<Record<string, object>>((acc, [name, comOpt]) => {
      if (comOpt === false) {
        return acc
      }
      const lib = schemaMap[name]
      if (comOpt.mode === undefined) {
        comOpt.mode = globalMode
      }
      const defaults = lib?.schema({
        ...opts,
        selector: comOpt.selector!
      })
      acc[name] = handleOptions(defaults, comOpt)
      return acc
    }, {})
  }

  const presets = createPreset({
    types: allTypes
  })
  const colors = getColors(options)
  const allComponentsNames = Object.keys(presets)
  const buildComponentsTwConfig = initConfig({
    theme: {
      extend: {
        ...createDefaultTailwindcssExtends({ varPrefix }),
        colors
      }
    }
  })

  const buildUtilitiesTwConfig = initConfig({
    theme: {
      extend: {
        colors
      }
    }
  })

  function compileScss(defaultPath?: string) {
    const sassOptions: sass.Options<'sync'> = {
      functions: {
        "inject($path:'')": (args: Value[]) => {
          const ppp = (args[0].assertString().text || defaultPath) ?? ''
          const sign = ppp.indexOf('.')
          const t = ppp.slice(0, Math.max(0, sign))
          const p = ppp.slice(Math.max(0, sign + 1))
          let res = null
          switch (t) {
            case 'components': {
              res = get(presets, p, {})
              break
            }
            case 'base': {
              res = basePresets
              break
            }
            case 'utilities': {
              const { options } = get(utilitiesMap, p, {
                options: () => {}
              })
              res = options?.()
              break
            }
            default:
          }
          return transformJsToSass(res)
        }
      }
    }

    const result = sass.compile(scssTemplate, sassOptions)
    const plugins: AcceptedPlugin[] = [getCssVarsPrefixerPlugin(varPrefix)]

    if (typeof prefix === 'string') {
      plugins.push(
        prefixer({
          prefix
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

  async function buildComponents() {
    const config = buildComponentsTwConfig

    const res: Record<string, Record<string, CssInJs>> = {}
    for (const componentName of allComponentsNames) {
      // const start = performance.now()
      for (const stage of stages) {
        const { css: cssOutput } = compileScss(`components.${componentName}.defaults.${stage}`)
        const relPath = `components/${componentName}/${stage}.scss`
        const cssPath = getCssPath(relPath, outdir)
        const jsPath = getJsPath(relPath, outdir)
        const cssResolvedPath = getCssResolvedPath(relPath, outdir)

        if (!dryRun) {
          ensureDirSync(path.dirname(cssPath))
          ensureDirSync(path.dirname(jsPath))
          ensureDirSync(path.dirname(cssResolvedPath))
        }

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
          const data = 'module.exports = ' + JSONStringify(cssJsObj)
          // css -> js
          fs.writeFileSync(jsPath, data, 'utf8')
        }
        set(res, `${componentName}.${stage}`, cssJsObj)
        // res[componentName][stage] = cssJsObj
      }
      // const end = performance.now()
      // logger.success(`build component [${componentName}] finished! ` + `${end - start}ms`)
    }
    return res
  }

  async function buildUtilities() {
    const config = buildUtilitiesTwConfig

    const res: Record<string, Record<string, CssInJs>> = {}
    for (const utilityName of utilitiesNames) {
      const { css: cssOutput } = compileScss(`utilities.${utilityName}`)
      const relPath = `utilities/${utilityName}.scss`
      const cssPath = getCssPath(relPath, outdir)
      const jsPath = getJsPath(relPath, outdir)
      const cssResolvedPath = getCssResolvedPath(relPath, outdir)

      if (!dryRun) {
        ensureDirSync(path.dirname(cssPath))
        ensureDirSync(path.dirname(jsPath))
        ensureDirSync(path.dirname(cssResolvedPath))
      }

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
        const data = 'module.exports = ' + JSONStringify(cssJsObj)
        // css -> js
        fs.writeFileSync(jsPath, data, 'utf8')
      }
      set(res, `${utilityName}`, cssJsObj)
    }
    return res
  }

  async function buildBase() {
    // const name = path.basename(filename, '.scss')
    const { dryRun, tailwindcssConfig } = options
    const { css: cssOutput } = compileScss('base.index')
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
      const data = 'module.exports = ' + JSONStringify(cssJsObj)
      // css -> js
      fs.writeFileSync(jsPath, data, 'utf8')
    }

    return cssJsObj
  }

  async function generate(outSideLayerCss: 'base' | 'utilities' | 'components') {
    switch (outSideLayerCss) {
      case 'base': {
        return await buildBase()
      }
      case 'utilities': {
        const res = await buildUtilities()

        if (!dryRun) {
          const outputPath = path.resolve(resolveJsDir(outdir), 'utilities')
          const code = generateIndexCode(utilitiesNames, 'utilities')
          fs.writeFileSync(path.resolve(outputPath, 'index.js'), code, 'utf8')
        }

        return res
      }
      case 'components': {
        const res = await buildComponents()

        if (!dryRun) {
          const componentsJsOutputPath = path.resolve(resolveJsDir(outdir), 'components')
          const code = generateIndexCode(allComponentsNames, 'components')
          fs.writeFileSync(path.resolve(componentsJsOutputPath, 'index.js'), code, 'utf8')
        }

        return res
      }
      default: {
        logger.warn("outSideLayerCss should be in 'base' | 'utilities' | 'components' !")
        break
      }
    }
  }

  async function build() {
    let start = performance.now()
    const base = await generate('base')
    let end = performance.now()
    logger.success('build base finished! ' + `${end - start}ms`)
    start = performance.now()
    const utilities = await generate('utilities')
    end = performance.now()
    logger.success('build utilities finished! ' + `${end - start}ms`)
    start = performance.now()
    const components = await generate('components')
    end = performance.now()
    logger.success('build components finished! ' + `${end - start}ms`)

    return {
      base,
      components,
      utilities
    }
  }

  return {
    presets,
    options,
    generate,
    buildBase,
    buildComponents,
    buildUtilities,
    build,
    compileScss,
    createPreset
  }
}

export type IContext = ReturnType<typeof createContext>
