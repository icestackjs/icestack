import { resolve } from './utils'
import { compileScss } from '@/sass'
describe('checkbox', () => {
  it('snap', async () => {
    const css = await compileScss(resolve('checkbox'))
    expect(css).toMatchSnapshot()
  })
})
