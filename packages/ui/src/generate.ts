import { CodegenOptions } from '@/types'
import { logger } from '@/log'
import { createContext } from '@/context'

export function buildAll(options: CodegenOptions) {
  const ctx = createContext(options)
  let start = performance.now()
  const base = ctx.generate('base')
  let end = performance.now()
  logger.success('build base finished! ' + `${end - start}ms`)
  start = performance.now()
  const utilities = ctx.generate('utilities')
  end = performance.now()
  logger.success('build utilities finished! ' + `${end - start}ms`)
  start = performance.now()
  const components = ctx.generate('components')
  end = performance.now()
  logger.success('build components finished! ' + `${end - start}ms`)

  return {
    base,
    components,
    utilities
  }
}
