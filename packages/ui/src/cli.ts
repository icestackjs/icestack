import fs from 'node:fs/promises'
import fss from 'node:fs'
import path from 'node:path'
import { Command } from 'commander'
import chokidar from 'chokidar'
import dedent from 'dedent'
import pkg from '../package.json'
import { load } from './options'
import { logger } from '@/log'
import { createContext } from '@/context'
import { JSONStringify } from '@/utils'
const cli = new Command()

// const tsT = `import { defineConfig } from '@icestack/ui'\n\nexport default defineConfig({
//   outdir: './my-ui'
// })\n`
// ts ? 'icestack.config.ts' :

async function letUsBuild() {
  const config = await load()
  if (config) {
    if (!config.outdir) {
      logger.error('outdir option must be passed!')
      return
    }
    const ctx = createContext(config)
    await ctx.build()
    logger.success('build successfully!')
  }
}
const defaultOutdir = 'my-ui'

function createJsConfig(outdir: string) {
  const p = './' + outdir
  return dedent`/**\n * @type {import('@icestack/ui').Config}\n */\nconst config = {
    outdir: '${p}'
  }\n\nmodule.exports = config\n`
}

cli
  .command('init')
  .description('init config')
  .option('--only-config', 'output onlt config')
  .option('--outdir <outdir>')
  .action(async (options) => {
    const cwd = process.cwd()
    const { onlyConfig, outdir = defaultOutdir } = options
    const f = 'icestack.config.js'
    const p = path.resolve(cwd, f)
    await fs.writeFile(p, createJsConfig(outdir)) // ts ? tsT : jsT)
    logger.success(`init ${f} successfully!`)
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
  .action(async () => {
    await letUsBuild()
  })

cli
  .command('watch')
  .description('watch config file change and build lib')
  .action(() => {
    const cwd = process.cwd()

    chokidar
      .watch(path.resolve(cwd, 'icestack.config.{js,ts,cjs}'))
      .on('change', async () => {
        logger.success('some changes happened')
        await letUsBuild()
      })
      .on('ready', async () => {
        await letUsBuild()
        logger.success('start watching config......')
      })
  })

cli
  .command('inspect [componentName]')
  .description('inspect component to get css schema')
  .option('-o, --out <filePath>', 'output file')
  .action(async (componentName, options) => {
    const cwd = process.cwd()
    const config = await load(cwd)
    if (config) {
      const ctx = createContext(config)
      if (componentName) {
        if (componentName in ctx.presets) {
          const outfile = path.resolve(cwd, options.out ?? `${componentName}.json`)
          const res = JSONStringify(ctx.presets[componentName])
          await fs.writeFile(outfile, res, 'utf8')
          logger.success(`[${componentName}] has been exported! \nfile: ${outfile}`)
        } else {
          logger.error(`\`${componentName}\` is not a valid componentName!`)
        }
      } else {
        const res = JSONStringify(ctx.presets)
        const outfile = path.resolve(cwd, options.out ?? `all.json`)
        await fs.writeFile(outfile, res, 'utf8')
        logger.success(`all components has been exported! \nfile: ${outfile}`)
      }
    }
  })

cli.version(pkg.version)
cli.parse()
