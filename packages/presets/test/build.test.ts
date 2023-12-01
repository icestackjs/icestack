import path from 'node:path'
import fs from 'node:fs'
import { deleteAsync } from 'del'
import { createContext, getCodegenOptions } from '@icestack/ui'
import { miniprogramPreset } from '@/index'

function resolve(...p: string[]) {
  return path.resolve(__dirname, './fixtures/generate', ...p)
}
describe('build', () => {
  it('build base with miniprogramPreset case ', async () => {
    const ctx = createContext(
      getCodegenOptions({
        dryRun: true,
        presets: [miniprogramPreset]
      })
    )
    const base = await ctx.buildBase()
    expect(base).toMatchSnapshot()
  })

  it('miniprogramPreset buildComponents', async () => {
    const ctx = createContext({
      dryRun: true,
      presets: [miniprogramPreset()]
    })
    const res = await ctx.buildComponents()
    expect(res).toMatchSnapshot()
  })
})

describe.skip.concurrent('build', () => {
  const expectedDirs = ['css', 'css-resolved', 'js', 'js/base', 'js/components', 'js/utilities', 'js/base/index.js', 'js/components/index.js', 'js/utilities/index.js']
  it('case 0', async () => {
    const dir = resolve('case0')
    await deleteAsync([dir])
    const ctx = createContext({
      ...getCodegenOptions(),
      outdir: dir
    })
    await ctx.build()

    for (const x of expectedDirs) {
      expect(fs.existsSync(path.resolve(dir, x))).toBe(true)
    }
  })

  it('dryRun case 0', async () => {
    const dir = resolve('dryRun')
    await deleteAsync([dir])
    const ctx = createContext({
      ...getCodegenOptions({
        dryRun: true
      }),
      outdir: dir
    })
    const res = await ctx.build()
    expect(res).toMatchSnapshot()
    for (const x of expectedDirs) {
      expect(fs.existsSync(path.resolve(dir, x))).toBe(false)
    }
  })

  it.skip('case 2', async () => {
    const dir = resolve('prefixer')
    await deleteAsync([dir])
    const ctx = createContext({
      ...getCodegenOptions({
        prefix: 'som-'
      }),
      outdir: dir
    })
    const res = await ctx.build()
    expect(res).toMatchSnapshot()
    for (const x of expectedDirs) {
      expect(fs.existsSync(path.resolve(dir, x))).toBe(true)
    }
  })
})
