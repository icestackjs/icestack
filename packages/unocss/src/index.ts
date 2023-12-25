import path from 'node:path'
import type { Preset, DynamicRule, Preflight, Rule } from 'unocss'
import type { UnocssPluginOptions } from '@icestack/types'
import { createLogger } from '@icestack/logger'
import { name as pkgName } from '../package.json'
// new RegExp(`^${base}$`)
const logger = createLogger(pkgName)

function requireLib(id: string, basedir: string) {
  return require(path.resolve(basedir, id))
}

const defaultOptions: Partial<UnocssPluginOptions> = {
  loadConfig: false
}

const replacePrefix = (css: string) => css.replaceAll('--tw-', '--un-')

export const icestackPreset: (opts: UnocssPluginOptions) => Preset = () => {
  const theme = {}
  const rules: Rule<object>[] = []
  const preflights: Preflight<object>[] = []
  return {
    name: 'unocss-preset-icestack',
    preflights,
    theme,
    rules
  }
}
