import { createConsola } from 'consola'
import { pkgName } from '@/constants'
export const consola = createConsola({})

export const logger = {
  logFlag: true,
  success(message: any, ...args: any[]) {
    return this.logFlag && consola.success(`[${pkgName}]: ${message}`, ...args)
  },
  warn(message: any, ...args: any[]) {
    return this.logFlag && consola.warn(`[${pkgName}]: ${message}`, ...args)
  },
  error(message: any, ...args: any[]) {
    return this.logFlag && consola.error(`[${pkgName}]: ${message}`, ...args)
  }
}
// const originSuccess = logger.success
// logger.success = function (...args: any[]) {
//   return originSuccess.apply(logger, ...args)
// }
