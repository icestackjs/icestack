import preset from '@/index'

import { createContext } from '@icestack/ui'

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
