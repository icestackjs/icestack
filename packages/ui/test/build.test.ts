import path from 'node:path'
import fs from 'node:fs'
import { deleteAsync } from 'del'
import { getCodegenOptions } from '@/options'
import { createContext } from '@/context'
import { buildAll } from '@/generate'

describe('build', () => {
  it('build base', () => {
    const ctx = createContext(getCodegenOptions())
    ctx.generate('base')
  })
})
function resolve(...p: string[]) {
  return path.resolve(__dirname, './fixtures/generate', ...p)
}
describe.skip.concurrent('build', () => {
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

  it('dryRun case 0', async () => {
    const dir = resolve('dryRun')
    await deleteAsync([dir])
    const res = await buildAll({
      ...getCodegenOptions({
        dryRun: true
      }),
      outdir: dir
    })
    expect(res).toMatchSnapshot()
    for (const x of expectedDirs) {
      expect(fs.existsSync(path.resolve(dir, x))).toBe(false)
    }
  })

  it.skip('case 2', async () => {
    const dir = resolve('prefixer')
    await deleteAsync([dir])
    await buildAll({
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
