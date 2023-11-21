import { createContext, IContext } from '@/context'
import { getCodegenOptions } from '@/options'

describe('base', () => {
  let ctx: IContext
  beforeEach(() => {
    ctx = createContext(getCodegenOptions())
  })
  it('snap', () => {
    const { css } = ctx.compileScss('base.index')
    expect(ctx.preProcessCss(css).css).toMatchSnapshot()
  })

  it('snap case 1', async () => {
    const ctx = createContext(
      getCodegenOptions({
        base: {
          themes: {
            light: {
              selector: '.light'
            },
            dark: {
              selector: '.dark'
            }
          }
        }
      })
    )
    const { css } = await ctx.compileScss('base.index')
    expect(ctx.preProcessCss(css).css).toMatchSnapshot()
  })

  it('add new theme case 0', async () => {
    const ctx = createContext(
      getCodegenOptions({
        base: {
          themes: {
            light: {
              selector: '.light'
            },
            dark: {
              selector: '.dark'
            },
            fuck: {
              selector: '.fuck'
            },
            shit: {
              selector: '.shit'
            }
          },
          extraVars: {
            fuck: {
              a: '#123456'
            },
            shit: {
              b: '#654321'
            }
          }
        }
      })
    )
    const { css } = await ctx.compileScss('base.index')
    expect(ctx.preProcessCss(css).css).toMatchSnapshot()
  })
})
