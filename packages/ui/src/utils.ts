import fs from 'node:fs/promises'
import fss from 'node:fs'
import postcss from 'postcss'
import tailwindcss from 'tailwindcss'
import type { Config } from 'tailwindcss'
import defu from 'defu'

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
