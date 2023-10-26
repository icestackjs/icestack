import path from 'node:path'
import plugin from 'tailwindcss/plugin'
import { set } from 'lodash'
import { CssInJs } from 'postcss-js'
import merge from 'merge'
import objHash from 'object-hash'
import { getColors } from './colors'
import { walkScssSync } from './utils'
import { extractScss } from '@/sass'
import { resolveJsDir, scssDir } from '@/dirs'
import { someExtends } from '@/constants'
import { CodegenOptions } from '@/types'
import { getFileCache } from '@/cache'

export type IOptions = {
  options: CodegenOptions
  outSideLayerCss: 'base' | 'utilities' | 'components'
}

function groupedComs(
  resultArray: {
    key: string
    value: CssInJs
  }[]
) {
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

export function getJsObj(opts: IOptions) {
  const { outSideLayerCss, options } = opts // defu<IOptions, Partial<IOptions>[]>(opts, {})
  const { outdir, base } = options
  // await ensureDir(pluginsDir)
  switch (outSideLayerCss) {
    case 'base': {
      const cache = getFileCache('base/index')
      const objhash = objHash(base)
      if (cache.getKey('objhash') === objhash) {
        return cache.getKey('value')
      } else {
        const basePath = path.resolve(scssDir, 'base')
        const resultArray: { key: string; value: CssInJs }[] = []
        for (const file of walkScssSync(basePath)) {
          resultArray.push({
            key: path.relative(basePath, file.path).replace(/\.scss$/, ''),
            value: extractScss({
              outdir,
              filename: file.path,
              outSideLayerCss,
              options
            })
          })
        }
        const value = merge.recursive(true, ...resultArray.map((x) => x.value))
        cache.setKey('value', value)
        cache.setKey('objhash', objhash)
        cache.save()
        return value
      }
    }
    case 'utilities': {
      const utilitiesPath = path.resolve(scssDir, 'utilities')
      const resultArray: { key: string; value: CssInJs }[] = []

      for (const file of walkScssSync(path.resolve(utilitiesPath, 'global'))) {
        resultArray.push({
          key: path.relative(utilitiesPath, file.path).replace(/\.scss$/, ''),
          value: extractScss({
            outdir,
            filename: file.path,
            outSideLayerCss,
            resolveConfig(config) {
              set(config, 'theme.extend.colors', getColors(options))
            },
            options
          })
        })
      }

      const utilitiesJs = path.resolve(resolveJsDir(outdir), 'utilities')

      for (const file of walkScssSync(utilitiesPath)) {
        resultArray.push({
          key: path.relative(utilitiesPath, file.path).replace(/\.scss$/, ''),
          value: extractScss({
            outdir,
            filename: file.path,
            outSideLayerCss,
            resolveConfig(config) {
              set(config, 'theme.extend.colors', getColors(options))
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

      return groupedComs(resultArray)
    }
    case 'components': {
      const utilitiesJs = path.resolve(resolveJsDir(outdir), 'utilities')

      const resultArray: { key: string; value: CssInJs }[] = []
      const fromDir = path.resolve(scssDir, 'components')
      for (const file of walkScssSync(fromDir)) {
        resultArray.push({
          key: path.relative(fromDir, file.path).replace(/\.scss$/, ''),
          value: extractScss({
            outdir,
            filename: file.path,
            resolveConfig: (config) => {
              set(config, 'theme.extend.colors', getColors(options))
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

      return groupedComs(resultArray)
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
