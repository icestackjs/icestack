import path from 'node:path'
import fs from 'node:fs'
import plugin from 'tailwindcss/plugin'
import md5 from 'md5'
import { createContext } from './core'
import { TailwindcssPluginOptions } from './types'
import { ensureDir } from './utils'
// https://tailwindcss.com/docs/plugins

function generateTempPlugin(entry: string, p: string) {
  const ctx = createContext()
  ctx.processSync(entry)
  const code = ctx.generate()
  fs.writeFileSync(p, code, 'utf8')
}
// https://github.com/tailwindlabs/tailwindcss/blob/master/src/lib/setupContextUtils.js#L784
export default plugin.withOptions(
  (options: TailwindcssPluginOptions) => {
    const cacheDir = path.resolve(process.cwd(), 'node_modules', '.css-to-tailwindcss-plugin')
    ensureDir(cacheDir)

    const indexFilePath = path.resolve(cacheDir, 'index.json')
    let hashMap: Record<string, string> = {}
    function loadCache() {
      if (fs.existsSync(indexFilePath)) {
        try {
          hashMap = JSON.parse(fs.readFileSync(indexFilePath, 'utf8'))
        } catch {
          console.log(`parse json: ${indexFilePath} failed!`)
        }
      }
    }

    function writeCacheIndexFile(data: Record<string, string>) {
      fs.writeFileSync(indexFilePath, JSON.stringify(data), 'utf8')
    }

    loadCache()
    return function (api) {
      const targetPlugins: string[] = []
      for (const entry of options.entries) {
        const fileHash = md5(entry)
        const p = path.resolve(cacheDir, fileHash) + '.js'
        const contentHash = md5(fs.readFileSync(p))
        if (fs.existsSync(p)) {
          if (hashMap[fileHash] !== contentHash) {
            generateTempPlugin(entry, p)
            hashMap[fileHash] = contentHash
          }
        } else {
          generateTempPlugin(entry, p)
          hashMap[fileHash] = contentHash
        }
        targetPlugins.push(p)
      }
      process.nextTick(() => {
        writeCacheIndexFile(hashMap)
      })
      for (const tmpPlugin of targetPlugins) {
        const fn = require(tmpPlugin)
        if (typeof fn === 'function') {
          fn(api)
        }
      }
    }
  },
  () => {
    return {}
  }
)
