import { createContext } from '@/context'

describe('var-prefix', () => {
  it('snap case 1', () => {
    const ctx = createContext({
      dryRun: true,
      postcss: {
        varPrefix: {
          varPrefix: '--som-',
        },
      },
    })
    const res = ctx.buildBase()

    expect(res).toMatchSnapshot()
  })
})
