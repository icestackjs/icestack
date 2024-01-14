import { createContext } from '@/index'

describe('build', () => {
  it('build all', async () => {
    const ctx = createContext({
      dryRun: true
    })
    const res = await ctx.build()
    expect(res).toMatchSnapshot()
    // console.log(ctx.base)
  })

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
    await ctx.buildBase()
    expect(ctx.base.index.resolvedCss).toMatchSnapshot('index')
    expect(ctx.base.legacy.resolvedCss).toMatchSnapshot('legacy')
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
