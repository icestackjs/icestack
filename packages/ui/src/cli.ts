import fs from 'node:fs/promises'
import path from 'node:path'
import { Command } from 'commander'
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

const jsT = `/**\n * @type {import('@icestack/ui').Config}\n */\nconst config = {
  outdir: './my-ui'
}\n\nmodule.exports = config\n`
cli
  .command('init')
  .description('init config')
  .action(async () => {
    const f = 'icestack.config.js'
    const p = path.resolve(process.cwd(), f)
    await fs.writeFile(p, jsT) // ts ? tsT : jsT)
    logger.success(`init ${f} successfully!`)
  })

cli
  .command('build')
  .description('code generate')
  .action(async () => {
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
