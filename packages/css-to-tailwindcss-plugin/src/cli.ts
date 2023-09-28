import path from 'node:path'
import fs from 'node:fs'
import createCac from 'cac'
import { createContext } from './core'
import { ensureDir, resolvePath } from './utils'
import { LayerEnumType, version } from '@/constants'
const cli = createCac()

const defaultCwd = process.cwd()

cli
  .command('build [...files]', 'Build files')
  .option('--out <dir>', 'Output directory')
  .option('--cwd <cwd>', 'Current working directory')
  .option('--resolved, --tailwindcssResolved', 'If Resolved tailwindcss ')
  .option('-c, --config, --tailwindcssConfig <config>', 'Tailwindcss config path')
  .action(async (files: string[], options: { out: string; cwd: string; outSideLayerCss: LayerEnumType; tailwindcssResolved: boolean; tailwindcssConfig: string }) => {
    const { cwd, out, outSideLayerCss, tailwindcssResolved, tailwindcssConfig } = options
    for (const file of files) {
      const entry = resolvePath(file, resolvePath(cwd, defaultCwd))
      if (!fs.existsSync(entry)) {
        console.log(`${file} isn't existed! skipped`)
        continue
      }
      const ctx = createContext({
        outSideLayerCss,
        tailwindcssResolved,
        tailwindcssConfig
      })
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

cli.version(version)

cli.parse()
