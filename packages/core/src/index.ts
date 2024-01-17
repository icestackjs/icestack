import fs from 'node:fs'
import path from 'node:path'
import { set, get, pick, isError } from 'lodash'
import kleur from 'kleur'
import { createDefaultTailwindcssExtends } from '@icestack/config/defaults'
import { getCodegenOptions, loadSync } from '@icestack/config'
import { stages } from '@icestack/shared/constants'
import { compileScssString } from '@icestack/scss'
import { logger } from '@icestack/logger'
import type { CodegenOptions, ILayer, CssInJs, CreatePresetOptions } from '@icestack/types'
import { defu, JSONStringify } from '@icestack/shared'
import hash from 'object-hash'
import {
  getPrefixerPlugin,
  getCssVarsPrefixerPlugin,
  resolveTailwindcss,
  initTailwindcssConfig,
  resolvePrefixOption,
  resolveVarPrefixOption,
  AcceptedPlugin,
  Root,
  Rule,
  AtRule,
  parse,
  merge,
  mapCssStringToAst,
  objectify,
  process
} from '@icestack/postcss-utils'
import { LRUCache } from 'lru-cache'
import { name } from '../package.json'
import { utilitiesNames, utilitiesMap } from './utilities'
import { handleOptions } from './components'
import { calcBase } from './base'
import { generateIndexCode } from '@/generate'
import { createResolveDir } from '@/dirs'
const { resolveJsDir, getCssPath, getJsPath, getCssResolvedPath, getScssPath } = createResolveDir(name)

function ensureDirSync(p: string) {
  if (!fs.existsSync(p)) {
    fs.mkdirSync(p, {
      recursive: true
    })
  }
}

const lru = new LRUCache<string, object>({ max: 100 })
const hashMap: Record<
  string,
  Partial<{ index: string; base: string; components: string; componentsMap: Record<string, string>; utilities: string }> // baseThemes: Record<string, string>;
> = {}
// eslint-disable-next-line @typescript-eslint/ban-types
async function calcDuration(fn: Function) {
  const ts0 = performance.now()
  await fn()
  const ts1 = performance.now()
  return ts1 - ts0
}

export interface BuildOptions {
  base?: boolean
  utilities?: boolean
  config?: boolean
  components?: boolean
}

function getPaths(relPath: string, outdir?: string) {
  const cssPath = getCssPath(relPath, outdir)
  const jsPath = getJsPath(relPath, outdir)
  const cssResolvedPath = getCssResolvedPath(relPath, outdir)
  const scssPath = getScssPath(relPath, outdir)

  return {
    cssPath,
    jsPath,
    cssResolvedPath,
    scssPath
  }
}

export function createContext(opts?: CodegenOptions | string) {
  let configFilepath: string | undefined
  if (typeof opts === 'string') {
    const { config, filepath } = loadSync({
      configFile: opts
    })
    opts = config
    configFilepath = filepath
  }

  function getCache(key: string) {
    if (configFilepath) {
      return lru.get(key)
    }
  }

  function setCache(key: string, value: object) {
    if (configFilepath) {
      return lru.set(key, value)
    }
  }

  function setHash(key: string, value: string) {
    if (configFilepath) {
      return set(hashMap, key, value)
    }
  }

  function getHash(key: string) {
    if (configFilepath) {
      return get(hashMap, key)
    }
  }

  const options = getCodegenOptions(opts as CodegenOptions)
  const configHash = hash(options)
  if (configFilepath) {
    hashMap[configFilepath] = {
      // base: hash(options.base),
      // baseThemes: Object.entries(options.base?.themes).reduce<Record<string, string>>((acc, [name, opts]) => {
      //   acc[name] = hash(opts)
      //   return acc
      // }, {}),
      // components: hash(options.components),
      componentsMap: {}
      //  Object.entries(options.components).reduce<Record<string, string>>((acc, [name, opts]) => {
      //   acc[name] = hash(opts)
      //   return acc
      // }, {}),
      // index: configHash
      // utilities: hash(options.utilities)
    }
  }

  const { outdir, dryRun, postcss, mode: globalMode, pick: globalPick, components = {}, log, tailwindcssConfig, utilities, sassOptions } = options
  const { prefix: _globalPrefix, varPrefix: _globalVarPrefix, plugins: globalPostcssPlugins } = postcss!
  const cache: {
    base: undefined | Record<string, object>
    components: undefined | Record<string, object>
    utilities: undefined | Record<string, object>
    configHash: string
    tailwindcssConfig: undefined | ReturnType<typeof buildTailwindcssConfig>
    unocssConfig: undefined | ReturnType<typeof buildUnocssConfig>
  } = {
    base: undefined,
    components: undefined,
    utilities: undefined,
    tailwindcssConfig: undefined,
    unocssConfig: undefined,
    configHash
  }
  const globalPrefix = resolvePrefixOption(_globalPrefix)
  const globalVarPrefix = resolveVarPrefixOption(_globalVarPrefix)
  if (typeof log === 'boolean') {
    logger.logFlag = log
  }
  const bases = {
    index: calcBase(options),
    legacy: calcBase(options, { slash: false })
  }
  const { types, colors: tailwindcssColors } = bases.index

  const { colors: unocssColors } = bases.legacy

  function writeFile(file: string, data: string) {
    if (!dryRun) {
      ensureDirSync(path.dirname(file))
      fs.writeFileSync(file, data, 'utf8')
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

      if (comOpt.pick === undefined) {
        comOpt.pick = globalPick
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
        ...createDefaultTailwindcssExtends({ varPrefix: globalVarPrefix ? globalVarPrefix.varPrefix : '' }),
        colors: tailwindcssColors
      }
    }
  })

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

  async function internalBuild(opts: { root?: AtRule | Root | Rule; layer: ILayer; suffixes: string[]; relPath: string }) {
    const { layer, suffixes, relPath, root = new Root() } = opts

    const scss = root.toString()

    const { css } = compileScssString(scss, sassOptions)
    const { root: cssRoot } = preprocessCss(css, layer, suffixes[0])

    const { root: resolvedCssRoot, css: resolvedCss } = await resolveTailwindcss({
      css: cssRoot as Root,
      config: twConfig,
      options
    })

    const cssInJs = objectify(resolvedCssRoot as Root)

    internalDump({
      cssInJs,
      cssRoot: cssRoot as Root,
      relPath,
      resolvedCssRoot: resolvedCssRoot as Root,
      scss
    })
    return {
      root,
      scss,
      css,
      cssRoot,
      resolvedCss,
      resolvedCssRoot,
      cssInJs
    }
  }

  function internalDump({
    relPath,
    cssRoot,
    resolvedCssRoot,
    cssInJs,
    scss
  }: {
    relPath: string
    // scssRoot: Root
    scss: string
    cssRoot: Root
    resolvedCssRoot: Root
    cssInJs: CssInJs
  }) {
    const { cssPath, cssResolvedPath, jsPath, scssPath } = getPaths(relPath, outdir)

    // scss
    writeFile(scssPath, scss)
    // scss -> css
    writeFile(cssPath, cssRoot.toString())
    // css -> css
    writeFile(cssResolvedPath, resolvedCssRoot.toString())
    // css -> js
    const data = 'module.exports = ' + JSONStringify(cssInJs)
    writeFile(jsPath, data)
  }

  async function buildBase() {
    const layer: ILayer = 'base'
    const res: Record<string, any> = {}
    for (const x of Object.keys(bases)) {
      res[x] = await internalBuild({
        root: bases[x as keyof typeof bases].root,
        layer,
        suffixes: [x],
        relPath: `${layer}/${x}`
      })
    }

    cache.base = res
  }

  async function buildUtilities() {
    const layer: ILayer = 'utilities'
    const res: Record<string, Record<string, CssInJs>> = {}
    const refs: string[] = []
    for (const utilityName of utilitiesNames) {
      const suffixes = [utilityName]
      const suffix = suffixes.join('.')
      const fn = get(utilitiesMap, suffix, () => {})
      // @ts-ignore
      const css = suffix === 'index' ? fn?.(utilities?.extraCss) : fn?.()
      if (css) {
        const root = parse(css)
        const result = await internalBuild({
          root,
          layer,
          suffixes,
          relPath: `${layer}/${utilityName}`
        })
        refs.push(utilityName)
        set(res, utilityName, result)
      }
    }

    if (!dryRun) {
      const outputPath = path.resolve(resolveJsDir(outdir), 'utilities')
      const code = generateIndexCode(refs, 'utilities')
      writeFile(path.resolve(outputPath, 'index.cjs'), code)
    }

    cache.utilities = res
  }

  async function buildComponents(componentsNames: string[] = allComponentsNames) {
    const b1 = logger.createComponentsProgressBar()
    b1.start(componentsNames.length, 0)
    const layer: ILayer = 'components'
    const res: Record<string, Record<string, CssInJs>> = {}
    let idx = 0
    for (const componentName of componentsNames) {
      // const start = performance.now()
      for (const stage of stages) {
        const suffixes = [componentName, 'defaults', stage]
        const p = suffixes.join('.')
        const cssArray = get(presets, p, []) as string[]
        const root = merge(...(mapCssStringToAst(cssArray) as Root[]))

        try {
          const result = await internalBuild({
            root,
            layer,
            suffixes,
            relPath: `${layer}/${componentName}/${stage}`
          })

          set(res, `${componentName}.${stage}`, result)
        } catch (error) {
          if (isError(error)) {
            throw new Error(error.message, {
              cause: p
            })
          }
          throw error
        }

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
      writeFile(path.resolve(componentsJsOutputPath, 'index.cjs'), code)
    }
    b1.stop()
    b1.clearLine()
    cache.components = res
  }

  function buildTailwindcssConfig() {
    if (!dryRun) {
      const code = 'module.exports = ' + JSONStringify(pick(twConfig, ['theme']))
      const outputDir = path.resolve(resolveJsDir(outdir), 'tailwindcss')
      const outputPath = path.resolve(outputDir, 'config.cjs')
      writeFile(outputPath, code)
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

      const outputPath = path.resolve(outputDir, 'config.cjs')
      writeFile(outputPath, code)
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

    if (baseFlag) {
      const duration = await calcDuration(async () => {
        await buildBase()
      })

      logger.success('build base finished! ' + kleur.green(`${duration.toFixed(2)}ms`))
    }
    if (utilitiesFlag) {
      const duration = await calcDuration(async () => {
        await buildUtilities()
      })

      logger.success('build utilities finished! ' + kleur.green(`${duration.toFixed(2)}ms`))
    }

    if (componentsFlag) {
      const duration = await calcDuration(async () => {
        await buildComponents()
      })

      logger.success('build components finished! ' + kleur.green(`${duration.toFixed(2)}ms`))
    }

    if (configFlag) {
      const duration = await calcDuration(() => {
        const tailwindcssConfig = buildTailwindcssConfig()
        const unocssConfig = buildUnocssConfig()
        cache.tailwindcssConfig = tailwindcssConfig
        cache.unocssConfig = unocssConfig
      })

      logger.success('build config finished! ' + kleur.green(`${duration.toFixed(2)}ms`))
    }
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
    createPreset,
    preprocessCss,
    configHash,
    get base() {
      return cache.base
    },
    get components() {
      return cache.components
    },
    get utilities() {
      return cache.utilities
    },
    hashMap
  }
}

export type IContext = ReturnType<typeof createContext>
