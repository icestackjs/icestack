import fs from 'node:fs/promises'
import path from 'node:path'
import { Config } from 'tailwindcss'

const fixturesPath = path.resolve(__dirname, 'fixtures')

export function fixturesResolve(...args: string[]) {
  return path.resolve(fixturesPath, ...args)
}

export function getCase(...args: string[]) {
  return fs.readFile(fixturesResolve(...args))
}

export const defaultTailwindConfig = require(fixturesResolve('config/tailwind.config.js'))

export function mergeConfig(cfg: Config): Config {
  return Object.assign<Config, Config>(cfg, defaultTailwindConfig)
}
