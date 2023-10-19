import fs from 'node:fs/promises'
import type { Stats } from 'node:fs'
import path from 'node:path'
import * as sass from 'sass'
import postcss from 'postcss'
import { compileString } from '@icestack/css2js'
import tailwindcss, { Config } from 'tailwindcss'
import creator from 'postcss-custom-property-prefixer'
import { functions } from './functions'
import { defaultVarPrefix } from '@/constants'
import { ensureDir } from '@/utils'
import { getCssPath, getJsPath, scssDir, getCssResolvedpath } from '@/dirs'

export const sassOptions: sass.Options<'sync'> = {
  functions
}

export async function compileScss(filename: string) {
  const result = sass.compile(filename, sassOptions)
  const { css } = await postcss([
    creator({
      prefix: defaultVarPrefix.slice(2),
      ignoreProp: (decl) => {
        return decl.prop.startsWith('--tw-')
      },
      ignoreValueCustomProperty(customProperty) {
        return customProperty.startsWith('--tw-')
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

export async function resolveTailwindcss(options: { css: string; config: Config }) {
  const { config, css: cssOutput } = options
  const tw = tailwindcss(config)
  const { css } = await postcss([tw])
    // @tailwind base;\n
    // @ts-ignore
    .process('@tailwind components;\n@tailwind utilities;\n' + cssOutput, {
      from: undefined
    })
    .async()
  return css
}

interface IBuildScssOptions {
  dir?: string
  filename: string
  stats?: Stats
  resolveConfig?: (config: Config) => void
  outSideLayerCss: 'base' | 'components' | 'utilities'
}

export async function buildScss(options: IBuildScssOptions) {
  const { filename, resolveConfig, stats = await fs.stat(filename), dir } = options
  if (stats && stats.isFile() && /\.scss$/.test(filename)) {
    const cssOutput = await compileScss(filename)

    const relPath = path.relative(scssDir, filename)
    const cssPath = getCssPath(relPath, dir)
    const jsPath = getJsPath(relPath, dir)
    const cssResolvedPath = getCssResolvedpath(relPath, dir)
    // const pluginPath = getPluginsPath(relPath)
    await ensureDir(path.dirname(cssPath))
    await ensureDir(path.dirname(jsPath))
    await ensureDir(path.dirname(cssResolvedPath))
    // const thisPluginDir = path.dirname(pluginPath)
    // await ensureDir(thisPluginDir)
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

    // scss -> css
    await fs.writeFile(cssPath, cssOutput, 'utf8')
    const css = await resolveTailwindcss({
      css: cssOutput,
      config
    })

    await fs.writeFile(cssResolvedPath, css, 'utf8')
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
