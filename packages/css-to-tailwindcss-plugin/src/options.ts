import path from 'node:path'
import { pathToFileURL } from 'node:url'
import defu from 'defu'
import type { IProcessOptions } from './types'

export function getDefaults(): Required<IProcessOptions> {
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
          }
        }
      ]
    },
    tailwindcssConfig: '',
    generatorOptions: {}
  }
}

export function getOptions(opts?: IProcessOptions): Required<IProcessOptions> {
  return defu(opts, getDefaults())
}
