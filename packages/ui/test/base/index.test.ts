import path from 'node:path'
import { createContext, IContext } from '@/context'
import { scssDir } from '@/dirs'
import { getCodegenOptions } from '@/options'

export function resolve(filename: string) {
  return path.resolve(scssDir, 'base', filename + '.scss')
}

describe('base', () => {
  let ctx: IContext
  beforeEach(() => {
    ctx = createContext(getCodegenOptions())
  })
  it('snap', () => {
    const result = ctx.compileScss(resolve('index'))
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
    const { css } = await ctx.compileScss(resolve('index'))
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
    const { css } = await ctx.compileScss(resolve('index'))
    expect(css).toMatchSnapshot()
  })
})
