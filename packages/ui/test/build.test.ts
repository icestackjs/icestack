import { createContext } from '@/context'
import { getCodegenOptions } from '@/options'

describe('build', () => {
  it('build base', async () => {
    const ctx = createContext(
      getCodegenOptions({
        dryRun: true
      })
    )
    const base = await ctx.buildBase()
    expect(base).toMatchSnapshot()
  })

  it('build base change default selector case ', async () => {
    const ctx = createContext(
      getCodegenOptions({
        dryRun: true,
        base: {
          themes: {
            light: {
              selector: 'page'
            },
            dark: {
              selector: '.dark'
            }
          }
        }
      })
    )
    const base = await ctx.buildBase()
    expect(base).toMatchSnapshot()
  })
})
