import { resolve } from './utils'
import { compileScss } from '@/sass'
describe('chat', () => {
  it('snap', async () => {
    const css = await compileScss(resolve('chat'))
    expect(css).toMatchSnapshot()
  })
})
