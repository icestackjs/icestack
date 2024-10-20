import fs from 'node:fs'

export function ensureDir(dir: string) {
  try {
    fs.mkdirSync(dir, { recursive: true })
  }
  catch {}
}

export function matchAll(regex: RegExp, str: string) {
  const arr = []
  let res
  do {
    res = regex.exec(str)
    if (res) {
      arr.push(res)
    }
  } while (res !== null)
  return arr
}
