import type { Config } from '@/index'

describe('index', () => {
  const c: Config = {
    dryRun: true,
  }
  const a: Config = {
    outdir: '.',
  }
  it('true', () => {
    expect(a).toBeTruthy()
    expect(c).toBeTruthy()
  })
})
