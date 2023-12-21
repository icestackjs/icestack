import { createContext } from '@icestack/ui'

import preset from '@/index'

describe('components', () => {
  it('daisyui all css obj', async () => {
    const ctx = createContext({
      dryRun: true,
      presets: [preset()]
    })

    const res = await ctx.buildComponents()
    expect(res).toMatchSnapshot()
  })
})
