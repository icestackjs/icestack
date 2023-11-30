import { createConsola } from 'consola'
import { pkgName } from '@icestack/shared/constants'
export const consola = createConsola({})

export function createLogger(prefix: string) {
  return {
    logFlag: true,
    success(message: any, ...args: any[]) {
      return this.logFlag && consola.success(`[${prefix}]: ${message}`, ...args)
    },
    warn(message: any, ...args: any[]) {
      return this.logFlag && consola.warn(`[${prefix}]: ${message}`, ...args)
    },
    error(message: any, ...args: any[]) {
      return this.logFlag && consola.error(`[${prefix}]: ${message}`, ...args)
    }
  }
}

export const logger = createLogger(pkgName)
