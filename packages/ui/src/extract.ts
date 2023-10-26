import path from 'node:path'
import plugin from 'tailwindcss/plugin'
import { set } from 'lodash'
import klawSync from 'klaw-sync'
import { CssInJs } from 'postcss-js'
import { colors } from './colors'
import { extractScss } from '@/sass'
import { resolveJsDir, scssDir } from '@/dirs'
import { someExtends } from '@/constants'
import { CodegenOptions } from '@/types'
export type IOptions = {
  options: CodegenOptions
  outSideLayerCss: 'base' | 'utilities' | 'components'
}

export function walkScssSync(dir: string) {
  return klawSync(dir, {
    nodir: true,
    filter: (item) => {
      return /\.scss$/.test(item.path)
    },
    traverseAll: true
  })
}

export function getJsObj(opts: IOptions) {
  const { outSideLayerCss, options } = opts // defu<IOptions, Partial<IOptions>[]>(opts, {})
  const { outdir } = options
  // await ensureDir(pluginsDir)
  switch (outSideLayerCss) {
    case 'base': {
      return walkScssSync(path.resolve(scssDir, 'base')).map((file) => {
        return extractScss({
          outdir,
          filename: file.path,
          outSideLayerCss,
          options
        })
      })
    }
    case 'utilities': {
      const utilitiesPath = path.resolve(scssDir, 'utilities')
      const resultArray: { key: string; value: CssInJs }[] = []
      const fromDir = path.resolve(scssDir, 'utilities')

      for (const file of walkScssSync(path.resolve(utilitiesPath, 'global'))) {
        if (path.basename(file.path).startsWith('_')) {
          continue
        }
        resultArray.push({
          key: path.relative(fromDir, file.path).replace(/\.scss$/, ''),
          value: extractScss({
            outdir,
            filename: file.path,
            outSideLayerCss,
            resolveConfig(config) {
              set(config, 'theme.extend.colors', colors)
            },
            options
          })
        })
      }

      const utilitiesJs = path.resolve(resolveJsDir(outdir), 'utilities')

      for (const file of walkScssSync(utilitiesPath)) {
        if (path.basename(file.path).startsWith('_')) {
          continue
        }

        resultArray.push({
          key: path.relative(fromDir, file.path).replace(/\.scss$/, ''),
          value: extractScss({
            outdir,
            filename: file.path,
            outSideLayerCss,
            resolveConfig(config) {
              set(config, 'theme.extend.colors', colors)
              config.plugins = [
                plugin(
                  ({ addUtilities }) => {
                    const obj = require(path.resolve(utilitiesJs, 'index.js'))
                    // @ts-ignore
                    addUtilities(Object.values(obj))
                  },
                  {
                    theme: {
                      extend: {
                        ...someExtends
                      }
                    }
                  }
                )
              ]
            },
            options
          })
        })
      }

      return resultArray.reduce<Record<string, Record<string, CssInJs>>>((acc, cur) => {
        const [type, key] = cur.key.split('/')

        // style / unstyle / global
        if (acc[key]) {
          acc[key][type] = cur.value
        } else {
          acc[key] = {
            [type]: cur.value
          }
        }

        return acc
      }, {})
    }
    case 'components': {
      const utilitiesJs = path.resolve(resolveJsDir(outdir), 'utilities')

      const resultArray: { key: string; value: CssInJs }[] = []
      const fromDir = path.resolve(scssDir, 'components')
      for (const file of walkScssSync(fromDir)) {
        if (path.basename(file.path).startsWith('_')) {
          continue
        }
        resultArray.push({
          key: path.relative(fromDir, file.path).replace(/\.scss$/, ''),
          value: extractScss({
            outdir,
            filename: file.path,
            resolveConfig: (config) => {
              set(config, 'theme.extend.colors', colors)
              config.plugins = [
                plugin(
                  ({ addUtilities }) => {
                    const obj = require(path.resolve(utilitiesJs, 'index.js'))
                    // @ts-ignore
                    addUtilities(Object.values(obj))
                  },
                  {
                    theme: {
                      extend: {
                        ...someExtends
                      }
                    }
                  }
                )
              ]
            },
            outSideLayerCss,
            options
          })
        })
      }

      return resultArray.reduce<Record<string, Record<string, CssInJs>>>((acc, cur) => {
        const [type, key] = cur.key.split('/')
        // style / unstyle / global
        if (acc[key]) {
          acc[key][type] = cur.value
        } else {
          acc[key] = {
            [type]: cur.value
          }
        }
        return acc
      }, {})
    }
    default:
  }
}

export function extractAll(options: CodegenOptions) {
  const base = getJsObj({
    options,
    outSideLayerCss: 'base'
  })
  console.log('extract base finished!')
  const utilities = getJsObj({
    options,
    outSideLayerCss: 'utilities'
  })
  console.log('extract utilities finished!')
  const components = getJsObj({
    options,
    outSideLayerCss: 'components'
  })
  console.log('extract components finished!')
  return {
    base,
    utilities,
    components
  }
}
