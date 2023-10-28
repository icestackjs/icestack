import fs from 'node:fs'
import path from 'node:path'
import plugin from 'tailwindcss/plugin'
import { set } from 'lodash'
import { generateIndexCode } from './js/generate'
import { getColors } from './colors'
import { walkScssSync } from './utils'
import { buildScss } from '@/sass'
import { resolveJsDir, scssDir } from '@/dirs'
import { someExtends } from '@/constants'
import { CodegenOptions } from '@/types'

export type IOptions = {
  options: CodegenOptions
  outSideLayerCss: 'base' | 'utilities' | 'components'
}

export function generate(opts: IOptions) {
  const { outSideLayerCss, options } = opts // defu<IOptions, Partial<IOptions>[]>(opts, {})
  const { outdir } = options
  const colors = getColors(options)
  // await ensureDir(pluginsDir)
  switch (outSideLayerCss) {
    case 'base': {
      for (const file of walkScssSync(path.resolve(scssDir, 'base'))) {
        buildScss({
          outdir,
          filename: file.path,
          outSideLayerCss,
          options
        })
      }

      break
    }
    case 'utilities': {
      const utilitiesPath = path.resolve(scssDir, 'utilities')
      const basenameArray = []
      const fromDir = path.resolve(scssDir, 'utilities')
      const utilitiesJsOutputPath = path.resolve(resolveJsDir(outdir), 'utilities')
      for (const file of walkScssSync(path.resolve(utilitiesPath, 'global'))) {
        basenameArray.push(path.relative(fromDir, file.path).replace(/\.scss$/, ''))
        buildScss({
          outdir,
          filename: file.path,
          outSideLayerCss,
          resolveConfig(config) {
            set(config, 'theme.extend.colors', colors)
          },
          options
        })
      }
      fs.writeFileSync(path.resolve(utilitiesJsOutputPath, 'index.js'), generateIndexCode(basenameArray), 'utf8')
      basenameArray.length = 0
      const utilitiesJs = path.resolve(resolveJsDir(outdir), 'utilities')

      for (const file of walkScssSync(utilitiesPath)) {
        basenameArray.push(path.relative(fromDir, file.path).replace(/\.scss$/, ''))
        buildScss({
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
      }

      fs.writeFileSync(path.resolve(utilitiesJsOutputPath, 'index.js'), generateIndexCode(basenameArray), 'utf8')

      break
    }
    case 'components': {
      const utilitiesJs = path.resolve(resolveJsDir(outdir), 'utilities')

      const basenameArray = []
      const fromDir = path.resolve(scssDir, 'components')
      for (const file of walkScssSync(fromDir)) {
        basenameArray.push(path.relative(fromDir, file.path).replace(/\.scss$/, ''))
        buildScss({
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
      }
      const componentsJsOutputPath = path.resolve(resolveJsDir(outdir), 'components')
      fs.writeFileSync(path.resolve(componentsJsOutputPath, 'index.js'), generateIndexCode(basenameArray), 'utf8')
      break
    }
    default:
  }
}

export function buildAll(options: CodegenOptions) {
  let start = performance.now()

  generate({
    options,
    outSideLayerCss: 'base'
  })
  let end = performance.now()
  console.log('build base finished!' + `${end - start}ms`)
  start = performance.now()
  generate({
    options,
    outSideLayerCss: 'utilities'
  })
  end = performance.now()
  console.log('build utilities finished!' + `${end - start}ms`)
  start = performance.now()
  generate({
    options,
    outSideLayerCss: 'components'
  })
  end = performance.now()
  console.log('build components finished!' + `${end - start}ms`)
}
