import fs from 'node:fs/promises'
import type { Stats } from 'node:fs'
import path from 'node:path'
import * as sass from 'sass'
import postcss from 'postcss'
// import { trimStart } from 'lodash'
import { compileString } from '@icestack/css2js'
import tailwindcss, { Config } from 'tailwindcss'
import { OrderedMap } from 'immutable'
import { TinyColor } from '@ctrl/tinycolor'
import creator from 'postcss-custom-property-prefixer'
import { defaultVarPrefix } from './constants'
import { defaultVarsEntries } from './css-vars'
import { ensureDir } from './utils'
import { getCssPath, getJsPath, getPluginsPath, scssDir } from './dirs'

export function transformJsVToSassV(entries: [string, string][]): [sass.Value, sass.Value][] {
  return entries.map(([varName, value]) => {
    const color = new TinyColor(value)
    let v: sass.Value
    if (color.isValid) {
      let str = ''
      str = color.a < 1 && color.a > 0 ? `${color.r} ${color.g} ${color.b} / ${color.a}` : `${color.r} ${color.g} ${color.b}`
      v = new sass.SassString(str, {
        quotes: false
      })
    } else {
      v = new sass.SassString(value, {
        quotes: false
      })
    }
    return [
      new sass.SassString(varName, {
        quotes: false
      }),
      v
    ]
  })
}

export function transformJsVToSassMapList(entries: [string, string][]): [sass.Value, sass.Value][] {
  return entries.map(([varName, value]) => {
    const v = new sass.SassList(
      value.split(' ').map(
        (x) =>
          new sass.SassString(x, {
            quotes: false
          })
      )
    )
    return [
      new sass.SassString(varName, {
        quotes: false
      }),
      v
    ]
  })
}

export function transformJsVToSassMapMap(entries: [string, Record<string, string>][]): sass.SassMap {
  return new sass.SassMap(
    OrderedMap(
      entries.map(([varName, value]) => {
        const v = new sass.SassMap(
          OrderedMap(
            Object.entries(value).map(([key, value]) => {
              return [
                new sass.SassString(key, {
                  quotes: false
                }),
                new sass.SassString(value, {
                  quotes: false
                })
              ]
            })
          )
        )
        return [
          new sass.SassString(varName, {
            quotes: false
          }),
          v
        ]
      })
    )
  )
}

export const sassValueVarsMap = OrderedMap<sass.Value, sass.Value>(transformJsVToSassV(defaultVarsEntries))

// function addVarPrefix(args: sass.Value[]) {
//   const varName = args[0].assertString('varName')
//   return new sass.SassString(defaultVarPrefix + trimStart(varName.toString(), '-'), {
//     quotes: false
//   })
// }

function generateBtnInjectVars(type: string) {
  return {
    'primary-color': type,
    default: `border-${type} bg-${type} text-${type}-content outline-${type}`,
    active: `border-${type}-focus bg-${type}-focus`,
    'outline-active': `border-${type}-focus bg-${type}-focus text-${type}-content`
  }
}

export const sassOptions = {
  functions: {
    // 'addVarPrefix($varName)': addVarPrefix,
    // 'avp($varName)': (args: sass.Value[]) => {
    //   const varName = args[0].assertString('varName')
    //   return new sass.SassString('--' + trimStart(varName.toString(), '-'), {
    //     quotes: false
    //   })
    // },
    // "var($varName,$default:'')": (args: sass.Value[]) => {
    //   const str = addVarPrefix(args)
    //   const defaultValue = args[1].toString()

    //   const result = defaultValue ? `var(${str.toString()},${defaultValue})` : `var(${str.toString()})`
    //   return new sass.SassString(result, {
    //     quotes: false
    //   })
    // },
    'injectCssVars()': () => {
      return new sass.SassMap(sassValueVarsMap)
    },
    'injectBtnColors()': () => {
      const colorsMap = {
        '': {
          'primary-color': 'base-200',
          default: 'border-base-200 bg-base-200 text-base-content outline-base-200',
          active: 'border-base-300 bg-base-300',
          'outline-active': 'border-base-content bg-base-content text-base-100'
        },
        primary: generateBtnInjectVars('primary'),
        neutral: generateBtnInjectVars('neutral'),
        info: generateBtnInjectVars('info'),
        success: generateBtnInjectVars('success'),
        warning: generateBtnInjectVars('warning'),
        error: generateBtnInjectVars('error')
      }
      return transformJsVToSassMapMap(Object.entries(colorsMap))
    },
    'injectAlertColors()': () => {
      const colorsMap = {
        '': {
          default: 'text-base-content border-base-200'
        },
        info: {
          default: 'text-info-content border-info/20 bg-info'
        },
        success: {
          default: 'text-success-content border-success/20 bg-success'
        },
        warning: {
          default: 'text-warning-content border-warning/20 bg-warning'
        },
        error: {
          default: 'text-error-content border-error/20 bg-error'
        }
      }
      return transformJsVToSassMapMap(Object.entries(colorsMap))
    }
    // 'var($varName)': (args: Value[]) => {
    //   const str = addVarPrefix(args)
    //   return new sass.SassString(`var(${str.toString()})`, {
    //     quotes: false
    //   })
    // }
  }
}

export async function compileScss(filename: string) {
  const result = sass.compile(filename, sassOptions)
  const { css } = await postcss([
    creator({
      prefix: defaultVarPrefix.slice(2),
      ignoreProp: (decl) => {
        if (decl.prop.startsWith('--tw-')) {
          return true
        }
      },
      ignoreValueCustomProperty(customProperty) {
        if (customProperty.startsWith('--tw-')) {
          return true
        }
      }
    })
  ])
    // @ts-ignore
    .process(result.css, {
      from: undefined
    })
    .async()

  return css
}

interface IBuildScssOptions {
  filename: string
  stats?: Stats
  resolveConfig?: (config: Config) => void
  outSideLayerCss: 'base' | 'components' | 'utilities'
}

export async function buildScss(options: IBuildScssOptions) {
  const { filename, resolveConfig, stats = await fs.stat(filename) } = options
  if (stats && stats.isFile() && /\.scss$/.test(filename)) {
    const cssOutput = await compileScss(filename)

    const relPath = path.relative(scssDir, filename)
    const cssPath = getCssPath(relPath)
    const jsPath = getJsPath(relPath)
    const pluginPath = getPluginsPath(relPath)
    await ensureDir(path.dirname(cssPath))
    await ensureDir(path.dirname(jsPath))
    const thisPluginDir = path.dirname(pluginPath)
    await ensureDir(thisPluginDir)
    const config: Config = {
      content: [{ raw: '' }],
      theme: {
        extend: {}
      },
      corePlugins: {
        preflight: false
      }
    }

    resolveConfig?.(config)

    // const ctx = createContext({
    //   tailwindcssConfig: config,
    //   tailwindcssResolved: true,
    //   outSideLayerCss,
    //   sassOptions
    // })
    // await ctx.process(filename)
    // const code = ctx.generate()
    // scss -> plugin
    // await fs.writeFile(pluginPath, code, 'utf8')

    // scss -> css
    await fs.writeFile(cssPath, cssOutput, 'utf8')

    const tw = tailwindcss(config)
    const { css } = await postcss([tw])
      // @tailwind base;\n
      // @ts-ignore
      .process('@tailwind components;\n@tailwind utilities;\n' + cssOutput, {
        from: undefined
      })
      .async()

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
