// import path from 'node:path'
// import fg from 'fast-glob'
// import { resolve } from './utils'
import { createContext } from '@/context'
import { getCodegenOptions } from '@/options'
// const coms = (await fg(path.resolve(scssDir, 'utilities/global', '*.scss'))).map((x) => {
//   return path.basename(x, '.scss')
// })
describe('utilities', () => {
  it('glass snap', async () => {
    const ctx = createContext(getCodegenOptions())
    const { css } = await ctx.compileScss('utilities.glass')
    expect(ctx.preprocessCss(css).css).toMatchSnapshot()
  })

  it('variables snap', async () => {
    const ctx = createContext(getCodegenOptions())
    const { css } = await ctx.compileScss('utilities.variables')
    expect(ctx.preprocessCss(css).css).toMatchSnapshot()
  })

  it('custom snap', async () => {
    const ctx = createContext(getCodegenOptions())
    const { css } = await ctx.compileScss('utilities.custom')
    expect(ctx.preprocessCss(css).css).toMatchSnapshot()
  })

  it('custom snap case 0', async () => {
    const ctx = createContext({
      utilities: {
        extraCss: [
          `.dsdsdsdsd{color:red;}`,
          {
            '.vvvv': {
              apply: ['bg-blue-500'],
              css: {
                color: 'blue'
              }
            }
          }
        ]
      }
    })
    const { css } = await ctx.compileScss('utilities.custom')
    expect(ctx.preprocessCss(css).css).toMatchSnapshot()
  })
})

// describe('for debugger', () => {
//   it('snap', async () => {
//     const ctx = createContext(getCodegenOptions())
//     const { css } = await ctx.compileScss(resolve('glass'))
//     expect(css).toMatchSnapshot()
//   })
// })
