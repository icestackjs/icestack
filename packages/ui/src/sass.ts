import fs from 'node:fs/promises'
import type { Stats } from 'node:fs'
import path from 'node:path'
import * as sass from 'sass'
import postcss from 'postcss'
import { trimStart } from 'lodash'
import { compileString } from '@icestack/css2js'
import tailwindcss, { Config } from 'tailwindcss'
import { OrderedMap } from 'immutable'
import { TinyColor } from '@ctrl/tinycolor'
import { defaultVarPrefix } from './constants'
import { postcssCustomPropertyPrefixer } from './postcssCustomPropertyPrefixer'
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

export const sassValueVarsMap = OrderedMap<sass.Value, sass.Value>(transformJsVToSassV(defaultVarsEntries))

function addVarPrefix(args: sass.Value[]) {
  const varName = args[0].assertString('varName')
  return new sass.SassString(defaultVarPrefix + trimStart(varName.toString(), '-'), {
    quotes: false
  })
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
    "var($varName,$default:'')": (args: sass.Value[]) => {
      const str = addVarPrefix(args)
      const defaultValue = args[1].toString()

      const result = defaultValue ? `var(${str.toString()},${defaultValue})` : `var(${str.toString()})`
      return new sass.SassString(result, {
        quotes: false
      })
    },
    'injectCssVars()': () => {
      return new sass.SassMap(sassValueVarsMap)
    },
    'injectBtnColors()': () => {
      const colorsMap = {
        '': 'base-200 base-content base-300',
        primary: 'primary primary-content primary-focus',
        neutral: 'neutral neutral-content neutral-focus',
        info: 'info info-content info-focus',
        success: 'success success-content success-focus',
        warning: 'warning warning-content warning-focus',
        error: 'error error-content error-focus'
      }
      return new sass.SassMap(OrderedMap<sass.Value, sass.Value>(transformJsVToSassMapList(Object.entries(colorsMap))))
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
    postcssCustomPropertyPrefixer({
      prefix: defaultVarPrefix.slice(2),
      ignore: (prop) => {
        if (prop.startsWith('--tw-')) {
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
