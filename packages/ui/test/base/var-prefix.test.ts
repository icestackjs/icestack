import path from 'node:path'
import { createContext } from '@/context'
import { scssTemplate } from '@/dirs'
import { getCodegenOptions } from '@/options'

describe('var-prefix', () => {
  it('snap case 0', () => {
    const ctx = createContext(getCodegenOptions({}))
    const { css } = ctx.compileScss(scssTemplate, 'base.index')
    expect(css).toMatchSnapshot()
  })

  it('snap case 1', () => {
    const ctx = createContext(
      getCodegenOptions({
        varPrefix: '--som-'
      })
    )
    const { css } = ctx.compileScss(scssTemplate, 'base.index')
    expect(css).toMatchSnapshot()
  })
})
