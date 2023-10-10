import fs from 'node:fs/promises'
import path from 'node:path'
// import { fileURLToPath } from 'node:url'
import type { Stats } from 'node:fs'
import * as sass from 'sass'
import { compileString } from '@icestack/css2js'
import { createContext } from 'css-to-tailwindcss-plugin'
import postcss from 'postcss'
import tailwindcss, { Config } from 'tailwindcss'
import chokidar from 'chokidar'
import { set } from 'lodash'
import klaw from 'klaw'
import { composePlugins } from 'compose-tailwindcss-plugins'
import dedent from 'dedent'
async function ensureDir(p: string) {
  try {
    await fs.access(p)
  } catch {
    await fs.mkdir(p, {
      recursive: true
    })
  }
}

const assetsDir = path.resolve(__dirname, '../assets')
const scssDir = path.resolve(assetsDir, 'scss')
const jsDir = path.resolve(assetsDir, 'js')
const cssDir = path.resolve(assetsDir, 'css')
const pluginsDir = path.resolve(assetsDir, 'plugins')

function getCssPath(relPath: string) {
  const cssPath = path.resolve(cssDir, relPath)
  return cssPath.replace(/scss$/, 'css')
}

function getJsPath(relPath: string) {
  const jsPath = path.resolve(jsDir, relPath)
  return jsPath.replace(/scss$/, 'js')
}

function getPluginsPath(relPath: string) {
  const jsPath = path.resolve(pluginsDir, relPath)
  return jsPath.replace(/scss$/, 'js')
}

const target = process.argv.slice(2)[0]

async function buildScss(p: string, stats?: Stats, resolveConfig?: (config: Config) => void) {
  if (stats === undefined) {
    stats = await fs.stat(p)
  }
  if (stats && stats.isFile() && /\.scss$/.test(p)) {
    const result = sass.compile(p)
    // console.log(result)
    const relPath = path.relative(scssDir, p)
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

    // console.log(thisPluginDir)
    const outSideLayerCss = path.basename(thisPluginDir)
    if (['base', 'components', 'utilities'].includes(outSideLayerCss)) {
      const ctx = createContext({
        tailwindcssConfig: config,
        tailwindcssResolved: true,
        outSideLayerCss: outSideLayerCss as 'base' | 'components' | 'utilities'
      })
      await ctx.process(p)
      const code = ctx.generate()
      // scss -> plugin
      await fs.writeFile(pluginPath, code, 'utf8')
    }

    // scss -> css
    await fs.writeFile(cssPath, result.css, 'utf8')

    const tw = tailwindcss(config)
    const { css } = await postcss([tw])
      // @tailwind base;\n
      // @ts-ignore
      .process('@tailwind components;\n@tailwind utilities;\n' + result.css, {
        from: undefined
      })

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

async function main() {
  await ensureDir(jsDir)
  await ensureDir(cssDir)
  await ensureDir(pluginsDir)
  switch (target) {
    case 'base': {
      for await (const file of klaw(path.resolve(scssDir, 'base'))) {
        await buildScss(file.path, file.stats)
      }

      break
    }
    case 'utilities': {
      const utilitiesPath = path.resolve(scssDir, 'utilities')
      const basenameArray = []
      for await (const file of klaw(utilitiesPath)) {
        if (file.stats.isFile() && /\.scss$/.test(file.path)) {
          basenameArray.push(path.basename(file.path, '.scss'))
        }
        await buildScss(file.path, file.stats)
      }
      const utilitiesJsOutputPath = path.resolve(jsDir, 'utilities')
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
      const utilitiesPlugins = path.resolve(pluginsDir, 'utilities')
      const filenames = await fs.readdir(utilitiesPlugins)
      const allInOnePlugin = composePlugins(
        filenames.map((x) => {
          return require(path.resolve(utilitiesPlugins, x))
        })
      )
      const basenameArray = []
      for await (const file of klaw(path.resolve(scssDir, 'components'))) {
        if (file.stats.isFile() && /\.scss$/.test(file.path)) {
          basenameArray.push(path.basename(file.path, '.scss'))
        }
        await buildScss(file.path, file.stats, (config) => {
          set(config, 'theme.extend.colors', colors)
          config.plugins = [allInOnePlugin]
        })
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
    default: {
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
  }
}

main()
