import { fixturesResolve, defaultTailwindConfig } from './utils'
import { getCss } from '@/core/process'

describe('process', () => {
  it('common.css', async () => {
    const p = fixturesResolve('common.css')

    const css = await getCss(p, {
      tailwindcssConfig: defaultTailwindConfig
    })
    expect(css).toMatchSnapshot()
  })

  it('common.css only extract layer', async () => {
    const p = fixturesResolve('common.css')

    const css = await getCss(p)
    expect(css).toMatchSnapshot()
  })
})
