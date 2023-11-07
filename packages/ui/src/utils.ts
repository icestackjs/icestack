import fs from 'node:fs/promises'
import fss from 'node:fs'
import path from 'node:path'
import postcss from 'postcss'
import tailwindcss from 'tailwindcss'
import type { Config } from 'tailwindcss'
import defu from 'defu'
import { set, get } from 'lodash'
import klawSync from 'klaw-sync'
import selectorParser from 'postcss-selector-parser'

const defaultSelectorParser = selectorParser()

export function compressCssSelector(selectors: string) {
  return defaultSelectorParser.processSync(selectors, { lossless: false })
}

export function groupBy<T>(arr: T[], cb: (arg: T) => string): Record<string, T[]> {
  if (!Array.isArray(arr)) {
    throw new TypeError('expected an array for first argument')
  }

  if (typeof cb !== 'function') {
    throw new TypeError('expected a function for second argument')
  }

  const result: Record<string, T[]> = {}
  for (const item of arr) {
    const bucketCategory = cb(item)
    const bucket = result[bucketCategory]

    if (Array.isArray(bucket)) {
      result[bucketCategory].push(item)
    } else {
      result[bucketCategory] = [item]
    }
  }

  return result
}

export async function getCss(config?: Partial<Config> & { css?: string }) {
  const res = await postcss([
    tailwindcss(
      defu<Config, Config[]>(config, {
        content: [{ raw: '' }],
        corePlugins: {
          preflight: false
        }
      })
    )
    // @ts-ignore
  ]).process('@tailwind base;@tailwind components;@tailwind utilities;' + (typeof config?.css === 'string' ? config.css : ''), {
    from: undefined
  })
  return res
}

export async function ensureDir(p: string) {
  try {
    await fs.access(p)
  } catch {
    await fs.mkdir(p, {
      recursive: true
    })
  }
}

export function ensureDirSync(p: string) {
  if (!fss.existsSync(p)) {
    fss.mkdirSync(p, {
      recursive: true
    })
  }
}

// eslint-disable-next-line no-useless-escape
const wordSeparators = /[\s!"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~\u2000-\u206F\u2E00-\u2E7F\-]+/

export function pascalCase(str: string) {
  const words = str.split(wordSeparators)
  const length = words.length
  const mappedWords = Array.from({
    length
  })
  for (let i = 0; i < length; i++) {
    const word = words[i]
    if (word === '') {
      continue
    }
    mappedWords[i] = word[0].toUpperCase() + word.slice(1)
  }
  return mappedWords.join('')
}

export function walkScssSync(dir: string) {
  return klawSync(dir, {
    nodir: true,
    filter: (item) => {
      if (path.basename(item.path).startsWith('_')) {
        return false
      }
      return /\.scss$/.test(item.path)
    },
    traverseAll: true
  })
}

export function recursiveNodes(nodes: postcss.ChildNode[], result: Record<string, any> = {}) {
  for (const node of nodes) {
    switch (node.type) {
      case 'atrule': {
        if (node.name === 'apply') {
          const v = get(result, 'apply')
          if (typeof v === 'string' && v.length > 0) {
            set(result, 'apply', v + ' ' + node.params)
          } else {
            set(result, 'apply', node.params)
          }
        } else {
          const selector = `@${node.name} ${node.params}`
          result[selector] = {}
          recursiveNodes(node.nodes, result[selector])
        }

        break
      }
      case 'rule': {
        result[node.selector] = {}
        recursiveNodes(node.nodes, result[node.selector])
        break
      }
      case 'decl': {
        set(result, `css.${node.prop}`, node.value)
        break
      }
    }
  }
  return result
}

export function transformCss2Js(css: string) {
  const root = postcss.parse(css)
  const result = recursiveNodes(root.nodes)
  return result
}
