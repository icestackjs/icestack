import fs from 'node:fs/promises'
import fss from 'node:fs'
import readline from 'node:readline'
import { transformCss2Js } from '@/shared'

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

export function JSONStringify(value: any) {
  return JSON.stringify(value, null, 2)
}

export function arrMatch(matchArr?: (string | RegExp)[], str?: string) {
  if (!Array.isArray(matchArr)) return
  if (typeof str !== 'string') return
  return matchArr.some((regex) => {
    if (typeof regex === 'string') {
      return str.includes(regex)
    }
    return str.match(regex)
  })
}

export function preHandleString<T>(val: T) {
  if (typeof val === 'string') {
    return transformCss2Js(val)
  }
  return val
}

export function makeExtraCssArray(value: any | any[]) {
  return Array.isArray(value) ? value.map((x) => preHandleString(x)) : [preHandleString(value)]
}

export function cmdClear(rowCount = 1) {
  readline.moveCursor(process.stdout, 0, -rowCount)
  readline.clearLine(process.stdout, 1)
  // process.stdout.moveCursor(0, -rowCount)
  // process.stdout.clearLine(1)
}
