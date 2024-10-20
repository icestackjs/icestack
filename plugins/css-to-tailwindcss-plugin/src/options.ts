import type { IProcessOptions, TailwindcssPluginOptions } from './types'
import path from 'node:path'
import process from 'node:process'
import { pathToFileURL } from 'node:url'
import defu from 'defu'

function getDefaultCacheDir() {
  return path.resolve(process.cwd(), 'node_modules', '.css-to-tailwindcss-plugin')
}

export function getDefaults(): IProcessOptions & { cacheDir?: string } {
  const pkgPath = require.resolve('tailwindcss/package.json')
  const nodeModulesPath = path.dirname(path.dirname(pkgPath))
  return {
    atImportOptions: {},
    sassOptions: {
      importers: [
        {
          // https://github.com/webpack-contrib/sass-loader/blob/master/src/index.js#L55
          findFileUrl(url) {
            const twUrl = pathToFileURL(path.resolve(nodeModulesPath, url))
            return new URL(twUrl)
          },
        },
      ],
    },
    tailwindcssResolved: false,
    withOptions: true,
    withOptionsWalkCSSRuleObject(obj) {
      return obj
    },
    cacheDir: getDefaultCacheDir(),
  }
}

export function getOptions(opts?: IProcessOptions) {
  return defu(opts, getDefaults()) as Required<TailwindcssPluginOptions>
}
