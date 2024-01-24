import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { set, get, pick, isError } from 'lodash'
import kleur from 'kleur'
import { createDefaultTailwindcssExtends } from '@icestack/config/defaults'
import { getCodegenOptions, loadSync } from '@icestack/config'
import { stages } from '@icestack/shared/constants'
import { compileScssString } from '@icestack/scss'
import { logger } from '@icestack/logger'
import type { CodegenOptions, ILayer, CssInJs, CreatePresetOptions } from '@icestack/types'
import { defu, JSONStringify, defuOverrideArray, objHash } from '@icestack/shared'
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
  process,
  extractCvaParamsPlugin,
  CvaParams
} from '@icestack/postcss-utils'
import { LRUCache } from 'lru-cache'
// import md5 from 'md5'
import { StringOptions } from 'sass'
import { name } from '../package.json'
import { utilitiesNames, utilitiesMap } from './utilities'
import { handleOptions } from './components'
import { calcBase } from './base'
import { generateIndexCode, generateCva } from '@/generate'
import { createResolveDir } from '@/dirs'

const { resolveJsDir, getCssPath, getJsPath, getCssResolvedPath, getScssPath, getCvaPath } = createResolveDir(name)

function ensureDirSync(p: string) {
  if (!fs.existsSync(p)) {
    fs.mkdirSync(p, {
      recursive: true
    })
  }
}

const lru = new LRUCache<string, object>({ max: 50 })

const hashLru = new LRUCache<string, string>({ max: 1000 })

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
  cva?: boolean
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
    const o = loadSync({
      configFile: opts
    })
    if (o) {
      const { config, filepath } = o
      opts = config
      configFilepath = filepath
    }
  }

  const options = getCodegenOptions(opts as CodegenOptions)
  const configHash = objHash(options)

  function getCache(key: string) {
    if (configFilepath) {
      return lru.get(configFilepath + '#' + key)
    }
  }

  function setCache(key: string, value: object) {
    if (configFilepath) {
      return lru.set(configFilepath + '#' + key, value)
    }
  }

  function setHash(key: string, value: string) {
    if (configFilepath) {
      return hashLru.set(configFilepath + '#' + key, value)
    }
  }

  function getHash(key: string) {
    if (configFilepath) {
      return hashLru.get(configFilepath + '#' + key)
    }
  }

  const {
    outdir,
    dryRun,
    postcss,
    mode: globalMode,
    pick: globalPick,
    components = {},
    log,
    tailwindcssConfig,
    utilities,
    sassOptions: _sassOptions,
    base,
    cva: globalCva
  } = options
  const sassOptions = defu<StringOptions<'sync'>, StringOptions<'sync'>[]>(
    _sassOptions,
    configFilepath
      ? {
          importers: [
            {
              findFileUrl(url) {
                return new URL(pathToFileURL(path.resolve(path.dirname(configFilepath!), url)))
              }
            }
          ]
        }
      : {}
  )
  const { prefix: _globalPrefix, varPrefix: _globalVarPrefix, plugins: globalPostcssPlugins } = postcss!
  const cache: {
    base: undefined | object
    components: undefined | object
    utilities: undefined | object
    configHash: string
    tailwindcssConfig: undefined | ReturnType<typeof buildTailwindcssConfig>
    unocssConfig: undefined | ReturnType<typeof buildUnocssConfig>
    cva: Record<string, CvaParams[]>
  } = {
    base: undefined,
    components: undefined,
    utilities: undefined,
    tailwindcssConfig: undefined,
    unocssConfig: undefined,
    configHash,
    cva: {}
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
  const typesHash = objHash(types)
  const isTypesChanged = getHash('types') !== typesHash
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

  function preprocessCss(css: string, layer?: ILayer, name?: string, getCvaParams?: (params?: CvaParams) => void) {
    let plugins: AcceptedPlugin[] = []

    if (Array.isArray(globalPostcssPlugins)) {
      plugins.push(...globalPostcssPlugins)
    } else if (typeof globalPostcssPlugins === 'function') {
      plugins = globalPostcssPlugins(plugins)
    }

    if (layer === 'components' && name) {
      const t = components[name]

      if (typeof t === 'object') {
        const { postcss, selector } = t
        const varPrefixOptions = resolveVarPrefixOption(postcss?.varPrefix)
        const varPrefixerPlugin = getCssVarsPrefixerPlugin(defu(varPrefixOptions, globalVarPrefix))
        varPrefixerPlugin && plugins.push(varPrefixerPlugin)
        const prefixOptions = resolvePrefixOption(postcss?.prefix)
        const oo = defu(prefixOptions, globalPrefix)
        const prefixerPlugin = getPrefixerPlugin(oo)
        prefixerPlugin && plugins.push(prefixerPlugin)

        plugins.push(
          extractCvaParamsPlugin({
            process: getCvaParams,
            prefix: oo.prefix,
            selector
          })
        )
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
    let cvaParams: CvaParams | undefined
    const { root: cssRoot } = preprocessCss(css, layer, suffixes[0], (params) => {
      cvaParams = params
    })

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
      // cvaParams
    })
    return {
      root,
      scss,
      css,
      cssRoot,
      resolvedCss,
      resolvedCssRoot,
      cssInJs,
      cvaParams
    }
  }

  function internalDump({
    relPath,
    cssRoot,
    resolvedCssRoot,
    cssInJs,
    scss
    // cvaParams
  }: {
    relPath: string
    // scssRoot: Root
    scss: string
    cssRoot: Root
    resolvedCssRoot: Root
    cssInJs: CssInJs
    // cvaParams?: CvaParams
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
    // css -> cva
    // if (cvaParams) {
    //   // configFilepath
    //   const code = generateCva({
    //     ...globalCva,
    //     ...cvaParams
    //   })
    //   writeFile(cvaPath, code)
    // }
  }

  async function buildBase() {
    const layer: ILayer = 'base'
    const hashCode = objHash(base ?? {})
    const hasChanged = getHash(layer) !== hashCode
    const hit = getCache(layer)
    if (hasChanged || !hit) {
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
      setCache(layer, res)
    } else {
      cache.base = hit
    }

    setHash(layer, hashCode)
    // setHash('types', typesHash)
  }

  async function buildUtilities() {
    const layer: ILayer = 'utilities'
    const hashCode = objHash(utilities ?? {})
    const hasChanged = getHash(layer) !== hashCode
    const hit = getCache(layer)
    if (hasChanged || !hit) {
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
      setCache(layer, res)
    } else {
      cache.utilities = hit
    }
    setHash(layer, hashCode)
  }

  async function buildComponents(opts?: Partial<{ include: string[]; progressBar: boolean }>) {
    const { include: componentsNames, progressBar } = defuOverrideArray(opts ?? {}, {
      include: allComponentsNames,
      progressBar: true
    })
    const layer: ILayer = 'components'

    const b1 = logger.createComponentsProgressBar()
    if (progressBar === false) {
      b1.destroy()
    }
    b1.start(componentsNames.length, 0)
    const hit = getCache(layer)
    const res = hit ?? {}
    let idx = 0
    for (const componentName of componentsNames) {
      const comOpt = components[componentName]
      if (comOpt) {
        const componentHashCode = objHash(comOpt)
        const hashPath = layer + '.' + componentName
        const componentHasChanged = getHash(hashPath) !== componentHashCode
        const componentCache = get(hit, componentName)
        if (isTypesChanged || componentHasChanged || !componentCache) {
          const cvaParamsArray: CvaParams[] = []
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
              if (result.cvaParams) {
                cvaParamsArray.unshift(result.cvaParams)
              }

              set(res, `${componentName}.${stage}`, result)
            } catch (error) {
              if (isError(error)) {
                throw new Error(error.message, {
                  cause: p
                })
              }
              throw error
            }
          }
          set(cache, `cva.${componentName}`, cvaParamsArray)
        }
        setHash(hashPath, componentHashCode)
      }

      b1.update(++idx, {
        componentName
      })
    }

    if (!dryRun) {
      const componentsJsOutputPath = path.resolve(resolveJsDir(outdir), 'components')
      const code = generateIndexCode(allComponentsNames, 'components')
      writeFile(path.resolve(componentsJsOutputPath, 'index.cjs'), code)
    }
    b1.stop()
    b1.clearLine()
    cache.components = res
    setCache(layer, res)
    setHash('types', typesHash)
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

  function buildCva() {
    // const {} = globalCva
    // for (const [name, cvaParams] of Object.entries(cache.cva)) {
    // }
  }

  async function build(options?: BuildOptions) {
    const {
      base: baseFlag,
      components: componentsFlag,
      config: configFlag,
      utilities: utilitiesFlag,
      cva: cvaFlag
    } = defu<BuildOptions, BuildOptions[]>(options, {
      base: true,
      components: true,
      config: true,
      utilities: true,
      cva: true
    })

    if (baseFlag) {
      const duration = await calcDuration(() => {
        return buildBase()
      })

      logger.success('build base finished! ' + kleur.green(`${duration.toFixed(2)}ms`))
    }
    if (utilitiesFlag) {
      const duration = await calcDuration(() => {
        return buildUtilities()
      })

      logger.success('build utilities finished! ' + kleur.green(`${duration.toFixed(2)}ms`))
    }

    if (componentsFlag) {
      const duration = await calcDuration(() => {
        return buildComponents()
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

    if (cvaFlag) {
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
    hashLru,
    lru,
    get cva() {
      return cache.cva
    },
    buildCva
  }
}

export type IContext = ReturnType<typeof createContext>
