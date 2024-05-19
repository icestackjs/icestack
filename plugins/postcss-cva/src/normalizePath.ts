import { posix, win32 } from 'node:path'

const normalizePath = function normalizePath(filename: string) {
  return filename.split(win32.sep).join(posix.sep)
}

export { normalizePath as default }
