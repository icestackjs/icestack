import readline from 'node:readline'
import process from 'node:process'
import { createConsola } from 'consola'
import { pkgName } from '@icestack/shared/constants'
import cliProgress from 'cli-progress'

export const consola = createConsola()

function clearLine(rowCount = 1) {
  try {
    readline.moveCursor(process.stdout, 0, -rowCount)
    readline.clearLine(process.stdout, 1)
  }
  catch {}
}

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
    },
    createComponentsProgressBar() {
      let bar = this.logFlag
        ? new cliProgress.SingleBar(
          {
            format: 'building components: [{bar}] | {componentName} | {value}/{total}',
            // barCompleteChar: '\u2588',
            // barIncompleteChar: '\u2591'
            // hideCursor: true
          },
          cliProgress.Presets.shades_classic,
        )
        : undefined

      return {
        destroy() {
          bar = undefined
        },
        start: (total: number, startValue: number, payload?: object) => {
          return bar?.start(total, startValue, payload)
        },
        stop: () => {
          return bar?.stop()
        },
        clearLine: (rowCount?: number) => {
          return clearLine(rowCount)
        },
        update: (current: number, payload?: object) => {
          return bar?.update(current, payload)
        },
      }
    },
  }
}

export const logger = createLogger(pkgName)
