// import path from 'node:path'
// import fg from 'fast-glob'
// import { resolve } from './utils'
import { scssTemplate } from '@/dirs'
import { createContext } from '@/context'
import { getCodegenOptions } from '@/options'
// const coms = (await fg(path.resolve(scssDir, 'utilities/global', '*.scss'))).map((x) => {
//   return path.basename(x, '.scss')
// })
describe('utilities', () => {
  it('glass snap', async () => {
    const ctx = createContext(getCodegenOptions())
    const { css } = await ctx.compileScss(scssTemplate, 'utilities.glass')
    expect(css).toMatchSnapshot()
  })

  it('variables snap', async () => {
    const ctx = createContext(getCodegenOptions())
    const { css } = await ctx.compileScss(scssTemplate, 'utilities.variables')
    expect(css).toMatchSnapshot()
  })
})

// describe('for debugger', () => {
//   it('snap', async () => {
//     const ctx = createContext(getCodegenOptions())
//     const { css } = await ctx.compileScss(resolve('glass'))
//     expect(css).toMatchSnapshot()
//   })
// })
