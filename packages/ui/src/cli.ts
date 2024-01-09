import fs from 'node:fs/promises'
import fss from 'node:fs'
import path from 'node:path'
import { Command } from 'commander'
import chokidar from 'chokidar'
import dedent from 'dedent'
import { loadSync } from '@icestack/config'
import { version } from '../package.json'
import { logger } from '@/log'
import { createContext } from '@/context'
// import { JSONStringify } from '@/utils'
const cli = new Command()

// ts ? 'icestack.config.ts' :

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
    await fs.writeFile(p, data) // ts ? tsT : jsT)
    logger.success(`init ${filename} successfully!`)
    if (onlyConfig) {
      return
    }
    const gitignoreFilePath = path.resolve(cwd, '.gitignore')
    await (fss.existsSync(gitignoreFilePath) ? fs.appendFile(gitignoreFilePath, `\n${outdir}\n`, 'utf8') : fs.writeFile(gitignoreFilePath, `${outdir}\n`, 'utf8'))

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
  .action((options) => {
    const { clean, config } = options
    const opts = { clean, configFile: config }
    const cwd = process.cwd()

    chokidar
      .watch(path.resolve(cwd, 'icestack.config.{js,ts,cjs}'))
      .on('change', async () => {
        logger.success('some changes happened')
        await letUsBuild(opts)
      })
      .on('ready', async () => {
        await letUsBuild(opts)
        logger.success('start watching config......')
      })
  })

// cli
//   .command('inspect [componentName]')
//   .description('inspect component to get css schema')
//   .option('-o, --out <filePath>', 'output file')
//   .action(async (componentName, options) => {
//     const cwd = process.cwd()
//     const config = await load(cwd)
//     if (config) {
//       const ctx = createContext(config)
//       if (componentName) {
//         if (componentName in ctx.presets) {
//           const outfile = path.resolve(cwd, options.out ?? `${componentName}.json`)
//           const res = JSONStringify(ctx.presets[componentName])
//           await fs.writeFile(outfile, res, 'utf8')
//           logger.success(`[${componentName}] has been exported! \nfile: ${outfile}`)
//         } else {
//           logger.error(`\`${componentName}\` is not a valid componentName!`)
//         }
//       } else {
//         const res = JSONStringify(ctx.presets)
//         const outfile = path.resolve(cwd, options.out ?? `all.json`)
//         await fs.writeFile(outfile, res, 'utf8')
//         logger.success(`all components has been exported! \nfile: ${outfile}`)
//       }
//     }
//   })

cli.version(version)
cli.parse()
