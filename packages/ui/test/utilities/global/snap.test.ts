// import path from 'node:path'
// import fg from 'fast-glob'
// import { resolve } from './utils'
import { createContext } from '@/context'

// const coms = (await fg(path.resolve(scssDir, 'utilities/global', '*.scss'))).map((x) => {
//   return path.basename(x, '.scss')
// })
describe.skip('utilities', () => {
  // it('glass snap', async () => {
  //   const ctx = createContext(getCodegenOptions())
  //   const { css } = await ctx.compileScss('utilities.glass')
  //   expect(ctx.preprocessCss(css).css).toMatchSnapshot()
  // })

  // it('variables snap', async () => {
  //   const ctx = createContext(getCodegenOptions())
  //   const { css } = await ctx.compileScss('utilities.variables')
  //   expect(ctx.preprocessCss(css).css).toMatchSnapshot()
  // })

  it('custom snap case 1', async () => {
    const ctx = createContext({
      dryRun: true,
      utilities: {
        extraCss: [
          `.custom{
            @apply font-display;
          }`,
        ],
      },
      tailwindcssConfig: {
        theme: {
          extend: {
            fontFamily: {
              display: 'Oswald, ui-serif',
            },
          },
        },
      },
    })
    const res = await ctx.buildUtilities()
    expect(res.custom).toMatchSnapshot()
  })
})

// describe('for debugger', () => {
//   it('snap', async () => {
//     const ctx = createContext(getCodegenOptions())
//     const { css } = await ctx.compileScss(resolve('glass'))
//     expect(css).toMatchSnapshot()
//   })
// })
