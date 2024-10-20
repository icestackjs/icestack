import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { loadSync } from '@icestack/config'
import { createContext } from '@icestack/core'
import { logger } from '@icestack/logger'
import { getModuleDependencies, touch } from '@icestack/shared'
import chokidar from 'chokidar'
import { Command } from 'commander'
import { createJsConfig } from './config'

function touchTwConfig(filepath: string) {
  const dirname = path.dirname(filepath)
  const configPath = path.resolve(dirname, 'tailwind.config.js')
  if (fs.existsSync(configPath)) {
    touch(configPath)
  }
}

export const cli = new Command()

async function letUsBuild(options: { clean?: boolean, configFile?: string } = {}) {
  const { clean, configFile } = options
  if (configFile) {
    logger.success(`load config from ${configFile}`)
  }
  const o = await loadSync({
    configFile,
  })
  if (!o) {
    logger.error('load options fail!')
    return
  }
  const { config, filepath } = o
  if (config) {
    if (!config.outdir) {
      logger.error('outdir option must be passed!')
      return
    }
    if (clean || config.clean) {
      const { deleteAsync } = await import('del')
      await deleteAsync(config.outdir)
      logger.success(`del outdir: ${config.outdir} successfully!`)
    }

    const ctx = createContext(filepath)
    await ctx.build()
    logger.success('build successfully!')
  }
  return o
}
const defaultOutdir = 'my-ui'

cli
  .command('init')
  .description('init config')
  .option('--only-config', 'output onlt config')
  .option('--format <format>', 'config file format')
  .option('--outdir <outdir>')
  .option('--mode <mode>')
  .action(async (options) => {
    const cwd = process.cwd()
    const { onlyConfig, outdir = defaultOutdir, format = 'cjs', mode = 'none' } = options
    const { data, filename } = createJsConfig({
      outdir,
      format,
      mode,
    })
    const p = path.resolve(cwd, filename)
    fs.writeFileSync(p, data, 'utf8') // ts ? tsT : jsT)
    logger.success(`init ${filename} successfully!`)
    if (onlyConfig) {
      return
    }
    const gitignoreFilePath = path.resolve(cwd, '.gitignore')
    fs.existsSync(gitignoreFilePath) ? fs.appendFileSync(gitignoreFilePath, `\n${outdir}\n`, 'utf8') : fs.writeFileSync(gitignoreFilePath, `${outdir}\n`, 'utf8')

    await letUsBuild()
  })

cli
  .command('build')
  .description('code generate')
  .option('--clean')
  .option('-c, --config <path>', 'config path')
  .action(async (options) => {
    const { clean, config } = options
    const opts = { clean, configFile: config }
    const res = await letUsBuild(opts)
    res && touchTwConfig(res.filepath)
  })

cli
  .command('watch')
  .description('watch config file change and build lib')
  .option('-c, --config <path>', 'config path')
  .action(async (options) => {
    const { clean, config } = options
    const opts = { clean, configFile: config }
    const { configFile } = opts
    const cwd = process.cwd()
    const o = await loadSync({
      cwd,
      configFile,
    })
    if (!o) {
      logger.error('load options fail!')
      return
    }
    const { filepath } = o
    if (configFile) {
      logger.success(`load config from ${configFile}`)
    }
    // path.resolve(cwd, 'icestack.config.{js,ts,cjs}')
    chokidar
      .watch([...getModuleDependencies(filepath)])
      .on('change', async () => {
        const res = await letUsBuild(opts)
        res && touchTwConfig(res.filepath)
        logger.success('some changes happened')
      })
      .on('ready', async () => {
        const res = await letUsBuild(opts)
        res && touchTwConfig(res.filepath)
        logger.success('start watching config......')
      })
  })
