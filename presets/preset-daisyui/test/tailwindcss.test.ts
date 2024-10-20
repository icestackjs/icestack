import preset from '@/index'

import { createContext } from '@icestack/ui'

describe('tailwindcss', () => {
  it('config snap', () => {
    const ctx = createContext({
      dryRun: true,
      presets: [preset()],
    })

    expect(ctx.tailwindcssConfig).toMatchSnapshot()
  })
})
