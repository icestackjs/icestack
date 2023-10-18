import { resolve } from './utils'
import { compileScss } from '@/sass'
describe('button', () => {
  it('snap', async () => {
    const css = await compileScss(resolve('button'))
    expect(css).toMatchSnapshot()
  })
})
