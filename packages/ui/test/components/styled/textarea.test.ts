import { resolve } from './utils'
import { compileScss } from '@/sass'
describe('textarea', () => {
  it('snap', async () => {
    const css = await compileScss(resolve('textarea'))
    expect(css).toMatchSnapshot()
  })
})
