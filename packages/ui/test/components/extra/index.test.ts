// import { omit } from 'lodash-es'
import { createContext } from '@/context'

describe('extra', () => {
  it('extra btn', async () => {
    const components = {
      button: {
        extra: `
        .btn{
          @apply rounded-lg p-0.5;
          height: auto;
          min-height: auto;
        }
        `
      }
    }
    const ctx = createContext({
      components,
      dryRun: false
    })
    const res = await ctx.buildComponents()
    expect(res.button).toMatchSnapshot('schema')
    const { css } = ctx.compileScss(`components.button.defaults.utils`)
    expect(ctx.preprocessCss(css).css).toMatchSnapshot('css')
  })
})
