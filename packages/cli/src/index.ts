import fs from 'node:fs'
import path from 'node:path'
import { Command } from 'commander'
import chokidar from 'chokidar'
import dedent from 'dedent'
import { loadSync } from '@icestack/config'
import { logger } from '@icestack/logger'
import { createContext } from '@icestack/core'
import { getModuleDependencies } from '@icestack/shared'

export const cli = new Command()

async function letUsBuild(options: { clean?: boolean; configFile?: string } = {}) {
  const { clean, configFile } = options
  if (configFile) {
    logger.success(`load config from ${configFile}`)
  }
  const { config } = await loadSync({
    configFile
  })
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

    const ctx = createContext(config)
    await ctx.build()
    logger.success('build successfully!')
  }
}
const defaultOutdir = 'my-ui'

function createJsConfig(outdir: string, format: 'cjs' | 'ts' = 'cjs') {
  const p = './' + outdir
  if (format === 'ts') {
    return {
      filename: 'icestack.config.ts',
      data: dedent`import { defineConfig } from '@icestack/ui'\n\nexport default defineConfig({
        outdir: '${p}'
      })\n`
    }
  }
  return {
    filename: 'icestack.config.cjs',
    data: dedent`/**\n * @type {import('@icestack/ui').Config}\n */\nconst config = {
      outdir: '${p}'
    }\n\n${'module.exports = config'}\n`
  }
}

cli
  .command('init')
  .description('init config')
  .option('--only-config', 'output onlt config')
  .option('--format <format>', 'config file format')
  .option('--outdir <outdir>')
  .action(async (options) => {
    const cwd = process.cwd()
    const { onlyConfig, outdir = defaultOutdir, format = 'cjs' } = options
    const { data, filename } = createJsConfig(outdir, format)
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
    await letUsBuild(opts)
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

    const { filepath } = await loadSync({
      configFile,
      cwd
    })
    if (configFile) {
      logger.success(`load config from ${configFile}`)
    }
    // path.resolve(cwd, 'icestack.config.{js,ts,cjs}')
    chokidar
      .watch([...getModuleDependencies(filepath)])
      .on('change', async () => {
        logger.success('some changes happened')
        await letUsBuild(opts)
      })
      .on('ready', async () => {
        await letUsBuild(opts)
        logger.success('start watching config......')
      })
  })
