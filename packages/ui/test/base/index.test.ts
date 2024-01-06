import { createContext } from '@/context'

describe('base', () => {
  // let ctx: IContext
  // beforeEach(() => {
  //   ctx = createContext(getCodegenOptions())
  // })
  it('snap', () => {
    const ctx = createContext()
    const res = ctx.buildBase()
    expect(res).toMatchSnapshot()
  })
})
