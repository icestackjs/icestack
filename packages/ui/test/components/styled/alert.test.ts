import { resolve } from './utils'
import { compileScss } from '@/sass'
describe('alert', () => {
  it('snap', async () => {
    const css = await compileScss(resolve('alert'))
    expect(css).toMatchSnapshot()
  })
})
