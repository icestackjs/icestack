import fs from 'node:fs'
import path from 'node:path'
import { set, get, pick } from 'lodash'
import * as sass from 'sass'
import type { Value } from 'sass'
import type { Root, AcceptedPlugin } from 'postcss'
import kleur from 'kleur'
import { transformJsToSass } from '@/sass'
import { createDefaultTailwindcssExtends } from '@/defaults'
import { logger } from '@/log'
import { JSONStringify, ensureDirSync } from '@/utils'
import { generateIndexCode } from '@/generate'
import type { CodegenOptions, ILayer, CssInJs, CreatePresetOptions } from '@/types'
import { defu } from '@/shared'
import { getCodegenOptions } from '@/options'
import { resolveJsDir, getCssPath, getJsPath, getCssResolvedPath, scssTemplate } from '@/dirs'
import { stages } from '@/constants'
import { handleOptions } from '@/components/utils'
import { utilitiesNames, utilitiesMap } from '@/utilities'
import { calcBase } from '@/base'
import { getPrefixerPlugin, getCssVarsPrefixerPlugin, resolveTailwindcss, initTailwindcssConfig, objectify, process, resolvePrefixOption, resolveVarPrefixOption } from '@/postcss'
function makeDefaultPath(layer: ILayer, ...suffixes: string[]) {
  return `${layer}.${suffixes.join('.')}`
}

export interface BuildOptions {
  base?: boolean
  utilities?: boolean
  config?: boolean
  components?: boolean
}

export function createContext(opts?: CodegenOptions) {
  const options = getCodegenOptions(opts)
  const { outdir, dryRun, postcss, mode: globalMode, components = {}, log, tailwindcssConfig, utilities } = options
  const { prefix: _globalPrefix, varPrefix: _globalVarPrefix, plugins: globalPostcssPlugins } = postcss!

  const globalPrefix = resolvePrefixOption(_globalPrefix)
  const globalVarPrefix = resolveVarPrefixOption(_globalVarPrefix)
  if (typeof log === 'boolean') {
    logger.logFlag = log
  }

  const { types, presets: tailwindcssPresets, colors: tailwindcssColors } = calcBase(options)

  const { presets: unocssPresets, colors: unocssColors } = calcBase(options, { slash: false })

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
    types
  })

  const allComponentsNames = Object.keys(presets)
  const twConfig = initTailwindcssConfig(tailwindcssConfig, {
    theme: {
      extend: {
        ...createDefaultTailwindcssExtends({ varPrefix: globalVarPrefix ? globalVarPrefix.varPrefix : undefined }),
        colors: tailwindcssColors
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
              res = get(
                {
                  index: tailwindcssPresets,
                  unocss: unocssPresets
                },
                suffix,
                {}
              )

              break
            }
            case 'utilities': {
              const fn = get(utilitiesMap, suffix, () => {})
              // @ts-ignore
              res = suffix === 'custom' ? fn?.(utilities?.extraCss) : fn?.()

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
    let plugins: AcceptedPlugin[] = []

    if (Array.isArray(globalPostcssPlugins)) {
      plugins.push(...globalPostcssPlugins)
    } else if (typeof globalPostcssPlugins === 'function') {
      plugins = globalPostcssPlugins(plugins)
    }

    if (layer === 'components' && name) {
      const t = components[name]

      if (typeof t === 'object') {
        const { postcss } = t
        const varPrefixOptions = resolveVarPrefixOption(postcss?.varPrefix)
        const varPrefixerPlugin = getCssVarsPrefixerPlugin(defu(varPrefixOptions, globalVarPrefix))
        varPrefixerPlugin && plugins.push(varPrefixerPlugin)
        const prefixOptions = resolvePrefixOption(postcss?.prefix)
        const prefixerPlugin = getPrefixerPlugin(defu(prefixOptions, globalPrefix))
        prefixerPlugin && plugins.push(prefixerPlugin)

        if (Array.isArray(postcss?.plugins)) {
          plugins.push(...postcss.plugins)
        } else if (typeof postcss?.plugins === 'function') {
          plugins = postcss?.plugins(plugins)
        }
      }
    } else {
      const varPrefixerPlugin = getCssVarsPrefixerPlugin(globalVarPrefix!)
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

    const cssInJs = objectify(root as Root)

    const data = 'module.exports = ' + JSONStringify(cssInJs)
    // css -> js
    writeFile(jsPath, data)

    return {
      css,
      resolvedCss,
      cssInJs
    }
  }

  async function buildBase() {
    const layer: ILayer = 'base'
    const res: Record<string, any> = {}
    for (const x of ['index', 'unocss']) {
      res[x] = await internalBuild({
        layer,
        suffixes: [x],
        relPath: `${layer}/${x}.scss`
      })
    }

    return res
  }

  async function buildUtilities() {
    const layer: ILayer = 'utilities'
    const res: Record<string, Record<string, CssInJs>> = {}
    for (const utilityName of utilitiesNames) {
      const result = await internalBuild({
        layer,
        suffixes: [utilityName],
        relPath: `${layer}/${utilityName}.scss`
      })

      set(res, utilityName, result)
    }

    if (!dryRun) {
      const outputPath = path.resolve(resolveJsDir(outdir), 'utilities')
      const code = generateIndexCode(utilitiesNames, 'utilities')
      fs.writeFileSync(path.resolve(outputPath, 'index.cjs'), code, 'utf8')
    }

    return res
  }

  async function buildComponents() {
    const b1 = logger.createComponentsProgressBar()
    b1.start(allComponentsNames.length, 0)
    const layer: ILayer = 'components'
    const res: Record<string, Record<string, CssInJs>> = {}
    let idx = 0
    for (const componentName of allComponentsNames) {
      // const start = performance.now()
      for (const stage of stages) {
        const result = await internalBuild({
          layer,
          suffixes: [componentName, 'defaults', stage],
          relPath: `${layer}/${componentName}/${stage}.scss`
        })

        set(res, `${componentName}.${stage}`, result)
        // res[componentName][stage] = cssJsObj
      }
      b1.update(++idx, {
        componentName
      })
      // const end = performance.now()
      // logger.success(`build component [${componentName}] finished! ` + `${end - start}ms`)
    }

    if (!dryRun) {
      const componentsJsOutputPath = path.resolve(resolveJsDir(outdir), 'components')
      const code = generateIndexCode(allComponentsNames, 'components')
      fs.writeFileSync(path.resolve(componentsJsOutputPath, 'index.cjs'), code, 'utf8')
    }
    b1.stop()
    b1.clearLine()

    return res
  }

  function buildTailwindcssConfig() {
    if (!dryRun) {
      const code = 'module.exports = ' + JSONStringify(pick(twConfig, ['theme']))
      const outputDir = path.resolve(resolveJsDir(outdir), 'tailwindcss')
      ensureDirSync(outputDir)
      const outputPath = path.resolve(outputDir, 'config.cjs')
      fs.writeFileSync(outputPath, code, 'utf8')
    }

    return twConfig
  }

  function buildUnocssConfig() {
    const config = {
      theme: {
        colors: unocssColors
      }
    }
    if (!dryRun) {
      const code = 'module.exports = ' + JSONStringify(config)
      const outputDir = path.resolve(resolveJsDir(outdir), 'unocss')
      ensureDirSync(outputDir)
      const outputPath = path.resolve(outputDir, 'config.cjs')
      fs.writeFileSync(outputPath, code, 'utf8')
    }

    return config
  }

  async function build(options?: BuildOptions) {
    const {
      base: baseFlag,
      components: componentsFlag,
      config: configFlag,
      utilities: utilitiesFlag
    } = defu<BuildOptions, BuildOptions[]>(options, {
      base: true,
      components: true,
      config: true,
      utilities: true
    })
    const result: {
      base?: Awaited<ReturnType<typeof buildBase>>
      utilities?: Awaited<ReturnType<typeof buildUtilities>>
      components?: Awaited<ReturnType<typeof buildComponents>>
      tailwindcssConfig?: Awaited<ReturnType<typeof buildTailwindcssConfig>>
      unocssConfig?: Awaited<ReturnType<typeof buildUnocssConfig>>
    } = {}
    if (baseFlag) {
      performance.mark('buildBase-start')
      const base = await buildBase()
      result.base = base
      performance.mark('buildBase-end')
      const buildBaseMeasure = performance.measure('buildBase', 'buildBase-start', 'buildBase-end')
      logger.success('build base finished! ' + kleur.green(`${buildBaseMeasure.duration.toFixed(2)}ms`))
    }
    if (utilitiesFlag) {
      performance.mark('buildUtilities-start')
      const utilities = await buildUtilities()
      result.utilities = utilities
      performance.mark('buildUtilities-end')
      const buildUtilitiesMeasure = performance.measure('buildUtilities', 'buildUtilities-start', 'buildUtilities-end')
      logger.success('build utilities finished! ' + kleur.green(`${buildUtilitiesMeasure.duration.toFixed(2)}ms`))
    }

    if (componentsFlag) {
      performance.mark('buildComponents-start')
      const components = await buildComponents()
      result.components = components
      performance.mark('buildComponents-end')
      const buildComponentsMeasure = performance.measure('buildComponents', 'buildComponents-start', 'buildComponents-end')
      logger.success('build components finished! ' + kleur.green(`${buildComponentsMeasure.duration.toFixed(2)}ms`))
    }

    if (configFlag) {
      performance.mark('buildConfig-start')
      const tailwindcssConfig = await buildTailwindcssConfig()
      const unocssConfig = await buildUnocssConfig()
      result.tailwindcssConfig = tailwindcssConfig
      result.unocssConfig = unocssConfig
      performance.mark('buildConfig-end')
      const buildConfigMeasure = performance.measure('buildConfig', 'buildConfig-start', 'buildConfig-end')
      logger.success('build config finished! ' + kleur.green(`${buildConfigMeasure.duration.toFixed(2)}ms`))
    }

    performance.clearMarks()
    performance.clearMeasures()
    return result
  }

  return {
    tailwindcssConfig: twConfig,
    buildBase,
    buildUtilities,
    buildComponents,
    buildTailwindcssConfig,
    buildUnocssConfig,
    presets,
    options,
    build,
    compileScss,
    createPreset,
    preprocessCss
  }
}

export type IContext = ReturnType<typeof createContext>
