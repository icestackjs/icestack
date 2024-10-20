import type { Config } from 'tailwindcss'
import fss from 'node:fs'
import fs from 'node:fs/promises'
import { defu } from 'defu'
import postcss from 'postcss'
import tailwindcss from 'tailwindcss'
// import klawSync from 'klaw-sync'

export async function getCss(config?: Partial<Config> & { css?: string }) {
  const res = await postcss([
    tailwindcss(
      defu<Config, Config[]>(config, {
        content: [{ raw: '' }],
        corePlugins: {
          preflight: false,
        },
      }),
    ),
    // @ts-ignore
  ]).process(`@tailwind base;@tailwind components;@tailwind utilities;${typeof config?.css === 'string' ? config.css : ''}`, {
    from: undefined,
  })
  return res
}

export async function ensureDir(p: string) {
  try {
    await fs.access(p)
  }
  catch {
    await fs.mkdir(p, {
      recursive: true,
    })
  }
}

export function ensureDirSync(p: string) {
  if (!fss.existsSync(p)) {
    fss.mkdirSync(p, {
      recursive: true,
    })
  }
}

const wordSeparators = /[\s!"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~\u2000-\u206F\u2E00-\u2E7F\-]+/

export function pascalCase(str: string) {
  const words = str.split(wordSeparators)
  const length = words.length
  const mappedWords = Array.from({
    length,
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

// export function walkScssSync(dir: string) {
//   return klawSync(dir, {
//     nodir: true,
//     filter: (item) => {
//       if (path.basename(item.path).startsWith('_')) {
//         return false
//       }
//       return /\.scss$/.test(item.path)
//     },
//     traverseAll: true
//   })
// }

export function JSONStringify(value: any) {
  return JSON.stringify(value, null, 2)
}

export function arrMatch(matchArr?: (string | RegExp)[], str?: string) {
  if (!Array.isArray(matchArr)) { return }
  if (typeof str !== 'string') { return }
  return matchArr.some((regex) => {
    if (typeof regex === 'string') {
      return str.includes(regex)
    }
    return str.match(regex)
  })
}
