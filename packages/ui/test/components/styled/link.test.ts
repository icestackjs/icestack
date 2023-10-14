import { resolve } from './utils'
import { compileScss } from '@/sass'
describe('link', () => {
  it('snap', async () => {
    const css = await compileScss(resolve('link'))
    expect(css).toMatchSnapshot()
  })
})
