import fs from 'node:fs/promises'
import path from 'node:path'

import plugin from 'tailwindcss/plugin'

import { set } from 'lodash'
import klaw from 'klaw'

import dedent from 'dedent'
import { buildScss } from '../src/sass'
import { cssDir, jsDir, scssDir } from '../src/dirs'
import { ensureDir } from '../src/utils'

// import { fileURLToPath } from 'node:url'
// import { createContext } from 'css-to-tailwindcss-plugin'
// import { composePlugins } from 'compose-tailwindcss-plugins'
// import chokidar from 'chokidar'

const outSideLayerCss = process.argv.slice(2)[0]

async function main() {
  await ensureDir(jsDir)
  await ensureDir(cssDir)
  // await ensureDir(pluginsDir)
  switch (outSideLayerCss) {
    case 'base': {
      for await (const file of klaw(path.resolve(scssDir, 'base'))) {
        await buildScss({
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
      const utilitiesJsOutputPath = path.resolve(jsDir, 'utilities')
      for await (const file of klaw(path.resolve(utilitiesPath, 'global'))) {
        if (file.stats.isFile() && /\.scss$/.test(file.path)) {
          if (path.basename(file.path).startsWith('_')) {
            continue
          }
          basenameArray.push(path.relative(fromDir, file.path).replace(/\.scss$/, ''))
          await buildScss({
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
        dedent`module.exports = {\n${basenameArray.map((x) => {
          return `"${x}":require("./${x}.js")`
        })}\n}`
      )
      basenameArray.length = 0
      const utilitiesJs = path.resolve(jsDir, 'utilities')

      for await (const file of klaw(utilitiesPath)) {
        if (file.stats.isFile() && /\.scss$/.test(file.path)) {
          if (path.basename(file.path).startsWith('_')) {
            continue
          }

          basenameArray.push(path.relative(fromDir, file.path).replace(/\.scss$/, ''))
          await buildScss({
            filename: file.path,
            stats: file.stats,
            outSideLayerCss,
            resolveConfig(config) {
              set(config, 'theme.extend.colors', colors)
              config.plugins = [
                plugin(({ addUtilities }) => {
                  const obj = require(path.resolve(utilitiesJs, 'index.js'))
                  // @ts-ignore
                  addUtilities(Object.values(obj))
                })
              ]
            }
          })
        }
      }

      await fs.writeFile(
        path.resolve(utilitiesJsOutputPath, 'index.js'),
        dedent`module.exports = {\n${basenameArray.map((x) => {
          return `"${x}":require("./${x}.js")`
        })}\n}`
      )

      break
    }
    case 'components': {
      const { colors } = await import('../src/colors')
      const utilitiesJs = path.resolve(jsDir, 'utilities')

      const basenameArray = []
      const fromDir = path.resolve(scssDir, 'components')
      for await (const file of klaw(fromDir)) {
        if (file.stats.isFile() && /\.scss$/.test(file.path)) {
          if (path.basename(file.path).startsWith('_')) {
            continue
          }
          basenameArray.push(path.relative(fromDir, file.path).replace(/\.scss$/, ''))
          await buildScss({
            filename: file.path,
            stats: file.stats,
            resolveConfig: (config) => {
              set(config, 'theme.extend.colors', colors)
              config.plugins = [
                plugin(({ addUtilities }) => {
                  const obj = require(path.resolve(utilitiesJs, 'index.js'))
                  // @ts-ignore
                  addUtilities(Object.values(obj))
                })
              ]
            },
            outSideLayerCss
          })
        }
      }
      const componentsJsOutputPath = path.resolve(jsDir, 'components')
      await fs.writeFile(
        path.resolve(componentsJsOutputPath, 'index.js'),
        dedent`module.exports = {\n${basenameArray.map((x) => {
          return `"${x}":require("./${x}.js")`
        })}\n}`
      )
      break
    }
    default:
    // chokidar
    //   .watch(scssDir, {
    //     alwaysStat: true
    //   })
    //   .on('add', async (p, stats) => {
    //     console.log(`building: ${p}`)
    //     await buildScss(p, stats)
    //   })
    //   .on('change', async (p, stats) => {
    //     console.log(`building: ${p}`)
    //     await buildScss(p, stats)
    //   })
    //   .on('unlink', async (p: string) => {
    //     const relPath = path.relative(scssDir, p)
    //     const cssPath = getCssPath(relPath)
    //     const jsPath = getJsPath(relPath)
    //     await fs.unlink(cssPath)
    //     await fs.unlink(jsPath)
    //   })
  }
}

main()
