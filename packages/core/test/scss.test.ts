import path from 'node:path'
import { createContext } from '@/index'
describe('scss', () => {
  it('case 0', async () => {
    const ctx = createContext(path.resolve(__dirname, './configs/scss0.cjs'))
    await ctx.buildComponents()
    expect(ctx.components.aaa.base.resolvedCss).toMatchSnapshot()
  })
})
