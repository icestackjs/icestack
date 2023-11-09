import { createConsola } from 'consola'
import { pkgName } from '@/constants'
export const consola = createConsola({})

export const logger = {
  success(message: any, ...args: any[]) {
    return consola.success(`[${pkgName}]: ${message}`, ...args)
  },
  warn(message: any, ...args: any[]) {
    return consola.warn(`[${pkgName}]: ${message}`, ...args)
  },
  error(message: any, ...args: any[]) {
    return consola.error(`[${pkgName}]: ${message}`, ...args)
  }
}
// const originSuccess = logger.success
// logger.success = function (...args: any[]) {
//   return originSuccess.apply(logger, ...args)
// }
