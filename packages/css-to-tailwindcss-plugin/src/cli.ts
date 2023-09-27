import path from 'node:path'
import fs from 'node:fs'
import createCac from 'cac'
import { createContext } from './core'
import { ensureDir, resolvePath } from './utils'
const cli = createCac()

const defaultCwd = process.cwd()

cli
  .command('build [...files]', 'Build files')
  .option('--out <dir>', 'Output directory')
  .option('--cwd <cwd>', 'Current working directory')
  .action(async (files: string[], options: { out: string; cwd: string }) => {
    const { cwd, out } = options
    for (const file of files) {
      const entry = resolvePath(file, resolvePath(cwd, defaultCwd))
      if (!fs.existsSync(entry)) {
        console.log(`${file} isn't existed! skipped`)
        continue
      }
      const ctx = createContext()
      await ctx.process(entry)
      const code = ctx.generate()
      const filename = path.basename(entry, path.extname(entry))
      const outDir = out ? resolvePath(out, cwd) : path.dirname(entry)
      ensureDir(outDir)
      const target = path.resolve(outDir, filename + '.js')
      fs.writeFileSync(target, code, 'utf8')
      console.log(`build successfully! file: ${target}`)
    }
  })

cli.help()

cli.version('0.0.0')

cli.parse()
