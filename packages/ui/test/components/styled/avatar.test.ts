import { resolve } from './utils'
import { compileScss } from '@/sass'
describe('avatar', () => {
  it('snap', async () => {
    const css = await compileScss(resolve('avatar'))
    expect(css).toMatchSnapshot()
  })
})
