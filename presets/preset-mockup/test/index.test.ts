import preset from '@/index'
import { createContext } from '@icestack/ui'

import { getCodegenOptions } from '@icestack/ui/config'

describe('presets', () => {
  it('default preset', () => {
    const opt = getCodegenOptions({
      presets: [preset()],
    })
    expect(opt).toMatchSnapshot()
  })

  it('default preset all css', async () => {
    const ctx = createContext({
      dryRun: true,
      presets: [preset()],
    })
    const res = await ctx.buildComponents()
    expect(res).toMatchSnapshot()
  })
})
