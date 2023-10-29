// codegen
// prepare
import fs from 'node:fs/promises'
import path from 'node:path'
import createCli from 'cac'
import { loadConfig } from 'c12'
import type { CodegenOptions, DeepPartial } from './types'
import { buildAll } from './generate'
import { getCodegenOptions } from './options'
import { getDefaultCacheDir } from '@/cache'
// import { getCodegenOptions } from '@/options'
const cli = createCli()

export async function load(cwd?: string) {
  const { config } = await loadConfig<DeepPartial<CodegenOptions>>({
    name: 'icestack',
    cwd
    // defaultConfig: getCodegenOptions()
  })
  return config
}

const tsT = `import { defineConfig } from '@icestack/ui'\n\nexport default defineConfig()\n`
const jsT = `/**\n* @type {import('@icestack/ui').Config}\n*/\nconst config = {}\nmodule.exports = config\n`
cli
  .command('init', 'init config')
  .option('--ts', 'typescript config')
  .action(async ({ ts }) => {
    await (ts ? fs.writeFile(path.resolve(process.cwd(), './icestack.config.ts'), tsT) : fs.writeFile(path.resolve(process.cwd(), './icestack.config.js'), jsT))
  })

cli.command('codegen', 'code generate').action(async () => {
  const config = await load()
  if (config) {
    const cfg = getCodegenOptions(config, true)
    await buildAll(cfg)
    console.log('codegen successfully!')
  }
})

cli
  .command('cache [sub]')
  .option('-cwd <cwd>', 'cwd path')
  .action(async (sub, options) => {
    if (sub === 'clean') {
      const { deleteAsync } = await import('del')
      const p = getDefaultCacheDir(options.cwd)
      const res = await deleteAsync(p)
      console.log(`delete successfully: ${res}`)
    }
  })

cli.help()
cli.version('0.0.0')
cli.parse()
