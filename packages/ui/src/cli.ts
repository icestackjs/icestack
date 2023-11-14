import fs from 'node:fs/promises'
import path from 'node:path'
import createCli from 'cac'
import { loadConfig } from 'c12'
import type { CodegenOptions, DeepPartial } from './types'
import { buildAll } from './generate'
import { getCodegenOptions } from './options'
import { logger } from '@/log'
const cli = createCli()

export async function load(cwd?: string) {
  const { config } = await loadConfig<DeepPartial<CodegenOptions>>({
    name: 'icestack',
    cwd,
    defaultConfig: getCodegenOptions()
  })
  return config
}

const tsT = `import { defineConfig } from '@icestack/ui'\n\nexport default defineConfig({
  outdir: './my-ui'
})\n`
const jsT = `/**\n * @type {import('@icestack/ui').Config}\n */\nconst config = {
  outdir: './my-ui'
}\n\nmodule.exports = config\n`
cli
  .command('init', 'init config')
  .option('--ts', 'typescript config')
  .action(async ({ ts }) => {
    const f = ts ? 'icestack.config.ts' : 'icestack.config.js'
    const p = path.resolve(process.cwd(), f)
    await fs.writeFile(p, ts ? tsT : jsT)
    logger.success(`init ${f} successfully!`)
  })

cli.command('build', 'code generate').action(async () => {
  const config = await load()
  if (config) {
    if (!config.outdir) {
      logger.error('outdir option must be passed!')
      return
    }
    const cfg = getCodegenOptions(config, true)
    await buildAll(cfg)
    logger.success('build successfully!')
  }
})

cli.help()
cli.version('0.0.0')
cli.parse()
