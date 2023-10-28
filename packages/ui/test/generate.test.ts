import path from 'node:path'
import fs from 'node:fs'
import { deleteAsync } from 'del'
import { buildAll } from '@/generate'
import { getCodegenOptions } from '@/options'
function resolve(...p: string[]) {
  return path.resolve(__dirname, './fixtures/generate', ...p)
}
describe('generate', () => {
  const expectedDirs = ['css', 'css-resolved', 'js', 'js/base', 'js/components', 'js/utilities', 'js/base/index.js', 'js/components/index.js', 'js/utilities/index.js']
  it('case 0', async () => {
    const dir = resolve('case0')
    await deleteAsync([dir])
    buildAll({
      ...getCodegenOptions(),
      outdir: dir
    })

    for (const x of expectedDirs) {
      expect(fs.existsSync(path.resolve(dir, x))).toBe(true)
    }
  })

  it('case 1', async () => {
    const dir = resolve('dryRun')
    await deleteAsync([dir])
    buildAll({
      ...getCodegenOptions({
        dryRun: true
      }),
      outdir: dir
    })
    for (const x of expectedDirs) {
      expect(fs.existsSync(path.resolve(dir, x))).toBe(false)
    }
  })

  it.only('case 2', async () => {
    const dir = resolve('prefixer')
    await deleteAsync([dir])
    buildAll({
      ...getCodegenOptions({
        prefix: 'som-'
      }),
      outdir: dir
    })
    for (const x of expectedDirs) {
      expect(fs.existsSync(path.resolve(dir, x))).toBe(true)
    }
  })
})
