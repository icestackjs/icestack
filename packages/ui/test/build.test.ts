import { createContext } from '@/context'
import { getCodegenOptions } from '@/options'

describe('build', () => {
  it('build base', async () => {
    const ctx = createContext({
      dryRun: true
    })
    const base = await ctx.buildBase()
    expect(base).toMatchSnapshot()
  })

  it('build base with custom types', async () => {
    const ctx = createContext({
      mode: 'styled',
      dryRun: true,
      base: {
        types: {
          primary: {
            light: '#13c2c2',
            dark: '#13a8a8'
          }
        }
      }
    })
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
