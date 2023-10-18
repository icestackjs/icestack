import { resolve } from './utils'
import { compileScss } from '@/sass'
describe('file-input', () => {
  it('snap', async () => {
    const css = await compileScss(resolve('file-input'))
    expect(css).toMatchSnapshot()
  })
})
