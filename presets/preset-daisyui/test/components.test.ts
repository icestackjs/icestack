import { createContext } from '@icestack/ui'

import preset from '@/index'

describe('components', () => {
  it('daisyui all css obj', async () => {
    const ctx = createContext({
      dryRun: true,
      presets: [preset()],
    })

    const res = await ctx.buildComponents()
    expect(res).toMatchSnapshot()
  })
})

// describe.each(componentsNames.map((x) => ({ name: x })))('$name', ({ name: componentName }) => {
//   const ctx = createContext(getCodegenOptions())
//   for (const stage of stages) {
//     it(stage, () => {
//       const { css } = ctx.compileScss(`components.${componentName}.defaults.${stage}`)
//       expect(ctx.preprocessCss(css).css).toMatchSnapshot()
//     })
//   }
// })
