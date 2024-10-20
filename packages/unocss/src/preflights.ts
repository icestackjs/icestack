import type { Preflight } from '@unocss/core'
import fs from 'node:fs'
import path from 'node:path'

export function getPreflightCss(loadDirectory: string, keyframes: string[]) {
  const preflightCss = fs.readFileSync(path.resolve(loadDirectory, 'css-resolved/base/legacy.css'), 'utf8')
  const preflights: Preflight<object>[] = [
    {
      getCSS() {
        return preflightCss
      },
    },
    {
      getCSS: () => keyframes.join('\n'),
    },
  ]
  return preflights
}
