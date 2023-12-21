import { createContext } from '@icestack/ui'

import preset from '@/index'
describe('base', () => {
  it('base css', () => {
    const ctx = createContext({
      dryRun: true,
      presets: [preset()]
    })
    const { css } = ctx.compileScss('base.index')
    expect(ctx.preprocessCss(css).css).toMatchSnapshot()
  })
})
