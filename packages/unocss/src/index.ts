import type { Preset, Rule } from '@unocss/core'
import { defu } from '@icestack/shared'
import { getTheme } from './theme'
import { getRules } from './rules'
import { getPreflightCss } from './preflights'

export interface UnocssPluginOptions {
  loadDirectory: string
  loadConfig?: boolean | string
}

const defaultOptions: Partial<UnocssPluginOptions> = {
  loadConfig: false,
}

export function loadPresetOptions(opts: UnocssPluginOptions) {
  const { loadDirectory, loadConfig } = defu<UnocssPluginOptions, Partial<UnocssPluginOptions>[]>(opts, defaultOptions)
  if (!loadDirectory) {
    throw new Error('loadDirectory option must be passed')
  }

  const theme = loadConfig ? getTheme(loadDirectory) : {}
  const keyframes: string[] = []
  const rules: Rule<object>[] = getRules(loadDirectory, keyframes).map(([x, y]) => {
    return [new RegExp(`^${x}$`), () => y]
  })
  const preflights = getPreflightCss(loadDirectory, keyframes)
  return {
    theme,
    rules,
    preflights,
  }
}

export const icestackPreset: (opts: UnocssPluginOptions) => Preset = (opts) => {
  const { preflights, theme, rules } = loadPresetOptions(opts)
  return {
    name: 'unocss-preset-icestack',
    preflights,
    theme,
    rules,
  }
}
