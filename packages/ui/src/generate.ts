import fs from 'node:fs/promises'
import path from 'node:path'
import plugin from 'tailwindcss/plugin'
import { set } from 'lodash'
import klaw from 'klaw'
import defu from 'defu'
import { generateIndexCode } from './js/generate'
import { buildScss } from '@/sass'
import { resolveJsDir, scssDir } from '@/dirs'
import { defaultVarPrefix, someExtends } from '@/constants'
export interface IOptions {
  dir?: string
  outSideLayerCss: 'base' | 'utilities' | 'components'
}

export async function generate(options: IOptions) {
  const { outSideLayerCss, dir } = defu<IOptions, Partial<IOptions>[]>(options, {})
  // await ensureDir(pluginsDir)
  switch (outSideLayerCss) {
    case 'base': {
      for await (const file of klaw(path.resolve(scssDir, 'base'))) {
        await buildScss({
          dir,
          filename: file.path,
          stats: file.stats,
          outSideLayerCss
        })
      }

      break
    }
    case 'utilities': {
      const { colors } = await import('../src/colors')
      const utilitiesPath = path.resolve(scssDir, 'utilities')
      const basenameArray = []
      const fromDir = path.resolve(scssDir, 'utilities')
      const utilitiesJsOutputPath = path.resolve(resolveJsDir(dir), 'utilities')
      for await (const file of klaw(path.resolve(utilitiesPath, 'global'))) {
        if (file.stats.isFile() && /\.scss$/.test(file.path)) {
          if (path.basename(file.path).startsWith('_')) {
            continue
          }
          basenameArray.push(path.relative(fromDir, file.path).replace(/\.scss$/, ''))
          await buildScss({
            dir,
            filename: file.path,
            stats: file.stats,
            outSideLayerCss,
            resolveConfig(config) {
              set(config, 'theme.extend.colors', colors)
            }
          })
        }
      }
      await fs.writeFile(
        path.resolve(utilitiesJsOutputPath, 'index.js'),
        generateIndexCode(basenameArray),
        'utf8'
        // dedent`module.exports = {\n${basenameArray.map((x) => {
        //   return `"${x}":require("./${x}.js")`
        // })}\n}`
      )
      basenameArray.length = 0
      const utilitiesJs = path.resolve(resolveJsDir(dir), 'utilities')

      for await (const file of klaw(utilitiesPath)) {
        if (file.stats.isFile() && /\.scss$/.test(file.path)) {
          if (path.basename(file.path).startsWith('_')) {
            continue
          }

          basenameArray.push(path.relative(fromDir, file.path).replace(/\.scss$/, ''))
          await buildScss({
            dir,
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
            }
          })
        }
      }

      await fs.writeFile(
        path.resolve(utilitiesJsOutputPath, 'index.js'),
        generateIndexCode(basenameArray),
        'utf8'
        // dedent`module.exports = {\n${basenameArray.map((x) => {
        //   return `"${x}":require("./${x}.js")`
        // })}\n}`
      )

      break
    }
    case 'components': {
      const { colors } = await import('../src/colors')
      const utilitiesJs = path.resolve(resolveJsDir(dir), 'utilities')

      const basenameArray = []
      const fromDir = path.resolve(scssDir, 'components')
      for await (const file of klaw(fromDir)) {
        if (file.stats.isFile() && /\.scss$/.test(file.path)) {
          if (path.basename(file.path).startsWith('_')) {
            continue
          }
          basenameArray.push(path.relative(fromDir, file.path).replace(/\.scss$/, ''))
          await buildScss({
            dir,
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
            outSideLayerCss
          })
        }
      }
      const componentsJsOutputPath = path.resolve(resolveJsDir(dir), 'components')
      await fs.writeFile(path.resolve(componentsJsOutputPath, 'index.js'), generateIndexCode(basenameArray), 'utf8')
      break
    }
    default:
  }
}

export async function buildAll(dir?: string) {
  await generate({
    dir,
    outSideLayerCss: 'base'
  })
  await generate({
    dir,
    outSideLayerCss: 'utilities'
  })
  await generate({
    dir,
    outSideLayerCss: 'components'
  })
}
