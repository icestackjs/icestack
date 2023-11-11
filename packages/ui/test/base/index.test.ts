import { createContext, IContext } from '@/context'
import { scssTemplate } from '@/dirs'
import { getCodegenOptions } from '@/options'

describe('base', () => {
  let ctx: IContext
  beforeEach(() => {
    ctx = createContext(getCodegenOptions())
  })
  it('snap', () => {
    const result = ctx.compileScss(scssTemplate, 'base.index')
    expect(result.css).toMatchSnapshot()
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
    const { css } = await ctx.compileScss(scssTemplate, 'base.index')
    expect(css).toMatchSnapshot()
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
    const { css } = await ctx.compileScss(scssTemplate, 'base.index')
    expect(css).toMatchSnapshot()
  })
})
