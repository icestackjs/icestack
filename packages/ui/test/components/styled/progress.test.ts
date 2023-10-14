import { resolve } from './utils'
import { compileScss } from '@/sass'
describe('progress', () => {
  it('snap', async () => {
    const css = await compileScss(resolve('progress'))
    expect(css).toMatchSnapshot()
  })
})
