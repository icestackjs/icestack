import fs from 'node:fs'
import path from 'node:path'
import plugin from 'tailwindcss/plugin'
import { set } from 'lodash'
import { generateComponentsIndexCode, generateIndexCode } from './js/generate'
import { getColors } from './colors'
import { walkScssSync } from './utils'
import { buildComponents, buildScss } from './sass'
import { resolveJsDir, scssDir } from '@/dirs'
import { someExtends } from '@/constants'
import { CodegenOptions } from '@/types'
import allComponents from '@/allComponents'
import { logger } from '@/log'

export type IOptions = {
  options: CodegenOptions
  outSideLayerCss: 'base' | 'utilities' | 'components'
}

export function generate(opts: IOptions) {
  const { outSideLayerCss, options } = opts // defu<IOptions, Partial<IOptions>[]>(opts, {})
  const { outdir, dryRun } = options
  const colors = getColors(options)
  // await ensureDir(pluginsDir)
  switch (outSideLayerCss) {
    case 'base': {
      const res = []
      for (const file of walkScssSync(path.resolve(scssDir, 'base'))) {
        res.push(
          buildScss({
            outdir,
            filename: file.path,
            outSideLayerCss,
            options
          })
        )
      }
      return res
    }
    case 'utilities': {
      const utilitiesPath = path.resolve(scssDir, 'utilities')
      const basenameArray = []
      const fromDir = path.resolve(scssDir, 'utilities')
      const utilitiesJsOutputPath = path.resolve(resolveJsDir(outdir), 'utilities')
      const res = []
      for (const file of walkScssSync(path.resolve(utilitiesPath, 'global'))) {
        basenameArray.push(path.relative(fromDir, file.path).replace(/\.scss$/, ''))
        res.push(
          buildScss({
            outdir,
            filename: file.path,
            outSideLayerCss,
            resolveConfig(config) {
              set(config, 'theme.extend.colors', colors)
            },
            options
          })
        )
      }
      !dryRun && fs.writeFileSync(path.resolve(utilitiesJsOutputPath, 'index.js'), generateIndexCode(basenameArray), 'utf8')

      return res
    }
    case 'components': {
      const res = buildComponents({
        outdir,
        filename: '',
        outSideLayerCss: 'components',
        resolveConfig: (config) => {
          set(config, 'theme.extend.colors', colors)
          config.plugins = [
            plugin(() => {}, {
              theme: {
                extend: {
                  ...someExtends
                }
              }
            })
          ]
        },
        options
      })

      if (!dryRun) {
        const componentsJsOutputPath = path.resolve(resolveJsDir(outdir), 'components')
        const code = generateComponentsIndexCode(allComponents)
        fs.writeFileSync(path.resolve(componentsJsOutputPath, 'index.js'), code, 'utf8')
      }

      return res
    }
    default:
  }
}

export function buildAll(options: CodegenOptions) {
  let start = performance.now()

  const base = generate({
    options,
    outSideLayerCss: 'base'
  })
  let end = performance.now()
  logger.success('build base finished! ' + `${end - start}ms`)
  start = performance.now()
  const utilities = generate({
    options,
    outSideLayerCss: 'utilities'
  })
  end = performance.now()
  logger.success('build utilities finished! ' + `${end - start}ms`)
  start = performance.now()
  const components = generate({
    options,
    outSideLayerCss: 'components'
  })
  end = performance.now()
  logger.success('build components finished! ' + `${end - start}ms`)

  return {
    base,
    components,
    utilities
  }
}
