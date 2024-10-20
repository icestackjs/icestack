import type { IContext } from '@/core/server-context'
import { createContext } from '@/core/server-context'

describe('server', () => {
  let ctx: IContext
  beforeEach(() => {
    ctx = createContext()
  })
  it('ctx processString', async () => {
    const { css } = await ctx.processString(`@layer utilities {
      .a {
        @apply text-[#123456] bg-[#123456];
        font-size: theme("fontSize.xl");
      }
    }
    `)
    expect(css).toMatchSnapshot()
  })
})
