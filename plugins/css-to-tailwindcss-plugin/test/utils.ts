import type { Config } from 'tailwindcss'
import fs from 'node:fs/promises'
import path from 'node:path'
import { createContext } from '@/core'
import defu from 'defu'
import postcss from 'postcss'
import tailwindcss from 'tailwindcss'

const fixturesPath = path.resolve(__dirname, 'fixtures')

export function fixturesResolve(...args: string[]) {
  return path.resolve(fixturesPath, ...args)
}

export function getCase(...args: string[]) {
  return fs.readFile(fixturesResolve(...args))
}

export const defaultTailwindConfig = require(fixturesResolve('config/tailwind.config.js'))

export const withPluginTailwindConfigPath = fixturesResolve('config/tailwind-with-plugin.config.js')

export const withPluginTailwindConfig = require(withPluginTailwindConfigPath)

export function mergeConfig(cfg: Config): Config {
  return Object.assign<Config, Config>(cfg, defaultTailwindConfig)
}

export function getTwCtx(config?: Config) {
  return createContext({
    tailwindcssResolved: true,
    tailwindcssConfig: defu(config, defaultTailwindConfig),
    withOptions: false,
  })
}

export function getCss(config: string | Config) {
  return postcss([
    tailwindcss({
      config,
    }),
  ])
    .process('@tailwind base;@tailwind components;@tailwind utilities;')
    .async()
}
