import { createConsola } from 'consola'
import { pkgName } from '@/constants'
export const consola = createConsola({})

export const logger = {
  success(message: any, ...args: any[]) {
    return consola.success(`[${pkgName}]: ${message}`, ...args)
  }
}
// const originSuccess = logger.success
// logger.success = function (...args: any[]) {
//   return originSuccess.apply(logger, ...args)
// }
