import { createContext, getCodegenOptions } from '@icestack/ui'

import preset from '@/index'

describe('presets', () => {
  it('default preset', () => {
    const opt = getCodegenOptions({
      presets: [preset()]
    })
    expect(opt).toMatchSnapshot()
  })

  it('default preset all css', async () => {
    const ctx = createContext({
      dryRun: true,
      presets: [preset()]
    })
    try {
      const res = await ctx.buildComponents()
      expect(res).toMatchSnapshot()
    } catch (error) {
      console.error(error)
    }
  })
})
