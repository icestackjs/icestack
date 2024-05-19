import { createContext } from '@icestack/ui'

import preset from '@/index'

describe('tailwindcss', () => {
  it('config snap', () => {
    const ctx = createContext({
      dryRun: true,
      presets: [preset()],
    })

    expect(ctx.tailwindcssConfig).toMatchSnapshot()
  })
})
