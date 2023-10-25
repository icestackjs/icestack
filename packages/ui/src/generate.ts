import fs from 'node:fs/promises'
import path from 'node:path'
import plugin from 'tailwindcss/plugin'
import { set } from 'lodash'
import klaw from 'klaw'
import defu from 'defu'
import { generateIndexCode } from './js/generate'
import { buildScss } from '@/sass'
import { resolveJsDir, scssDir } from '@/dirs'
import { someExtends } from '@/constants'
import { CodegenOptions } from '@/types'
export type IOptions = {
  options: CodegenOptions
  outSideLayerCss: 'base' | 'utilities' | 'components'
}

export async function generate(opts: IOptions) {
  const { outSideLayerCss, options } = opts // defu<IOptions, Partial<IOptions>[]>(opts, {})
  const { outdir } = options
  // await ensureDir(pluginsDir)
  switch (outSideLayerCss) {
    case 'base': {
      for await (const file of klaw(path.resolve(scssDir, 'base'))) {
        await buildScss({
          outdir,
          filename: file.path,
          stats: file.stats,
          outSideLayerCss,
          options
        })
      }

      break
    }
    case 'utilities': {
      const { colors } = await import('../src/colors')
      const utilitiesPath = path.resolve(scssDir, 'utilities')
      const basenameArray = []
      const fromDir = path.resolve(scssDir, 'utilities')
      const utilitiesJsOutputPath = path.resolve(resolveJsDir(outdir), 'utilities')
      for await (const file of klaw(path.resolve(utilitiesPath, 'global'))) {
        if (file.stats.isFile() && /\.scss$/.test(file.path)) {
          if (path.basename(file.path).startsWith('_')) {
            continue
          }
          basenameArray.push(path.relative(fromDir, file.path).replace(/\.scss$/, ''))
          await buildScss({
            outdir,
            filename: file.path,
            stats: file.stats,
            outSideLayerCss,
            resolveConfig(config) {
              set(config, 'theme.extend.colors', colors)
            },
            options
          })
        }
      }
      await fs.writeFile(path.resolve(utilitiesJsOutputPath, 'index.js'), generateIndexCode(basenameArray), 'utf8')
      basenameArray.length = 0
      const utilitiesJs = path.resolve(resolveJsDir(outdir), 'utilities')

      for await (const file of klaw(utilitiesPath)) {
        if (file.stats.isFile() && /\.scss$/.test(file.path)) {
          if (path.basename(file.path).startsWith('_')) {
            continue
          }

          basenameArray.push(path.relative(fromDir, file.path).replace(/\.scss$/, ''))
          await buildScss({
            outdir,
            filename: file.path,
            stats: file.stats,
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
      }

      await fs.writeFile(path.resolve(utilitiesJsOutputPath, 'index.js'), generateIndexCode(basenameArray), 'utf8')

      break
    }
    case 'components': {
      const { colors } = await import('../src/colors')
      const utilitiesJs = path.resolve(resolveJsDir(outdir), 'utilities')

      const basenameArray = []
      const fromDir = path.resolve(scssDir, 'components')
      for await (const file of klaw(fromDir)) {
        if (file.stats.isFile() && /\.scss$/.test(file.path)) {
          if (path.basename(file.path).startsWith('_')) {
            continue
          }
          basenameArray.push(path.relative(fromDir, file.path).replace(/\.scss$/, ''))
          await buildScss({
            outdir,
            filename: file.path,
            stats: file.stats,
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
      }
      const componentsJsOutputPath = path.resolve(resolveJsDir(outdir), 'components')
      await fs.writeFile(path.resolve(componentsJsOutputPath, 'index.js'), generateIndexCode(basenameArray), 'utf8')
      break
    }
    default:
  }
}

export async function buildAll(options: CodegenOptions) {
  await generate({
    options,
    outSideLayerCss: 'base'
  })
  console.log('build base finished!')
  await generate({
    options,
    outSideLayerCss: 'utilities'
  })
  console.log('build utilities finished!')
  await generate({
    options,
    outSideLayerCss: 'components'
  })
  console.log('build components finished!')
}
