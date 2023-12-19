import { createContext, getCodegenOptions } from '@icestack/ui'

import preset from '@/index'

describe('presets', () => {
  it('daisyui', () => {
    const opt = getCodegenOptions({
      presets: [preset()]
    })
    expect(opt).toMatchSnapshot()
  })

  it('daisyui all css', async () => {
    const ctx = createContext({
      dryRun: true,
      presets: [preset()]
    })
    const res = await ctx.buildComponents()
    expect(res).toMatchSnapshot()
  })
})
