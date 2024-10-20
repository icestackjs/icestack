import { createContext } from '@/context'

describe('index new', () => {
  it('case 0', async () => {
    const ctx = createContext({
      dryRun: true,
      base: {
        mediaDarkTheme: 'dark',
      },
    })
    const res = await ctx.buildBase()
    expect(res).toMatchSnapshot()
  })
})
