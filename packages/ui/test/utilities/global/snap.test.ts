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
    expect(ctx.preProcessCss(css).css).toMatchSnapshot()
  })

  it('variables snap', async () => {
    const ctx = createContext(getCodegenOptions())
    const { css } = await ctx.compileScss('utilities.variables')
    expect(ctx.preProcessCss(css).css).toMatchSnapshot()
  })
})

// describe('for debugger', () => {
//   it('snap', async () => {
//     const ctx = createContext(getCodegenOptions())
//     const { css } = await ctx.compileScss(resolve('glass'))
//     expect(css).toMatchSnapshot()
//   })
// })
