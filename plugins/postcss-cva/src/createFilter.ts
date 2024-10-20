import type { FilterPattern } from './types'

import { isAbsolute, posix, resolve } from 'node:path'

import pm from 'picomatch'
import normalizePath from './normalizePath'
import ensureArray from './utils/ensureArray'

function getMatcherString(id: string, resolutionBase: string | false | null | undefined) {
  if (resolutionBase === false || isAbsolute(id) || id.startsWith('**')) {
    return normalizePath(id)
  }

  // resolve('') is valid and will default to process.cwd()
  const basePath = normalizePath(resolve(resolutionBase || ''))
    // escape all possible (posix + win) path characters that might interfere with regex
    .replaceAll(/[$()*+.?[\]^{|}-]/g, '\\$&')
  // Note that we use posix.join because:
  // 1. the basePath has been normalized to use /
  // 2. the incoming glob (id) matcher, also uses /
  // otherwise Node will force backslash (\) on windows
  return posix.join(basePath, normalizePath(id))
}

const createFilter = function createFilter(include?: FilterPattern, exclude?: FilterPattern, options?: { resolve?: string | false | null }): (id: string | unknown) => boolean {
  const resolutionBase = options && options.resolve

  const getMatcher = (id: string | RegExp) =>
    id instanceof RegExp
      ? id
      : {
          test: (what: string) => {
            // this refactor is a tad overly verbose but makes for easy debugging
            const pattern = getMatcherString(id, resolutionBase)
            const fn = pm(pattern, { dot: true })
            const result = fn(what)

            return result
          },
        }

  const includeMatchers = ensureArray(include).map(element => getMatcher(element))
  const excludeMatchers = ensureArray(exclude).map(element => getMatcher(element))

  return function result(id: string | unknown): boolean {
    if (typeof id !== 'string') {
      return false
    }
    if (/\0/.test(id)) {
      return false
    }

    const pathId = normalizePath(id)

    for (const matcher of excludeMatchers) {
      if (matcher.test(pathId)) {
        return false
      }
    }

    for (const matcher of includeMatchers) {
      if (matcher.test(pathId)) {
        return true
      }
    }

    return includeMatchers.length === 0
  }
}

export { createFilter as default }
