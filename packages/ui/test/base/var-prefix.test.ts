import { createContext } from '@/context'
import { getCodegenOptions } from '@/options'

describe('var-prefix', () => {
  it('snap case 0', () => {
    const ctx = createContext(getCodegenOptions({}))
    const { css } = ctx.compileScss('base.index')
    expect(ctx.preprocessCss(css).css).toMatchSnapshot()
  })

  it('snap case 1', () => {
    const ctx = createContext(
      getCodegenOptions({
        varPrefix: {
          varPrefix: '--som-'
        }
      })
    )
    const { css } = ctx.compileScss('base.index')

    expect(ctx.preprocessCss(css).css).toMatchSnapshot()
  })
})
