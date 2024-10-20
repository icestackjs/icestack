import { createContext } from '@/context'

describe('components new', () => {
  it('case 0', async () => {
    const ctx = createContext({
      dryRun: true,
      base: {
        mediaDarkTheme: 'dark',
      },
    })
    // ['radio']
    const res = await ctx.buildComponents()
    expect(res).toMatchSnapshot()
  })
})
