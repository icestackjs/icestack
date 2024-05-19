import { createContext } from '@icestack/ui'

import preset from '@/index'

describe('base', () => {
  it('base css', () => {
    const ctx = createContext({
      dryRun: true,
      presets: [preset()],
    })
    const res = ctx.buildBase()
    expect(res).toMatchSnapshot()
  })
})
