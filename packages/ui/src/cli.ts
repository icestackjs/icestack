// codegen
// prepare
import createCli from 'cac'
import { loadConfig } from 'c12'
import type { UserDefinedOptions } from './types'
import { buildAll } from './generate'
const cli = createCli()

async function load(cwd?: string) {
  const { config, configFile, layers } = await loadConfig<UserDefinedOptions>({
    name: 'icestack',
    cwd
  })
  return config
}

cli.command('codegen', 'code generate').action(async () => {
  const config = await load()
  await buildAll(config?.outdir)
})

cli.help()
cli.version('0.0.0')
cli.parse()
