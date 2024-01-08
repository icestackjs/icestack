import { createContext } from '@/context'
import { getCodegenOptions } from '@icestack/config'

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
      dryRun: true,
      base: {
        themes: {
          light: {
            types: {
              primary: '#13c2c2'
            }
          },
          dark: {
            types: {
              primary: '#13a8a8'
            }
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

  it('build nothing', async () => {
    const ctx = createContext({
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
    const base = await ctx.build({ base: false, components: false, config: false, utilities: false })
    expect(base).toMatchSnapshot()
  })
})
