import { resolve } from './utils'
import { compileScss } from '@/sass'
describe('input', () => {
  it('snap', async () => {
    const css = await compileScss(resolve('input'))
    expect(css).toMatchSnapshot()
  })
})
