import { resolve } from './utils'
import { compileScss } from '@/sass'
describe('badge', () => {
  it('snap', async () => {
    const css = await compileScss(resolve('badge'))
    expect(css).toMatchSnapshot()
  })
})
