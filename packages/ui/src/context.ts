import fs from 'node:fs'
import path from 'node:path'
import { set, get, pick } from 'lodash'
import * as sass from 'sass'
import type { Value } from 'sass'
import type { Root, AcceptedPlugin } from 'postcss'
import type { CodegenOptions, DeepPartial, ILayer, CssInJs } from './types'
import { generateIndexCode } from './js'
import { getColors } from './colors'
import { transformJsToSass } from './sass'
import { createDefaultTailwindcssExtends } from './defaults'
import { logger } from './log'
import { getCodegenOptions } from '@/options'
import { resolveJsDir, getCssPath, getJsPath, getCssResolvedPath, scssTemplate } from '@/dirs'
import { stages } from '@/constants'
import { JSONStringify, defu, ensureDirSync } from '@/utils'
import { CreatePresetOptions, handleOptions } from '@/components/shared'
import { utilitiesNames, utilitiesMap } from '@/utilities'
import * as base from '@/base'
import { getPrefixerPlugin, getCssVarsPrefixerPlugin, resolveTailwindcss, initTailwindcssConfig, objectify, process, resolvePrefixOption, resolveVarPrefixOption } from '@/postcss'

function makeDefaultPath(layer: ILayer, ...suffixes: string[]) {
  return `${layer}.${suffixes.join('.')}`
}

export function createContext(opts?: DeepPartial<CodegenOptions>) {
  const options = getCodegenOptions(opts)
  const { outdir, dryRun, prefix: _globalPrefix, varPrefix: _globalVarPrefix, mode: globalMode, components, log, tailwindcssConfig } = options
  const globalPrefix = resolvePrefixOption(_globalPrefix)
  const globalVarPrefix = resolveVarPrefixOption(_globalVarPrefix)
  logger.logFlag = log
  const { allTypes, presets: basePresets } = base.calcBase(options)

  function writeFile(file: string, data: string) {
    !dryRun && fs.writeFileSync(file, data, 'utf8')
  }

  function getPaths(relPath: string) {
    const cssPath = getCssPath(relPath, outdir)
    const jsPath = getJsPath(relPath, outdir)
    const cssResolvedPath = getCssResolvedPath(relPath, outdir)

    if (!dryRun) {
      ensureDirSync(path.dirname(cssPath))
      ensureDirSync(path.dirname(jsPath))
      ensureDirSync(path.dirname(cssResolvedPath))
    }
    return {
      cssPath,
      jsPath,
      cssResolvedPath
    }
  }

  function createPreset(opts: CreatePresetOptions): Record<string, object> {
    return Object.entries(components).reduce<Record<string, object>>((acc, [name, comOpt]) => {
      if (comOpt === false) {
        return acc
      }

      if (comOpt.mode === undefined) {
        comOpt.mode = globalMode
      }

      if (!comOpt.disabled) {
        acc[name] = handleOptions(comOpt, opts)
      }

      return acc
    }, {})
  }

  const presets = createPreset({
    types: allTypes
  })
  const colors = getColors(options)
  const allComponentsNames = Object.keys(presets)
  const twConfig = initTailwindcssConfig(tailwindcssConfig, {
    theme: {
      extend: {
        ...createDefaultTailwindcssExtends({ varPrefix: globalVarPrefix.varPrefix }),
        colors
      }
    }
  })

  function compileScss(defaultPath?: string) {
    const sassOptions: sass.Options<'sync'> = {
      functions: {
        "inject($path:'')": (args: Value[]) => {
          const p = (args[0].assertString().text || defaultPath) ?? ''
          const idx = p.indexOf('.')
          const layer = p.slice(0, Math.max(0, idx))
          const suffix = p.slice(Math.max(0, idx + 1))
          let res = null
          switch (layer) {
            case 'components': {
              res = get(presets, suffix, {})
              break
            }
            case 'base': {
              res = basePresets
              break
            }
            case 'utilities': {
              const { options } = get(utilitiesMap, suffix, {
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

    return sass.compile(scssTemplate, sassOptions)
  }

  function preprocessCss(css: string, layer?: ILayer, name?: string) {
    const plugins: AcceptedPlugin[] = []

    if (layer === 'components' && name) {
      const t = components[name]

      if (typeof t === 'object') {
        const varPrefixOptions = resolveVarPrefixOption(t.varPrefix)
        const varPrefixerPlugin = getCssVarsPrefixerPlugin(defu(varPrefixOptions, globalVarPrefix))
        varPrefixerPlugin && plugins.push(varPrefixerPlugin)
        const prefixOptions = resolvePrefixOption(t.prefix)
        const prefixerPlugin = getPrefixerPlugin(defu(prefixOptions, globalPrefix))
        prefixerPlugin && plugins.push(prefixerPlugin)
      }
    } else {
      const varPrefixerPlugin = getCssVarsPrefixerPlugin(globalVarPrefix)
      varPrefixerPlugin && plugins.push(varPrefixerPlugin)
      const prefixerPlugin = getPrefixerPlugin(globalPrefix)
      prefixerPlugin && plugins.push(prefixerPlugin)
    }

    return process(plugins, css)
  }

  async function internalBuild(opts: { layer: ILayer; suffixes: string[]; relPath: string }) {
    const { layer, suffixes, relPath } = opts
    const defaultPath = makeDefaultPath(layer, ...suffixes)
    const { css } = compileScss(defaultPath)
    const { css: cssOutput } = preprocessCss(css, layer, suffixes[0])
    const { cssPath, cssResolvedPath, jsPath } = getPaths(relPath)

    // scss -> css
    writeFile(cssPath, cssOutput)

    const { root, css: resolvedCss } = await resolveTailwindcss({
      css: cssOutput,
      config: twConfig,
      options
    })

    writeFile(cssResolvedPath, resolvedCss)

    const cssJsObj = objectify(root as Root)

    const data = 'module.exports = ' + JSONStringify(cssJsObj)
    // css -> js
    writeFile(jsPath, data)

    return {
      cssJsObj
    }
  }

  async function buildBase() {
    const layer: ILayer = 'base'
    const { cssJsObj } = await internalBuild({
      layer,
      suffixes: ['index'],
      relPath: `${layer}/index.scss`
    })
    return cssJsObj
  }

  async function buildUtilities() {
    const layer: ILayer = 'utilities'
    const res: Record<string, Record<string, CssInJs>> = {}
    for (const utilityName of utilitiesNames) {
      const { cssJsObj } = await internalBuild({
        layer,
        suffixes: [utilityName],
        relPath: `${layer}/${utilityName}.scss`
      })

      set(res, `${utilityName}`, cssJsObj)
    }

    if (!dryRun) {
      const outputPath = path.resolve(resolveJsDir(outdir), 'utilities')
      const code = generateIndexCode(utilitiesNames, 'utilities')
      fs.writeFileSync(path.resolve(outputPath, 'index.js'), code, 'utf8')
    }

    return res
  }

  async function buildComponents() {
    const layer: ILayer = 'components'
    const res: Record<string, Record<string, CssInJs>> = {}
    for (const componentName of allComponentsNames) {
      // const start = performance.now()
      for (const stage of stages) {
        const { cssJsObj } = await internalBuild({
          layer,
          suffixes: [componentName, 'defaults', stage],
          relPath: `${layer}/${componentName}/${stage}.scss`
        })

        set(res, `${componentName}.${stage}`, cssJsObj)
        // res[componentName][stage] = cssJsObj
      }
      // const end = performance.now()
      // logger.success(`build component [${componentName}] finished! ` + `${end - start}ms`)
    }

    if (!dryRun) {
      const componentsJsOutputPath = path.resolve(resolveJsDir(outdir), 'components')
      const code = generateIndexCode(allComponentsNames, 'components')
      fs.writeFileSync(path.resolve(componentsJsOutputPath, 'index.js'), code, 'utf8')
    }

    return res
  }

  function buildTailwindcssConfig() {
    if (!dryRun) {
      const code = 'module.exports = ' + JSONStringify(pick(twConfig, ['theme']))
      const outputDir = path.resolve(resolveJsDir(outdir), 'tailwindcss')
      ensureDirSync(outputDir)
      const outputPath = path.resolve(outputDir, 'config.js')
      fs.writeFileSync(outputPath, code, 'utf8')
    }

    return twConfig
  }

  async function build() {
    let start = performance.now()
    const base = await buildBase()
    let end = performance.now()
    logger.success('build base finished! ' + `${end - start}ms`)
    start = performance.now()
    const utilities = await buildUtilities()
    end = performance.now()
    logger.success('build utilities finished! ' + `${end - start}ms`)
    start = performance.now()
    const components = await buildComponents()
    end = performance.now()
    logger.success('build components finished! ' + `${end - start}ms`)
    start = performance.now()
    const tailwindcssConfig = await buildTailwindcssConfig()
    end = performance.now()
    logger.success('build tailwindcss config finished! ' + `${end - start}ms`)
    return {
      base,
      components,
      utilities,
      tailwindcssConfig
    }
  }

  return {
    tailwindcssConfig: twConfig,
    buildBase,
    buildUtilities,
    buildComponents,
    buildTailwindcssConfig,
    presets,
    options,
    build,
    compileScss,
    createPreset,
    preprocessCss
  }
}

export type IContext = ReturnType<typeof createContext>
