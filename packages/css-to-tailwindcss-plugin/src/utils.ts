import path from 'node:path'
import fs from 'node:fs'
export function resolvePath(p: string, cwd: string = process.cwd()) {
  return path.isAbsolute(p) ? p : path.resolve(cwd, p)
}

export function ensureDir(dir: string) {
  if (fs.existsSync(dir)) {
    const stat = fs.statSync(dir)
    if (!stat.isDirectory()) {
      fs.mkdirSync(dir)
    }
  } else {
    fs.mkdirSync(dir)
  }
}
