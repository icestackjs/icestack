import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import md5 from 'md5'
// import type { Config } from 'tailwindcss'
import type { PluginsConfig } from 'tailwindcss/types/config'
import type { IProcessOptions, TailwindcssPluginOptions } from './types'
import { composePlugins } from 'compose-tailwindcss-plugins'
import { version } from './constants'
import { createContext } from './core'
import { getOptions } from './options'
import { ensureDir } from './utils'
// https://tailwindcss.com/docs/plugins
// https://github.com/tailwindlabs/tailwindcss/blob/master/src/lib/setupContextUtils.js#L723
function generateTempPlugin(entry: string, p: string, opts?: IProcessOptions) {
  const ctx = createContext(opts)
  ctx.processSync(entry)
  const code = ctx.generate()
  fs.writeFileSync(p, code, 'utf8')
  return code
}

function getDefaultCacheDir() {
  return path.resolve(process.cwd(), 'node_modules', '.css-to-tailwindcss-plugin')
}

function makePlugin(x: string, options: TailwindcssPluginOptions): PluginsConfig[number] {
  const p = require(x)
  if (p.__isOptionsFunction && typeof p === 'function') {
    return p(options)
  }
  return p
}

let cached = false
// https://github.com/tailwindlabs/tailwindcss/blob/master/src/lib/setupContextUtils.js#L784

// https://github.com/tailwindlabs/tailwindcss/blob/master/src/lib/setupContextUtils.js#L784
export default (opts: TailwindcssPluginOptions) => {
  const options = getOptions(opts)
  const cacheDir = options.cacheDir ?? getDefaultCacheDir()
  ensureDir(cacheDir)

  const indexFilePath = path.resolve(cacheDir, 'index.json')
  // css filename hash and content hash
  let hashMap: Record<string, string> = {}
  function loadCache() {
    if (fs.existsSync(indexFilePath)) {
      try {
        hashMap = JSON.parse(fs.readFileSync(indexFilePath, 'utf8'))
      }
      catch {
        console.log(`parse json: ${indexFilePath} failed!`)
      }
    }
  }

  function writeCacheIndexFile(data: Record<string, string>) {
    data.version = version
    fs.writeFileSync(indexFilePath, JSON.stringify(data), 'utf8')
  }
  if (cached === true) {
    loadCache()
    cached = true
  }

  const targetPlugins: PluginsConfig = []
  const isSameVersion = hashMap.version === version
  for (const entry of options.entries) {
    if (!fs.existsSync(entry)) {
      console.log(`entry: ${entry} is not existed`)
      continue
    }

    // as key
    const fileHash = md5(entry)
    const cssHash = md5(fs.readFileSync(entry))
    const p = `${path.resolve(cacheDir, fileHash)}.js`
    // plugin existed
    if (isSameVersion && fs.existsSync(p)) {
      // css entry content changed
      if (hashMap[fileHash] !== cssHash) {
        generateTempPlugin(entry, p, options)
        hashMap[fileHash] = cssHash
      }
    }
    else {
      // css entry content add
      generateTempPlugin(entry, p, options)
      hashMap[fileHash] = cssHash
    }
    targetPlugins.push(makePlugin(p, options))
  }

  writeCacheIndexFile(hashMap)
  // https://github.com/tailwindlabs/tailwindcss/blob/master/src/lib/setupContextUtils.js#L735C38-L735C38
  return composePlugins(targetPlugins)
}
