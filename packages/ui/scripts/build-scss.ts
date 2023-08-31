import fs from 'node:fs/promises'
import path from 'node:path'
// import { fileURLToPath } from 'node:url'
import type { Stats } from 'node:fs'
import * as sass from 'sass'
import postcss from 'postcss'
import postcssJs from 'postcss-js'
// import klaw from 'klaw'
import tailwindcss, { Config } from 'tailwindcss'
import chokidar from 'chokidar'
import { colors } from '../src/colors'
// const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function ensureDir(p: string) {
  try {
    await fs.access(p)
  } catch {
    await fs.mkdir(p, {
      recursive: true
    })
  }
}

async function main() {
  const assetsDir = path.resolve(__dirname, '../assets')
  const scssDir = path.resolve(assetsDir, 'scss')
  const jsDir = path.resolve(assetsDir, 'js')
  const cssDir = path.resolve(assetsDir, 'css')
  await ensureDir(jsDir)
  await ensureDir(cssDir)
  // const { colors } = await import('./colors')
  function getCssPath(relPath: string) {
    const cssPath = path.resolve(cssDir, relPath)
    return cssPath.replace(/scss$/, 'css')
  }

  function getJsPath(relPath: string) {
    const jsPath = path.resolve(jsDir, relPath)
    return jsPath.replace(/scss$/, 'js')
  }

  async function buildScss(p: string, stats?: Stats) {
    if (stats && stats.isFile() && /\.scss$/.test(p)) {
      const result = sass.compile(p)
      // console.log(result)
      const relPath = path.relative(scssDir, p)
      const cssPath = getCssPath(relPath)
      const jsPath = getJsPath(relPath)
      await ensureDir(path.dirname(cssPath))
      await ensureDir(path.dirname(jsPath))
      await fs.writeFile(cssPath, result.css, 'utf8')
      const config: Config = {
        content: [{ raw: '' }],
        theme: {
          extend: {
            colors: {
              ...colors
            }
          }
        },
        corePlugins: {
          preflight: false
        }
      }
      const tw = tailwindcss(config)
      const { root } = await postcss([tw])
        // @tailwind base;\n
        // @ts-ignore
        .process('@tailwind components;\n@tailwind utilities;\n' + result.css, {
          from: undefined
        })

      const data = 'module.exports = ' + JSON.stringify(postcssJs.objectify(root as postcss.Root), null, 2)
      await fs.writeFile(jsPath, data, 'utf8')
    }
  }

  // async function klawAndBuildScss() {
  //   for await (const file of klaw(scssDir)) {
  //     if (file.stats.isFile() && /\.scss$/.test(file.path)) {
  //       await buildScss(file.path, file.stats)
  //     }
  //   }
  // }

  chokidar
    .watch(scssDir, {
      alwaysStat: true
    })
    .on('add', async (p, stats) => {
      console.log(`building: ${p}`)
      await buildScss(p, stats)
    })
    .on('change', async (p, stats) => {
      console.log(`building: ${p}`)
      await buildScss(p, stats)
    })
    .on('unlink', async (p: string) => {
      const relPath = path.relative(scssDir, p)
      const cssPath = getCssPath(relPath)
      const jsPath = getJsPath(relPath)
      await fs.unlink(cssPath)
      await fs.unlink(jsPath)
    })
}

main()
